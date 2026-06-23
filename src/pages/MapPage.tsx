import { useEffect, useMemo, useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { supabase } from '../lib/supabase'
import type { Company } from '../types/company'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

const STATE_ABBR: Record<string, string> = {
  Alabama: 'AL', Alaska: 'AK', Arizona: 'AZ', Arkansas: 'AR',
  California: 'CA', Colorado: 'CO', Connecticut: 'CT', Delaware: 'DE',
  Florida: 'FL', Georgia: 'GA', Hawaii: 'HI', Idaho: 'ID',
  Illinois: 'IL', Indiana: 'IN', Iowa: 'IA', Kansas: 'KS',
  Kentucky: 'KY', Louisiana: 'LA', Maine: 'ME', Maryland: 'MD',
  Massachusetts: 'MA', Michigan: 'MI', Minnesota: 'MN', Mississippi: 'MS',
  Missouri: 'MO', Montana: 'MT', Nebraska: 'NE', Nevada: 'NV',
  'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY',
  'North Carolina': 'NC', 'North Dakota': 'ND', Ohio: 'OH', Oklahoma: 'OK',
  Oregon: 'OR', Pennsylvania: 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
  'South Dakota': 'SD', Tennessee: 'TN', Texas: 'TX', Utah: 'UT',
  Vermont: 'VT', Virginia: 'VA', Washington: 'WA', 'West Virginia': 'WV',
  Wisconsin: 'WI', Wyoming: 'WY', 'District of Columbia': 'DC',
}

const ABBR_TO_NAME = Object.fromEntries(
  Object.entries(STATE_ABBR).map(([name, abbr]) => [abbr, name])
)

function stateColor(count: number, selected: boolean): string {
  if (selected) return '#c084fc'
  if (count === 0) return '#111318'
  if (count <= 2) return '#2d1b4e'
  if (count <= 5) return '#5b21b6'
  if (count <= 9) return '#7c3aed'
  return '#a855f7'
}

const CATEGORY_COLORS: Record<Company['category'], string> = {
  govcon: 'bg-blue-900/60 text-blue-300',
  vendor: 'bg-purple-900/60 text-purple-300',
  consulting: 'bg-emerald-900/60 text-emerald-300',
  staffing: 'bg-orange-900/60 text-orange-300',
}

const CATEGORY_LABELS: Record<Company['category'], string> = {
  govcon: 'GovCon',
  vendor: 'Vendor',
  consulting: 'Consulting',
  staffing: 'Staffing',
}

export default function MapPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('companies')
      .select('*')
      .then(({ data }) => {
        setCompanies(data ?? [])
        setLoading(false)
      })
  }, [])

  const byState = useMemo(() => {
    const map: Record<string, Company[]> = {}
    for (const c of companies) {
      if (c.state === 'national') continue
      if (!map[c.state]) map[c.state] = []
      map[c.state].push(c)
    }
    return map
  }, [companies])

  const nationalCount = useMemo(
    () => companies.filter(c => c.state === 'national').length,
    [companies]
  )

  const selectedCompanies = selectedState ? (byState[selectedState] ?? []) : []

  return (
    <div className="text-left px-6 py-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Cyber Job Map</h1>
        <p className="text-gray-400 text-sm">
          Click any state to see cybersecurity employers headquartered there.
          {nationalCount > 0 && (
            <span className="ml-2 text-purple-400">
              {nationalCount} national/remote-first companies not shown on map.
            </span>
          )}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-500">Loading map data...</div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-4">

          {/* Map panel */}
          <div className="flex-1 bg-gray-900 rounded-xl border border-gray-800 p-4 relative">
            {hovered && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-800 border border-gray-700 text-white text-xs px-3 py-1.5 rounded-full pointer-events-none z-10 whitespace-nowrap">
                {hovered}
              </div>
            )}

            <ComposableMap
              projection="geoAlbersUsa"
              style={{ width: '100%', height: 'auto' }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map(geo => {
                    const abbr = STATE_ABBR[geo.properties.name as string] ?? ''
                    const count = byState[abbr]?.length ?? 0
                    const isSelected = selectedState === abbr
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => setSelectedState(isSelected ? null : abbr)}
                        onMouseEnter={() => {
                          const label = `${geo.properties.name as string} — ${count} ${count === 1 ? 'company' : 'companies'}`
                          setHovered(label)
                        }}
                        onMouseLeave={() => setHovered(null)}
                        style={{
                          default: {
                            fill: stateColor(count, isSelected),
                            stroke: '#1e2028',
                            strokeWidth: 0.5,
                            outline: 'none',
                          },
                          hover: {
                            fill: '#a855f7',
                            stroke: '#1e2028',
                            strokeWidth: 0.5,
                            outline: 'none',
                            cursor: 'pointer',
                          },
                          pressed: { outline: 'none' },
                        }}
                      />
                    )
                  })
                }
              </Geographies>
            </ComposableMap>

            {/* Legend */}
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 justify-center flex-wrap">
              <span>Companies per state:</span>
              {[
                { color: '#111318', label: '0' },
                { color: '#2d1b4e', label: '1–2' },
                { color: '#5b21b6', label: '3–5' },
                { color: '#7c3aed', label: '6–9' },
                { color: '#a855f7', label: '10+' },
              ].map(({ color, label }) => (
                <span key={label} className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded-sm border border-gray-700" style={{ background: color }} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-72 bg-gray-900 rounded-xl border border-gray-800 p-4 overflow-y-auto lg:max-h-[520px]">
            {!selectedState ? (
              <div className="text-gray-500 text-sm text-center py-16 px-4">
                Click any state on the map to see companies hiring there.
              </div>
            ) : (
              <>
                {/* State header */}
                <div className="mb-4 pb-4 border-b border-gray-800">
                  <h2 className="text-lg font-bold text-white">
                    {ABBR_TO_NAME[selectedState] ?? selectedState}
                    <span className="ml-2 text-gray-500 text-sm font-normal">({selectedState})</span>
                  </h2>

                  {selectedCompanies.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      <div className="bg-gray-800 rounded-lg p-2 text-center">
                        <p className="text-white font-bold text-xl">{selectedCompanies.length}</p>
                        <p className="text-gray-500 text-xs">Companies</p>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-2 text-center">
                        <p className="text-white font-bold text-xl">
                          {Math.round(
                            (selectedCompanies.filter(c => c.clearance_accepted).length /
                              selectedCompanies.length) * 100
                          )}%
                        </p>
                        <p className="text-gray-500 text-xs">Clearance</p>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-2 text-center">
                        <p className="text-white font-bold text-xl">
                          {Math.round(
                            (selectedCompanies.filter(c => c.remote !== 'no').length /
                              selectedCompanies.length) * 100
                          )}%
                        </p>
                        <p className="text-gray-500 text-xs">Remote+</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm mt-2">No companies listed for this state.</p>
                  )}
                </div>

                {/* Company list */}
                <div className="space-y-2">
                  {selectedCompanies.map(c => (
                    <div
                      key={c.id}
                      className="bg-gray-800 rounded-lg p-3 flex items-start justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <p className="text-white text-sm font-medium leading-tight">{c.name}</p>
                        <div className="flex gap-1.5 mt-1.5 flex-wrap">
                          <span className={`text-xs px-1.5 py-0.5 rounded-full ${CATEGORY_COLORS[c.category]}`}>
                            {CATEGORY_LABELS[c.category]}
                          </span>
                          {c.clearance_accepted && (
                            <span className="text-xs px-1.5 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300">
                              Clearance
                            </span>
                          )}
                        </div>
                      </div>
                      <a
                        href={c.career_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-xs bg-purple-600 hover:bg-purple-500 text-white px-2.5 py-1.5 rounded transition-colors"
                      >
                        Jobs
                      </a>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
