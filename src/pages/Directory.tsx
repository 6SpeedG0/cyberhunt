import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Company } from '../types/company'

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
  'px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-300 focus:outline-none focus:border-purple-500'

export default function Directory() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
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
        <h1 className="text-2xl font-bold text-white mb-1">Cyber Job Directory</h1>
        <p className="text-gray-400 text-sm">
          Direct career links to top cybersecurity employers — no recruiters, no middlemen.
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by company or cert (e.g. CISSP)..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-[220px] px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
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
                  <th className="text-left px-4 py-3 text-gray-400 font-medium">State</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium">Work Style</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium">Clearance</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium">Open Roles</th>
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
                      <td className="px-4 py-3 text-gray-300 text-xs">
                        {company.state === 'national' ? 'National' : company.state}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${REMOTE_COLORS[company.remote]}`}>
                          {REMOTE_LABELS[company.remote]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {company.clearance_accepted ? (
                          <span className="text-emerald-400 font-medium">Yes</span>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {company.open_roles_note ?? '—'}
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={company.career_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-xs bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded transition-colors whitespace-nowrap"
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
