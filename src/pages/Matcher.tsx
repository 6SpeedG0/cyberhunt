import { useState } from 'react'

const CERTS = [
  'Security+', 'CISSP', 'CEH', 'CISM',
  'GCIH', 'GREM', 'OSCP', 'PCNSE',
  'NSE4', 'CCNP Security', 'CySA+', 'CASP+',
]

const CLEARANCE_LEVELS = [
  { value: '', label: 'No Clearance / None' },
  { value: 'public trust', label: 'Public Trust' },
  { value: 'secret', label: 'Secret' },
  { value: 'ts', label: 'Top Secret (TS)' },
  { value: 'ts/sci', label: 'TS/SCI' },
]

const REMOTE_OPTIONS = [
  { value: '', label: 'Any Work Style' },
  { value: 'yes', label: 'Remote Only' },
  { value: 'hybrid', label: 'Hybrid OK' },
  { value: 'no', label: 'On-site OK' },
]

const US_STATES = [
  'AK','AL','AR','AZ','CA','CO','CT','DC','DE','FL','GA','HI','IA','ID',
  'IL','IN','KS','KY','LA','MA','MD','ME','MI','MN','MO','MS','MT','NC',
  'ND','NE','NH','NJ','NM','NV','NY','OH','OK','OR','PA','RI','SC','SD',
  'TN','TX','UT','VA','VT','WA','WI','WV','WY','national',
]

type MatchResult = {
  name: string
  match_score: number
  reasoning: string
  career_url: string
  category: string
  state: string
  remote: string
}

const CATEGORY_COLORS: Record<string, string> = {
  govcon: 'bg-blue-900/60 text-blue-300',
  vendor: 'bg-purple-900/60 text-purple-300',
  consulting: 'bg-emerald-900/60 text-emerald-300',
  staffing: 'bg-orange-900/60 text-orange-300',
}

const CATEGORY_LABELS: Record<string, string> = {
  govcon: 'GovCon',
  vendor: 'Vendor',
  consulting: 'Consulting',
  staffing: 'Staffing',
}

const REMOTE_LABELS: Record<string, string> = {
  yes: 'Remote',
  hybrid: 'Hybrid',
  no: 'On-site',
}

const SELECT_CLASS =
  'px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-300 focus:outline-none focus:border-purple-500'

export default function Matcher() {
  const [selectedCerts, setSelectedCerts] = useState<string[]>([])
  const [clearance, setClearance] = useState('')
  const [remote, setRemote] = useState('')
  const [state, setState] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [matches, setMatches] = useState<MatchResult[] | null>(null)

  function toggleCert(cert: string) {
    setSelectedCerts(prev =>
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMatches(null)

    try {
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ certs: selectedCerts, clearance, remote, state }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as { error?: string }
        throw new Error(data.error ?? `Request failed (${res.status})`)
      }

      const data = await res.json() as { matches: MatchResult[] }
      setMatches(data.matches)
    } catch (err) {
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError('AI matching requires a Vercel deployment. Run "vercel dev" locally or deploy to test this feature.')
      } else {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-6 py-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">AI Matcher</h1>
        <p className="text-gray-400 text-sm">
          Tell us your profile and we'll rank the best-fit cybersecurity employers for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
        {/* Certs */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Your Certifications
            <span className="ml-2 text-xs text-gray-600 font-normal">Select all that apply</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {CERTS.map(cert => (
              <button
                key={cert}
                type="button"
                onClick={() => toggleCert(cert)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  selectedCerts.includes(cert)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                }`}
              >
                {cert}
              </button>
            ))}
          </div>
          {selectedCerts.length > 0 && (
            <p className="mt-2 text-xs text-gray-600">
              Selected: {selectedCerts.join(', ')}
            </p>
          )}
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Clearance Level</label>
            <select
              value={clearance}
              onChange={e => setClearance(e.target.value)}
              className={`w-full ${SELECT_CLASS}`}
            >
              {CLEARANCE_LEVELS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Work Style</label>
            <select
              value={remote}
              onChange={e => setRemote(e.target.value)}
              className={`w-full ${SELECT_CLASS}`}
            >
              {REMOTE_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Location</label>
            <select
              value={state}
              onChange={e => setState(e.target.value)}
              className={`w-full ${SELECT_CLASS}`}
            >
              <option value="">Any State</option>
              {US_STATES.map(s => (
                <option key={s} value={s}>
                  {s === 'national' ? 'National / Remote' : s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-purple-900 disabled:text-purple-500 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded transition-colors text-sm"
        >
          {loading ? 'Finding your matches...' : 'Find My Matches'}
        </button>
      </form>

      {/* Error state */}
      {error && (
        <div className="bg-red-900/30 border border-red-800 rounded-xl p-4 mb-6 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Results */}
      {matches && matches.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Your Top Matches
          </h2>
          <div className="space-y-3">
            {matches.map((m, i) => (
              <div key={`${m.name}-${i}`} className="bg-gray-900 rounded-xl border border-gray-800 p-4">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white font-semibold text-sm">
                        {i + 1}. {m.name}
                      </span>
                      {m.category && CATEGORY_LABELS[m.category] && (
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${CATEGORY_COLORS[m.category] ?? 'bg-gray-700 text-gray-400'}`}>
                          {CATEGORY_LABELS[m.category]}
                        </span>
                      )}
                      {m.remote && (
                        <span className="text-xs text-gray-500">
                          {REMOTE_LABELS[m.remote] ?? m.remote}
                          {m.state && m.state !== 'national' ? ` · ${m.state}` : ''}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-purple-400 font-bold text-xl">{m.match_score}</span>
                    <span className="text-gray-600 text-xs">/100</span>
                  </div>
                </div>

                {/* Score bar */}
                <div className="h-1 bg-gray-800 rounded-full mb-3">
                  <div
                    className="h-1 bg-purple-500 rounded-full"
                    style={{ width: `${m.match_score}%` }}
                  />
                </div>

                <p className="text-gray-400 text-xs mb-3">{m.reasoning}</p>

                {m.career_url && (
                  <a
                    href={m.career_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded transition-colors"
                  >
                    View Jobs
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {matches && matches.length === 0 && (
        <div className="text-center py-8 text-gray-500 text-sm">
          No matches found. Try broadening your filters.
        </div>
      )}
    </div>
  )
}
