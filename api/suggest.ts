import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { company_name, career_url = '', category = '', notes = '' } = req.body ?? {}

  if (!company_name?.trim()) {
    return res.status(400).json({ error: 'Company name is required' })
  }

  const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!,
  )

  const { error } = await supabase.from('suggestions').insert({
    company_name: company_name.trim(),
    career_url: career_url.trim() || null,
    category: category || null,
    notes: notes.trim() || null,
  })

  if (error) {
    return res.status(500).json({ error: 'Failed to save suggestion' })
  }

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'CyberHunt <onboarding@resend.dev>',
      to: 'jcarter.itprofessional@gmail.com',
      subject: `CyberHunt: New company suggestion — ${company_name.trim()}`,
      html: `<p>A user suggested a new company:</p>
<table style="font-size:14px;border-collapse:collapse" border="1" cellpadding="6">
  <tr><th align="left">Company</th><td>${company_name.trim()}</td></tr>
  <tr><th align="left">Career URL</th><td>${career_url || '—'}</td></tr>
  <tr><th align="left">Category</th><td>${category || '—'}</td></tr>
  <tr><th align="left">Notes</th><td>${notes || '—'}</td></tr>
</table>
<p style="color:#666;font-size:12px">View all suggestions in Supabase → Table Editor → suggestions</p>`,
    }).catch(err => console.error('[suggest] email failed', err))
  }

  return res.status(200).json({ ok: true })
}
