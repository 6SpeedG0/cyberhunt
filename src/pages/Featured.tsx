import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Partner = {
  id: string
  name: string
  tagline: string | null
  description: string | null
  logo_url: string | null
  website_url: string | null
  email: string | null
  phone: string | null
  display_order: number
}

export default function Featured() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('featured_partners')
      .select('*')
      .order('display_order')
      .then(({ data }) => {
        setPartners(data ?? [])
        setLoading(false)
      })
  }, [])

  const [founding, ...rest] = partners

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto">

      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-block mb-3 text-xs font-medium bg-[#005F73]/30 text-[#94D2BD] border border-[#0A9396]/50 px-3 py-1 rounded-full">
          Featured Partners
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Trusted by the Community</h1>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          Organizations committed to growing the cybersecurity workforce — vetted and endorsed by CyberHunt and the Cybersecurity Beginners Hub.
        </p>
      </div>

      {loading && (
        <div className="text-center py-20 text-gray-500">Loading partners...</div>
      )}

      {!loading && founding && (
        <>
          {/* Founding Partner Hero Card */}
          <div className="mb-3 text-center">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">Founding Partner</span>
          </div>
          <div className="bg-gray-900 border border-amber-500/30 rounded-2xl p-8 mb-10 shadow-lg shadow-amber-900/10">
            <div className="flex flex-col sm:flex-row gap-6 items-start">

              {/* Logo */}
              {founding.logo_url && (
                <div className="shrink-0 bg-white rounded-xl p-3 w-32 h-32 flex items-center justify-center">
                  <img
                    src={founding.logo_url}
                    alt={founding.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h2 className="text-white text-xl font-bold mb-1">{founding.name}</h2>
                {founding.tagline && (
                  <p className="text-amber-400 text-sm font-medium mb-3 italic">"{founding.tagline}"</p>
                )}
                {founding.description && (
                  <p className="text-gray-300 text-sm leading-relaxed mb-5">{founding.description}</p>
                )}

                {/* Contact row */}
                <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-5">
                  {founding.phone && (
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {founding.phone}
                    </span>
                  )}
                  {founding.email && (
                    <a href={`mailto:${founding.email}`} className="flex items-center gap-1 hover:text-[#94D2BD] transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {founding.email}
                    </a>
                  )}
                </div>

                {founding.website_url && (
                  <div className="flex justify-center sm:justify-start">
                    <a
                      href={founding.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
                    >
                      Visit TSCA &rarr;
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Additional featured partners grid */}
      {!loading && rest.length > 0 && (
        <div className="mb-10">
          <h3 className="text-white font-semibold text-lg mb-4">Featured Companies</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rest.map(p => (
              <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col">
                {p.logo_url && (
                  <div className="bg-white rounded-lg p-2 w-20 h-20 flex items-center justify-center mb-4">
                    <img src={p.logo_url} alt={p.name} className="max-w-full max-h-full object-contain" />
                  </div>
                )}
                <h3 className="text-white font-semibold text-base mb-1">{p.name}</h3>
                {p.tagline && <p className="text-[#94D2BD] text-xs mb-2 italic">"{p.tagline}"</p>}
                {p.description && <p className="text-gray-400 text-xs leading-relaxed flex-1 mb-4">{p.description}</p>}
                {p.website_url && (
                  <a
                    href={p.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#0A9396] hover:text-[#94D2BD] font-medium transition-colors"
                  >
                    Visit Website &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Become a Featured Partner CTA */}
      {!loading && (
        <div className="bg-gray-900 border border-[#0A9396]/40 rounded-2xl p-8 text-center">
          <h3 className="text-white font-bold text-xl mb-2">Get Your Company Featured</h3>
          <p className="text-gray-400 text-sm max-w-lg mx-auto mb-6">
            Put your brand in front of 50,000 cybersecurity professionals. Featured partners get a dedicated showcase card, logo placement, and priority visibility across CyberHunt.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
            <div className="bg-gray-800 rounded-lg px-5 py-3 text-center">
              <p className="text-[#94D2BD] font-bold text-xl">$250<span className="text-sm font-normal text-gray-400">/mo</span></p>
              <p className="text-gray-500 text-xs">Featured Listing</p>
            </div>
            <div className="bg-gray-800 rounded-lg px-5 py-3 text-center">
              <p className="text-[#94D2BD] font-bold text-xl">$150<span className="text-sm font-normal text-gray-400">/mo</span></p>
              <p className="text-gray-500 text-xs">Enhanced Profile</p>
            </div>
          </div>
          <a
            href="mailto:jcarter.itprofessional@gmail.com?subject=CyberHunt Featured Partner Inquiry"
            className="inline-block bg-[#94D2BD] hover:bg-[#E9D8A6] text-gray-900 font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
          >
            Contact Us to Get Listed
          </a>
          <p className="text-gray-600 text-xs mt-3">No long-term contract. Cancel anytime.</p>
        </div>
      )}

    </div>
  )
}
