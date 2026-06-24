import { Link } from 'react-router-dom'

const FEATURES = [
  {
    to: '/directory',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 10h18M3 14h18M10 6l-4 4 4 4M14 6l4 4-4 4" />
      </svg>
    ),
    label: 'Job Directory',
    headline: '50+ Employers. Zero Middlemen.',
    body: 'Searchable table of government contractors, vendors, consulting firms, and staffing agencies — filtered by cert, clearance, remote, and state.',
    cta: 'Browse the Directory',
  },
  {
    to: '/map',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-10l6-3m0 13l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4" />
      </svg>
    ),
    label: 'Job Map',
    headline: 'Find Jobs by State.',
    body: 'Click any state on the US map to see cybersecurity employers headquartered there — with remote ratios and clearance demand at a glance.',
    cta: 'Explore the Map',
  },
  {
    to: '/matcher',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    label: 'AI Matcher',
    headline: 'Get Ranked Employer Picks.',
    body: 'Enter your certs, clearance level, and work style. Our AI ranks the best-fit employers from the directory and explains each match.',
    cta: 'Try the Matcher',
  },
]

export default function Landing() {
  return (
    <div className="px-6 py-12 max-w-4xl mx-auto">

      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-block mb-4 text-xs font-medium bg-[#005F73]/30 text-[#94D2BD] border border-[#0A9396]/50 px-3 py-1 rounded-full">
          Built in partnership with Cybersecurity Beginners Hub
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
          One search.<br />
          <span className="text-[#0A9396]">Hundreds of cyber employers.</span>
        </h1>

        <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-8 text-center">
          CyberHunt aggregates direct career links for cybersecurity jobs — no recruiters,
          no job boards, no noise. Just employers, filtered for your profile.
        </p>

        <Link
          to="/directory"
          className="inline-block bg-[#94D2BD] hover:bg-[#E9D8A6] text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
        >
          Find Your Next Cyber Role &rarr;
        </Link>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
        {FEATURES.map(f => (
          <div key={f.to} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col">
            <div className="text-[#0A9396] mb-3">{f.icon}</div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{f.label}</p>
            <h2 className="text-white font-semibold text-base mb-2 leading-snug">{f.headline}</h2>
            <p className="text-gray-400 text-xs leading-relaxed flex-1 mb-4">{f.body}</p>
            <Link
              to={f.to}
              className="text-xs text-[#0A9396] hover:text-[#94D2BD] font-medium transition-colors"
            >
              {f.cta} &rarr;
            </Link>
          </div>
        ))}
      </div>

      {/* Footer trust line */}
      <div className="text-center border-t border-gray-800 pt-8">
        <p className="text-gray-600 text-xs">
          Built for the{' '}
          <span className="text-gray-500 font-medium">48,000-member Cybersecurity Beginners Hub</span>
          {' '}Facebook group &mdash; 30-day pilot, fully free.
        </p>
      </div>

    </div>
  )
}
