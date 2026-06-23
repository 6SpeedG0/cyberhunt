import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'

export const config = { runtime: 'nodejs20.x' }

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let body: { certs?: string[]; clearance?: string; remote?: string; state?: string }
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { certs = [], clearance = '', remote = '', state = '' } = body

  const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!,
  )

  const { data: companies, error } = await supabase
    .from('companies')
    .select('name, category, career_url, remote, clearance_accepted, clearance_levels, preferred_certs, state')
    .order('name')

  if (error || !companies) {
    return new Response(JSON.stringify({ error: 'Failed to load companies' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const companyList = companies.map(c => ({
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
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Strip markdown code fences if model added them
  const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()
  const jsonMatch = cleaned.match(/\[[\s\S]*\]/)

  if (!jsonMatch) {
    return new Response(JSON.stringify({ error: 'Could not parse AI response' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let matches: Array<{ name: string; match_score: number; reasoning: string }>
  try {
    matches = JSON.parse(jsonMatch[0])
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid AI response format' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const enriched = matches.map(m => {
    const company = companies.find(c => c.name === m.name)
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

  return new Response(JSON.stringify({ matches: enriched }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
