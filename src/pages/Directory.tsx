import { useEffect, useMemo, useState } from 'react'
import { track } from '@vercel/analytics'
import { supabase } from '../lib/supabase'
import type { Company } from '../types/company'

type SuggestState = 'idle' | 'loading' | 'success' | 'error'

function SuggestModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [category, setCategory] = useState('')
  const [notes, setNotes] = useState('')
  const [state, setState] = useState<SuggestState>('idle')
  const [errMsg, setErrMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    try {
      const res = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company_name: name, career_url: url, category, notes }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({})) as { error?: string }
        throw new Error(d.error ?? 'Failed to submit')
      }
      track('company_suggested', { category })
      setState('success')
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : 'Something went wrong')
      setState('error')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" onClick={onClose}>
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold text-lg">Suggest a Company</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl leading-none">&times;</button>
        </div>

        {state === 'success' ? (
          <div className="text-center py-6">
            <p className="text-[#94D2BD] font-medium mb-1">Thanks for the suggestion!</p>
            <p className="text-gray-400 text-sm">We'll review it and add it to the directory.</p>
            <button onClick={onClose} className="mt-4 text-sm text-gray-500 hover:text-white">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-xs mb-1">Company Name <span className="text-red-400">*</span></label>
              <input required value={name} onChange={e => setName(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#0A9396]"
                placeholder="Acme Cyber Inc." />
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Career Page URL</label>
              <input type="url" value={url} onChange={e => setUrl(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#0A9396]"
                placeholder="https://company.com/careers" />
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#0A9396]">
                <option value="">Not sure</option>
                <option value="govcon">GovCon</option>
                <option value="vendor">Vendor</option>
                <option value="consulting">Consulting</option>
                <option value="staffing">Staffing</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Notes (optional)</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2}
                className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#0A9396] resize-none"
                placeholder="Why should this company be listed?" />
            </div>
            {state === 'error' && <p className="text-red-400 text-xs">{errMsg}</p>}
            <div className="flex gap-2 pt-1">
              <button type="button" onClick={onClose}
                className="flex-1 text-sm text-gray-400 hover:text-white border border-gray-700 rounded-lg py-2 transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={state === 'loading'}
                className="flex-1 bg-[#94D2BD] hover:bg-[#E9D8A6] text-gray-900 font-semibold text-sm rounded-lg py-2 transition-colors disabled:opacity-60">
                {state === 'loading' ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

const CATEGORY_LABELS: Record<Company['category'], string> = {
  govcon: 'GovCon',
  vendor: 'Vendor',
  consulting: 'Consulting',
  staffing: 'Staffing',
}

const CATEGORY_COLORS: Record<Company['category'], string> = {
  govcon: 'bg-blue-900/60 text-blue-300',
  vendor: 'bg-purple-900/60 text-purple-300',
  consulting: 'bg-emerald-900/60 text-emerald-300',
  staffing: 'bg-orange-900/60 text-orange-300',
}

const REMOTE_LABELS: Record<Company['remote'], string> = {
  yes: 'Remote',
  hybrid: 'Hybrid',
  no: 'On-site',
}

const REMOTE_COLORS: Record<Company['remote'], string> = {
  yes: 'bg-emerald-900/60 text-emerald-300',
  hybrid: 'bg-yellow-900/60 text-yellow-300',
  no: 'bg-gray-700 text-gray-400',
}

const US_STATES = [
  'AK','AL','AR','AZ','CA','CO','CT','DC','DE','FL','GA','HI','IA','ID',
  'IL','IN','KS','KY','LA','MA','MD','ME','MI','MN','MO','MS','MT','NC',
  'ND','NE','NH','NJ','NM','NV','NY','OH','OK','OR','PA','RI','SC','SD',
  'TN','TX','UT','VA','VT','WA','WI','WV','WY','national',
]

const SELECT_CLASS =
  'px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-300 focus:outline-none focus:border-[#0A9396]'

export default function Directory() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [showSuggest, setShowSuggest] = useState(false)
  const [category, setCategory] = useState('')
  const [stateFilter, setStateFilter] = useState('')
  const [remoteFilter, setRemoteFilter] = useState('')
  const [clearanceFilter, setClearanceFilter] = useState('')

  useEffect(() => {
    async function load() {
      const { data, error: err } = await supabase
        .from('companies')
        .select('*')
        .order('name')
      if (err) {
        setError(err.message)
      } else {
        setCompanies(data ?? [])
      }
      setLoading(false)
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    return companies.filter(c => {
      if (search) {
        const q = search.toLowerCase()
        const nameMatch = c.name.toLowerCase().includes(q)
        const certMatch = c.preferred_certs?.some(cert => cert.toLowerCase().includes(q))
        if (!nameMatch && !certMatch) return false
      }
      if (category && c.category !== category) return false
      if (stateFilter && c.state !== stateFilter) return false
      if (remoteFilter && c.remote !== remoteFilter) return false
      if (clearanceFilter !== '') {
        if (c.clearance_accepted !== (clearanceFilter === 'true')) return false
      }
      return true
    })
  }, [companies, search, category, stateFilter, remoteFilter, clearanceFilter])

  return (
    <div className="text-left px-6 py-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Cyber Job Directory</h1>
            <p className="text-gray-400 text-sm">
              Direct career links to top cybersecurity employers — no recruiters, no middlemen.
            </p>
          </div>
          <button
            onClick={() => setShowSuggest(true)}
            className="shrink-0 text-xs bg-gray-800 hover:bg-gray-700 text-[#94D2BD] border border-gray-700 px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
          >
            + Suggest a Company
          </button>
        </div>
      </div>
      {showSuggest && <SuggestModal onClose={() => setShowSuggest(false)} />}

      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by company or cert (e.g. CISSP)..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-[220px] px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#0A9396]"
        />
        <select value={category} onChange={e => setCategory(e.target.value)} className={SELECT_CLASS}>
          <option value="">All Types</option>
          <option value="govcon">GovCon</option>
          <option value="vendor">Vendor</option>
          <option value="consulting">Consulting</option>
          <option value="staffing">Staffing</option>
        </select>
        <select value={stateFilter} onChange={e => setStateFilter(e.target.value)} className={SELECT_CLASS}>
          <option value="">All States</option>
          {US_STATES.map(s => (
            <option key={s} value={s}>{s === 'national' ? 'National / Remote' : s}</option>
          ))}
        </select>
        <select value={remoteFilter} onChange={e => setRemoteFilter(e.target.value)} className={SELECT_CLASS}>
          <option value="">Any Work Style</option>
          <option value="yes">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="no">On-site</option>
        </select>
        <select value={clearanceFilter} onChange={e => setClearanceFilter(e.target.value)} className={SELECT_CLASS}>
          <option value="">Any Clearance</option>
          <option value="true">Clearance Accepted</option>
          <option value="false">No Clearance Needed</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-500">Loading companies...</div>
      ) : error ? (
        <div className="text-center py-16 text-red-400">Error: {error}</div>
      ) : (
        <>
          <p className="text-gray-600 text-xs mb-3">
            Showing {filtered.length} of {companies.length} companies
          </p>

          <div className="overflow-x-auto rounded-lg border border-gray-800">
            <table className="w-full text-sm">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium">Company</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium">Type</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium hidden sm:table-cell">State</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium">Work Style</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium hidden sm:table-cell">Clearance</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium hidden md:table-cell">Open Roles</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                      No companies match your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map(company => (
                    <tr key={company.id} className="hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-white">
                        {company.is_featured && (
                          <span className="mr-2 text-xs bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded">
                            Featured
                          </span>
                        )}
                        {company.name}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[company.category]}`}>
                          {CATEGORY_LABELS[company.category]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-300 text-xs hidden sm:table-cell">
                        {company.state === 'national' ? 'National' : company.state}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${REMOTE_COLORS[company.remote]}`}>
                          {REMOTE_LABELS[company.remote]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm hidden sm:table-cell">
                        {company.clearance_accepted ? (
                          <span className="text-emerald-400 font-medium">Yes</span>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">
                        {company.open_roles_note ?? '—'}
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={company.career_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-xs bg-[#94D2BD] hover:bg-[#E9D8A6] text-gray-900 px-3 py-1.5 rounded transition-colors whitespace-nowrap"
                          onClick={() => track('view_jobs', { company: company.name, source: 'directory' })}
                        >
                          View Jobs
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
