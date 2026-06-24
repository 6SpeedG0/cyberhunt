import { createClient } from '@supabase/supabase-js'

const TIMEOUT_MS = 7000

async function checkUrl(url: string): Promise<{ url: string; ok: boolean; status: number | null }> {
  try {
    const controller = new AbortController()
    const tid = setTimeout(() => controller.abort(), TIMEOUT_MS)
    const res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'CyberHunt/1.0 health-check' },
    })
    clearTimeout(tid)
    return { url, ok: res.status < 400, status: res.status }
  } catch {
    return { url, ok: false, status: null }
  }
}

export default async function handler(req: Request): Promise<Response> {
  // Require CRON_SECRET if set — pass as Authorization: Bearer <secret>
  const secret = process.env.CRON_SECRET
  if (secret) {
    const auth = req.headers.get('authorization')
    if (auth !== `Bearer ${secret}`) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }

  const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!,
  )

  const { data: companies, error } = await supabase
    .from('companies')
    .select('id, name, career_url')

  if (error || !companies) {
    return new Response(JSON.stringify({ error: 'Failed to load companies from Supabase' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Check all URLs in parallel — each has its own 7s abort
  const results = await Promise.all(companies.map(c => checkUrl(c.career_url)))

  const failed = results
    .filter(r => !r.ok)
    .map(r => {
      const company = companies.find(c => c.career_url === r.url)
      return { name: company?.name ?? '', url: r.url, status: r.status }
    })

  const today = new Date().toISOString().split('T')[0]

  // Update last_checked for all companies (requires anon key write access — no RLS on pilot)
  await supabase
    .from('companies')
    .update({ last_checked: today })
    .not('id', 'is', null)

  const summary = {
    checked: companies.length,
    ok: companies.length - failed.length,
    failed: failed.length,
    failedCompanies: failed,
    timestamp: new Date().toISOString(),
  }

  console.log('[health-check]', JSON.stringify(summary))

  return new Response(JSON.stringify(summary), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
