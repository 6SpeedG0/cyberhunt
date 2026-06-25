const CATEGORIES = [
  {
    id: 'labs',
    label: 'Free Labs & Practice',
    description: 'Hands-on environments to build real skills without spending a dime.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    resources: [
      {
        name: 'TryHackMe',
        url: 'https://tryhackme.com',
        tags: ['Beginner Friendly', 'Free Tier'],
        description: 'Browser-based learning paths covering SOC, pentesting, and blue team skills. Best starting point for absolute beginners.',
      },
      {
        name: 'Hack The Box',
        url: 'https://hackthebox.com',
        tags: ['Intermediate', 'Free Tier'],
        description: 'Real-world offensive security machines and labs. Free tier includes active machines. Step up after TryHackMe.',
      },
      {
        name: 'CyberDefenders',
        url: 'https://cyberdefenders.org',
        tags: ['Blue Team', 'Free'],
        description: 'Defensive security labs focused on incident response, threat hunting, and DFIR. Excellent for SOC analyst roles.',
      },
      {
        name: 'Blue Team Labs Online',
        url: 'https://blueteamlabs.online',
        tags: ['Blue Team', 'Free Tier'],
        description: 'Investigation-based challenges using real log files, packet captures, and malware samples.',
      },
      {
        name: 'PicoCTF',
        url: 'https://picoctf.org',
        tags: ['Beginner Friendly', 'Free'],
        description: 'Carnegie Mellon\'s free CTF platform. Great for learning fundamentals through puzzles — no prior experience needed.',
      },
      {
        name: 'OWASP WebGoat',
        url: 'https://owasp.org/www-project-webgoat',
        tags: ['Web Security', 'Free'],
        description: 'Deliberately insecure web app for learning OWASP Top 10 vulnerabilities in a safe, legal environment.',
      },
    ],
  },
  {
    id: 'certs',
    label: 'Certifications & Study Resources',
    description: 'Free study materials for the certifications that matter most in cybersecurity hiring.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    resources: [
      {
        name: 'Professor Messer — Security+',
        url: 'https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/',
        tags: ['Security+', 'Free', 'Video'],
        description: 'Full SY0-701 course — free on his website. The gold standard for free Security+ prep. No sign-up required.',
      },
      {
        name: 'ISC2 Certified in Cybersecurity (CC)',
        url: 'https://www.isc2.org/certifications/cc',
        tags: ['Entry Level', 'Free Exam*'],
        description: 'ISC2\'s entry-level cert with free self-paced training included. Best first cert for career changers breaking into the field.',
      },
      {
        name: 'Cisco Networking Academy — CyberOps',
        url: 'https://www.netacad.com/courses/cybersecurity',
        tags: ['Free', 'Beginner Friendly'],
        description: 'Free courses covering cybersecurity fundamentals, ethical hacking basics, and network defense. No prior experience needed.',
      },
      {
        name: 'Microsoft Learn — SC-900',
        url: 'https://learn.microsoft.com/en-us/credentials/certifications/security-compliance-and-identity-fundamentals/',
        tags: ['Cloud Security', 'Free'],
        description: 'Free Microsoft learning path for the SC-900 Security Fundamentals exam. Good for cloud/Azure-focused roles.',
      },
      {
        name: 'SANS Cyber Aces',
        url: 'https://www.sans.org/cyberaces/',
        tags: ['Free', 'Fundamentals'],
        description: 'Free foundational courses from SANS covering OS, networking, and security basics — the same org behind GIAC certs.',
      },
      {
        name: 'CompTIA CertMaster Learn (Trial)',
        url: 'https://www.comptia.org/training/certmaster-learn',
        tags: ['Security+', 'CySA+', 'Free Trial'],
        description: 'CompTIA\'s official learning platform has free trial access. Good for getting familiar with official exam objectives.',
      },
    ],
  },
  {
    id: 'paths',
    label: 'Career Roadmaps',
    description: 'Visual guides to navigate from where you are to where you want to be.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-10l6-3m0 13l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4" />
      </svg>
    ),
    resources: [
      {
        name: 'Paul Jerimy Security Certification Roadmap',
        url: 'https://pauljerimy.com/security-certification-roadmap/',
        tags: ['Certs', 'Visual'],
        description: 'The definitive visual map of 500+ security certifications organized by domain and difficulty. Bookmark this.',
      },
      {
        name: 'roadmap.sh — Cyber Security Path',
        url: 'https://roadmap.sh/cyber-security',
        tags: ['Beginner to Advanced', 'Free'],
        description: 'Community-maintained skill tree for cybersecurity careers. Covers tools, concepts, and skills in order of importance.',
      },
      {
        name: 'NICE Cybersecurity Workforce Framework',
        url: 'https://niccs.cisa.gov/workforce-development/nice-framework',
        tags: ['GovCon', 'Career Planning'],
        description: 'CISA\'s official framework for cybersecurity roles. Critical for understanding what federal and GovCon jobs actually require.',
      },
      {
        name: 'TCM Security — Zero to Hero',
        url: 'https://tcm-sec.com/zero-to-hero-with-tcm-security/',
        tags: ['Beginner', 'Offensive Security'],
        description: 'Free blog series from TCM Security walking through how to break into ethical hacking from scratch.',
      },
    ],
  },
  {
    id: 'youtube',
    label: 'YouTube Channels',
    description: 'The best free video content for learning and staying current.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    resources: [
      {
        name: 'Professor Messer',
        url: 'https://youtube.com/@professormesser',
        tags: ['Certs', 'CompTIA'],
        description: 'Free CompTIA cert prep videos — Security+, Network+, A+. Updated for current exam versions. The most trusted cert channel.',
      },
      {
        name: 'John Hammond',
        url: 'https://youtube.com/@_JohnHammond',
        tags: ['CTF', 'Malware Analysis', 'Intermediate'],
        description: 'CTF walkthroughs, malware reversing, and tool tutorials. High quality, hands-on content for people past the basics.',
      },
      {
        name: 'NetworkChuck',
        url: 'https://youtube.com/@NetworkChuck',
        tags: ['Beginner Friendly', 'Networking', 'Hacking'],
        description: 'Engaging, beginner-friendly videos on hacking, networking, and Linux. Great for keeping motivation up early in the journey.',
      },
      {
        name: 'TCM Security',
        url: 'https://youtube.com/@TCMSecurityAcademy',
        tags: ['Pentesting', 'Ethical Hacking'],
        description: 'Practical pentesting courses and tutorials from a working red teamer. Affordable paid courses but tons of free content too.',
      },
      {
        name: 'David Bombal',
        url: 'https://youtube.com/@davidbombal',
        tags: ['Networking', 'Tools', 'Interviews'],
        description: 'Deep dives on networking tools, interview prep, and career advice. Strong focus on Cisco, Python, and practical skills.',
      },
    ],
  },
  {
    id: 'tools',
    label: 'Essential Free Tools',
    description: 'Industry-standard tools used by security professionals daily — all free.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    resources: [
      {
        name: 'Kali Linux',
        url: 'https://www.kali.org/get-kali/',
        tags: ['Pentesting', 'Free', 'OS'],
        description: 'The industry-standard Linux distro for penetration testing. Comes pre-loaded with 600+ security tools. Run as a VM.',
      },
      {
        name: 'Wireshark',
        url: 'https://wireshark.org',
        tags: ['Network Analysis', 'Free', 'Must Know'],
        description: 'The standard packet capture and analysis tool. Required knowledge for SOC, network security, and incident response roles.',
      },
      {
        name: 'Nmap',
        url: 'https://nmap.org',
        tags: ['Reconnaissance', 'Free', 'Must Know'],
        description: 'Network discovery and port scanning tool. Appears in nearly every penetration test and network audit.',
      },
      {
        name: 'Burp Suite Community',
        url: 'https://portswigger.net/burp/communitydownload',
        tags: ['Web Security', 'Free Tier'],
        description: 'The standard tool for web application security testing. Free community edition covers the core interception and scanning features.',
      },
      {
        name: 'OWASP ZAP',
        url: 'https://zaproxy.org',
        tags: ['Web Security', 'Free', 'Open Source'],
        description: 'Fully free and open-source web app scanner. Good alternative or complement to Burp Suite Community.',
      },
      {
        name: 'Autopsy',
        url: 'https://www.autopsy.com',
        tags: ['DFIR', 'Forensics', 'Free'],
        description: 'Free digital forensics platform used by law enforcement and security teams. Essential for incident response and DFIR careers.',
      },
    ],
  },
]

const TAG_COLORS: Record<string, string> = {
  'Beginner Friendly': 'bg-emerald-900/60 text-emerald-300',
  'Beginner': 'bg-emerald-900/60 text-emerald-300',
  'Intermediate': 'bg-yellow-900/60 text-yellow-300',
  'Free': 'bg-[#005F73]/50 text-[#94D2BD]',
  'Free Tier': 'bg-[#005F73]/50 text-[#94D2BD]',
  'Free Trial': 'bg-[#005F73]/50 text-[#94D2BD]',
  'Free Exam*': 'bg-[#005F73]/50 text-[#94D2BD]',
  'Blue Team': 'bg-blue-900/60 text-blue-300',
  'Must Know': 'bg-amber-900/60 text-amber-300',
  'GovCon': 'bg-purple-900/60 text-purple-300',
}

function tagColor(tag: string) {
  return TAG_COLORS[tag] ?? 'bg-gray-800 text-gray-400'
}

export default function LearnHub() {
  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-10">
        <div className="inline-block mb-3 text-xs font-medium bg-[#005F73]/30 text-[#94D2BD] border border-[#0A9396]/50 px-3 py-1 rounded-full">
          Learning Hub
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Learn Cybersecurity — Free</h1>
        <p className="text-gray-400 text-sm max-w-xl">
          Curated labs, cert resources, career roadmaps, and tools — everything you need to build skills and land a job, at no cost.
        </p>
      </div>

      {/* Category sections */}
      {CATEGORIES.map(cat => (
        <div key={cat.id} className="mb-12">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#0A9396]">{cat.icon}</span>
            <h2 className="text-white font-bold text-lg">{cat.label}</h2>
          </div>
          <p className="text-gray-500 text-xs mb-5 ml-7">{cat.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.resources.map(r => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-900 border border-gray-800 hover:border-[#0A9396]/50 rounded-xl p-4 flex flex-col transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-white font-semibold text-sm group-hover:text-[#94D2BD] transition-colors leading-snug">
                    {r.name}
                  </h3>
                  <svg className="w-3.5 h-3.5 text-gray-600 group-hover:text-[#94D2BD] shrink-0 mt-0.5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed flex-1 mb-3">{r.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {r.tags.map(tag => (
                    <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColor(tag)}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}

      {/* Footer CTA */}
      <div className="border-t border-gray-800 pt-8 text-center">
        <p className="text-gray-500 text-sm mb-1">Missing a resource you love?</p>
        <a
          href="mailto:jcarter.itprofessional@gmail.com?subject=CyberHunt Learning Hub Suggestion"
          className="text-[#0A9396] hover:text-[#94D2BD] text-sm font-medium transition-colors"
        >
          Suggest a resource &rarr;
        </a>
      </div>

    </div>
  )
}
