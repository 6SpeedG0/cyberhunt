import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 h'),
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ?? 'anonymous'
  const { success, remaining } = await ratelimit.limit(ip)
  if (!success) {
    return res.status(429).json({ error: 'Too many requests. Try again in an hour.', remaining: 0 })
  }
  res.setHeader('X-RateLimit-Remaining', remaining)

  const { certs = [], clearance = '', remote = '', state = '' } = req.body ?? {}

  const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!,
  )

  const { data: companies, error } = await supabase
    .from('companies')
    .select('name, category, career_url, remote, clearance_accepted, clearance_levels, preferred_certs, state')
    .order('name')

  if (error || !companies) {
    return res.status(500).json({ error: 'Failed to load companies' })
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const companyList = companies.map((c: any) => ({
    n: c.name,
    cat: c.category,
    rem: c.remote,
    cl: c.clearance_accepted,
    clv: c.clearance_levels ?? [],
    certs: c.preferred_certs ?? [],
    st: c.state,
  }))

  const prompt = `You are a cybersecurity job matcher. Score these companies for a candidate.

Candidate profile:
- Certifications: ${certs.length ? certs.join(', ') : 'none specified'}
- Clearance level: ${clearance || 'none/not specified'}
- Work style preference: ${remote || 'any'}
- Location/state: ${state || 'any'}

Companies (JSON):
${JSON.stringify(companyList)}

Scoring rules:
- match_score is 0-100
- Boost score if company's certs array overlaps with candidate's certs
- Boost score if company clearance_accepted=true and candidate has clearance
- Boost score if company remote value matches candidate's remote preference
- Boost score if company state matches candidate's state (or company state is "national")
- If candidate has no clearance, prefer companies where clearance is not required
- Return exactly 7 best matches

Return ONLY a valid JSON array — no markdown, no explanation, no backticks:
[{"name":"exact company name from the list","match_score":95,"reasoning":"One sentence explaining the match."}]`

  let raw = ''
  try {
    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })
    raw = message.content[0].type === 'text' ? message.content[0].text.trim() : ''
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'AI request failed'
    return res.status(500).json({ error: msg })
  }

  const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()
  const jsonMatch = cleaned.match(/\[[\s\S]*\]/)

  if (!jsonMatch) {
    return res.status(500).json({ error: 'Could not parse AI response' })
  }

  let matches: Array<{ name: string; match_score: number; reasoning: string }>
  try {
    matches = JSON.parse(jsonMatch[0])
  } catch {
    return res.status(500).json({ error: 'Invalid AI response format' })
  }

  const enriched = matches.map((m: any) => {
    const company = companies.find((c: any) => c.name === m.name)
    return {
      name: m.name,
      match_score: m.match_score,
      reasoning: m.reasoning,
      career_url: company?.career_url ?? '',
      category: company?.category ?? '',
      state: company?.state ?? '',
      remote: company?.remote ?? '',
    }
  })

  return res.status(200).json({ matches: enriched })
}
