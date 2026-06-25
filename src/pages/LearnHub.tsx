const CATEGORIES = [
  {
    id: 'labs',
    label: 'Free Cybersecurity Labs',
    description: 'Hands-on environments to build real skills — browser-based, no setup required.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    resources: [
      { name: 'TryHackMe', url: 'https://tryhackme.com', tags: ['Beginner Friendly', 'Free Tier'], description: 'Beginner-friendly guided paths covering SOC, pentesting, web app security, Active Directory, cloud security and more.' },
      { name: 'Hack The Box', url: 'https://hackthebox.com', tags: ['Intermediate', 'Free Tier'], description: 'Advanced offensive security labs, red teaming, Active Directory, malware analysis, CTFs and real-world attack simulations.' },
      { name: 'OverTheWire', url: 'https://overthewire.org', tags: ['Beginner Friendly', 'Free'], description: 'Old-school Linux and hacking wargames. Excellent for learning Linux, Bash, networking, and privilege escalation from scratch.' },
      { name: 'PicoCTF', url: 'https://picoctf.org', tags: ['Beginner Friendly', 'Free'], description: 'Free beginner Capture The Flag platform created by Carnegie Mellon University. No prior experience needed.' },
      { name: 'Cybrary', url: 'https://cybrary.it', tags: ['Free Tier', 'Courses + Labs'], description: 'Free and paid cybersecurity courses with interactive labs covering SOC, DFIR, cloud, and cert prep.' },
      { name: 'RangeForce Community', url: 'https://rangeforce.com/community-edition', tags: ['Blue Team', 'Free'], description: 'Free community edition with defensive cybersecurity labs and blue team training scenarios.' },
      { name: 'LetsDefend', url: 'https://letsdefend.io', tags: ['Blue Team', 'Free Tier'], description: 'SOC Analyst and Blue Team simulation labs with SIEM dashboards and real incident response scenarios.' },
      { name: 'Blue Team Labs Online', url: 'https://blueteamlabs.online', tags: ['Blue Team', 'Free Tier'], description: 'Investigation-based challenges using real log files, packet captures, malware samples, and DFIR scenarios.' },
      { name: 'Security Blue Team', url: 'https://securityblue.team', tags: ['Blue Team', 'Free Tier'], description: 'Blue team training and labs designed specifically for SOC analysts and DFIR learners.' },
      { name: 'AttackDefense', url: 'https://attackdefense.com', tags: ['Free Tier', 'Browser-Based'], description: 'Browser-based labs for pentesting, red team, web security, and certification practice environments.' },
      { name: 'Root-Me', url: 'https://root-me.org', tags: ['Free', 'CTF-Style'], description: 'Large collection of hacking challenges and real-world exercises across web, network, forensics, and more.' },
      { name: 'VulnHub', url: 'https://vulnhub.com', tags: ['Free', 'Download VM'], description: 'Download vulnerable VMs and practice hacking locally. Hundreds of machines across all skill levels.' },
      { name: 'DVWA', url: 'https://dvwa.co.uk', tags: ['Web Security', 'Free'], description: 'Damn Vulnerable Web Application — practice SQL injection, XSS, CSRF and other OWASP Top 10 attacks safely.' },
      { name: 'OWASP WebGoat', url: 'https://webgoat.org', tags: ['Web Security', 'Free'], description: 'OWASP project teaching common web vulnerabilities through guided lessons in a legal, intentionally insecure app.' },
      { name: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', tags: ['Web Security', 'Free', 'Must Know'], description: 'Excellent free Web Security Academy for mastering Burp Suite and all major web attack categories — SQL injection to OAuth.' },
      { name: 'CyberDefenders', url: 'https://cyberdefenders.org', tags: ['Blue Team', 'Free Tier'], description: 'Blue team labs, packet analysis, and digital forensics challenges used by real SOC teams for training.' },
      { name: 'CTFtime', url: 'https://ctftime.org', tags: ['Free', 'Competitions'], description: 'Find live CTF competitions worldwide. Participate in team-based hacking events to build real skills competitively.' },
      { name: 'KC7 Cyber', url: 'https://kc7cyber.com', tags: ['Blue Team', 'Free'], description: 'Free defensive cybersecurity investigations and SOC-style labs with real-world threat hunting scenarios.' },
      { name: 'OWASP', url: 'https://owasp.org', tags: ['Free', 'Web Security'], description: 'Free security projects, tools, guides, and learning material — the definitive open source web security reference.' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud Security Labs',
    description: 'Hands-on cloud training from the major providers — all have free tiers.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    resources: [
      { name: 'AWS Skill Builder', url: 'https://skillbuilder.aws', tags: ['AWS', 'Free Tier'], description: 'AWS cloud labs and sandbox environments. Hundreds of free digital courses covering security, architecture, and services.' },
      { name: 'Microsoft Learn', url: 'https://learn.microsoft.com', tags: ['Azure', 'Free'], description: 'Microsoft Azure, Sentinel, Defender, Entra ID, and security labs. Free learning paths for SC-900 and SC-200.' },
      { name: 'Google Cloud Skills Boost', url: 'https://cloudskillsboost.google', tags: ['GCP', 'Free Credits'], description: 'Google Cloud Security hands-on labs with free monthly credits. Covers Security Command Center and Chronicle SIEM.' },
      { name: 'Splunk Free Training', url: 'https://splunk.com/en_us/training/free-courses/overview.html', tags: ['SIEM', 'Free', 'Must Know'], description: 'Free Splunk SIEM training and labs. Splunk appears in nearly every SOC job description — start here.' },
    ],
  },
  {
    id: 'offensive',
    label: 'Offensive Security / Red Team',
    description: 'Ethical hacking, penetration testing, and adversary simulation training.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    resources: [
      { name: 'OffSec (Offensive Security)', url: 'https://offsec.com', tags: ['OSCP', 'Advanced', 'Paid+Free'], description: 'OSCP, PEN-200, Kali Linux and advanced red team training. The gold standard for offensive security certifications.' },
      { name: 'PentesterLab', url: 'https://pentesterlab.com', tags: ['Web Security', 'Free Tier'], description: 'Web application security labs from beginner to advanced. Covers SQL injection, authentication bypass, and modern API attacks.' },
      { name: 'INE', url: 'https://ine.com', tags: ['Pentesting', 'Free Starter'], description: 'Massive penetration testing and networking lab platform. Free starter pass available — eJPT cert is a solid entry-level credential.' },
      { name: 'Red Team Labs', url: 'https://redteamlabs.com', tags: ['Red Team', 'Active Directory'], description: 'Red team and Active Directory attack simulations in realistic enterprise environments.' },
    ],
  },
  {
    id: 'defensive',
    label: 'Defensive Security / SOC / DFIR',
    description: 'Blue team training — incident response, threat hunting, forensics, and malware analysis.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    resources: [
      { name: 'SANS Institute', url: 'https://sans.org', tags: ['Gold Standard', 'GIAC Certs'], description: 'Gold standard cybersecurity training and GIAC certifications. Expensive paid courses but free resources, webcasts, and reading room available.' },
      { name: 'AntiSyphon Training', url: 'https://antisyphontraining.com', tags: ['Affordable', 'SOC / DFIR'], description: 'Affordable SOC, DFIR, OSINT, and blue team training from working professionals. Pay-what-you-can model for many courses.' },
      { name: 'Black Hills InfoSec', url: 'https://blackhillsinfosec.com', tags: ['Free Webcasts', 'Hands-On'], description: 'Hands-on cybersecurity training, webcasts, and labs from a respected red team firm. Tons of free content on YouTube and their site.' },
      { name: 'Malware Traffic Analysis', url: 'https://malware-traffic-analysis.net', tags: ['DFIR', 'PCAP', 'Free'], description: 'Free malware traffic PCAP labs and network investigation exercises. Essential practice for anyone doing incident response.' },
      { name: 'VirusTotal', url: 'https://virustotal.com', tags: ['Malware Analysis', 'Free'], description: 'Malware analysis and file/URL reputation platform. Used daily by SOC analysts — understand how to read results correctly.' },
    ],
  },
  {
    id: 'ai',
    label: 'AI + Cybersecurity',
    description: 'Machine learning, AI models, and datasets relevant to security research and automation.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    resources: [
      { name: 'Hugging Face', url: 'https://huggingface.co', tags: ['AI / ML', 'Free'], description: 'AI models, security research datasets, and ML experimentation. Growing resource for AI-powered threat detection research.' },
      { name: 'Kaggle', url: 'https://kaggle.com', tags: ['Datasets', 'Free'], description: 'Machine learning security datasets and projects. Use real threat intelligence data to build detection models.' },
      { name: 'OpenAI', url: 'https://openai.com', tags: ['API', 'Free Tier'], description: 'AI tools and API experimentation for security automation workflows, log analysis, and threat intelligence summarization.' },
    ],
  },
  {
    id: 'networking',
    label: 'Networking + Infrastructure Labs',
    description: 'Virtual network simulation environments for routers, switches, firewalls, and enterprise infra.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    resources: [
      { name: 'Cisco Networking Academy', url: 'https://netacad.com', tags: ['CCNA', 'Free', 'Cisco'], description: 'Cisco\'s free lab platform for CCNA, networking fundamentals, and cybersecurity. Industry standard for network security roles.' },
      { name: 'EVE-NG', url: 'https://eve-ng.net', tags: ['Network Emulation', 'Free Tier'], description: 'Network emulation lab platform supporting real Cisco, Juniper, and Palo Alto images in virtual environments.' },
      { name: 'GNS3', url: 'https://gns3.com', tags: ['Free', 'Open Source'], description: 'Virtual networking labs for routers, switches, and firewalls. The open-source standard for network lab environments.' },
      { name: 'Cisco Packet Tracer', url: 'https://netacad.com/cisco-packet-tracer', tags: ['Free', 'Beginner Friendly'], description: 'Cisco\'s free network simulation tool. Best starting point before moving to EVE-NG or GNS3.' },
    ],
  },
  {
    id: 'vulnmgmt',
    label: 'Vulnerability Management Tools',
    description: 'Enterprise platforms used by security teams — free tiers and training available.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    resources: [
      { name: 'Tenable (Nessus)', url: 'https://tenable.com', tags: ['Vuln Scanning', 'Free Essentials'], description: 'Nessus vulnerability scanning labs and training. Nessus Essentials is free for up to 16 IPs — the industry standard scanner.' },
      { name: 'Qualys', url: 'https://qualys.com', tags: ['VMDR', 'Free Trial'], description: 'VMDR and vulnerability management platform. Free trial available — widely used in enterprise and GovCon environments.' },
      { name: 'Rapid7', url: 'https://rapid7.com', tags: ['InsightVM', 'Free Trial'], description: 'InsightVM labs and vulnerability management. Also makes Metasploit Framework — free open-source version available.' },
      { name: 'Tripwire', url: 'https://tripwire.com', tags: ['FIM', 'Compliance'], description: 'File integrity monitoring and compliance labs. Common in regulated industries and federal environments.' },
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
      { name: 'Professor Messer — Security+', url: 'https://professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/', tags: ['Security+', 'Free', 'Must Know'], description: 'Full SY0-701 course free on his website. The gold standard for free Security+ prep — updated for current exam versions.' },
      { name: 'ISC2 Certified in Cybersecurity (CC)', url: 'https://isc2.org/certifications/cc', tags: ['Entry Level', 'Free Exam*'], description: 'ISC2\'s entry-level cert with free self-paced training included. Best first cert for career changers breaking into the field.' },
      { name: 'SANS Cyber Aces', url: 'https://sans.org/cyberaces/', tags: ['Free', 'Fundamentals'], description: 'Free foundational courses from SANS covering OS, networking, and security basics — the same org behind GIAC certs.' },
      { name: 'Cisco CyberOps', url: 'https://netacad.com/courses/cybersecurity', tags: ['Free', 'Beginner Friendly'], description: 'Free courses covering cybersecurity fundamentals and network defense from Cisco. Good for networking-heavy roles.' },
      { name: 'Microsoft SC-900', url: 'https://learn.microsoft.com/en-us/credentials/certifications/security-compliance-and-identity-fundamentals/', tags: ['Cloud Security', 'Free'], description: 'Free Microsoft learning path for the SC-900 Security Fundamentals exam. Solid for Azure and GovCloud roles.' },
      { name: 'CompTIA CertMaster Learn (Trial)', url: 'https://comptia.org/training/certmaster-learn', tags: ['Security+', 'CySA+', 'Free Trial'], description: 'CompTIA\'s official learning platform has free trial access. Good for getting familiar with exam objectives before buying.' },
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
      { name: 'Paul Jerimy Security Certification Roadmap', url: 'https://pauljerimy.com/security-certification-roadmap/', tags: ['Certs', 'Visual'], description: 'The definitive visual map of 500+ security certifications organized by domain and difficulty. Bookmark this.' },
      { name: 'roadmap.sh — Cyber Security', url: 'https://roadmap.sh/cyber-security', tags: ['Beginner to Advanced', 'Free'], description: 'Community-maintained skill tree for cybersecurity careers. Covers tools, concepts, and skills in order of importance.' },
      { name: 'NICE Cybersecurity Workforce Framework', url: 'https://niccs.cisa.gov/workforce-development/nice-framework', tags: ['GovCon', 'Career Planning'], description: 'CISA\'s official framework defining cybersecurity roles. Critical for understanding what federal and GovCon jobs actually require.' },
      { name: 'TCM Security — Zero to Hero', url: 'https://tcm-sec.com/zero-to-hero-with-tcm-security/', tags: ['Beginner', 'Pentesting'], description: 'Free blog series from TCM Security walking through how to break into ethical hacking completely from scratch.' },
    ],
  },
  {
    id: 'youtube',
    label: 'YouTube Channels',
    description: 'The best free video content for learning and staying current in the field.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    resources: [
      { name: 'Professor Messer', url: 'https://youtube.com/@professormesser', tags: ['Certs', 'CompTIA'], description: 'Free CompTIA cert prep — Security+, Network+, A+. Updated for current exam versions. The most trusted cert channel.' },
      { name: 'John Hammond', url: 'https://youtube.com/@_JohnHammond', tags: ['CTF', 'Malware Analysis'], description: 'CTF walkthroughs, malware reversing, and tool tutorials. High-quality hands-on content for people past the basics.' },
      { name: 'NetworkChuck', url: 'https://youtube.com/@NetworkChuck', tags: ['Beginner Friendly', 'Networking'], description: 'Engaging, beginner-friendly videos on hacking, networking, and Linux. Great for staying motivated early in your journey.' },
      { name: 'TCM Security', url: 'https://youtube.com/@TCMSecurityAcademy', tags: ['Pentesting', 'Ethical Hacking'], description: 'Practical pentesting courses and tutorials from a working red teamer. Tons of free content alongside affordable paid courses.' },
      { name: 'David Bombal', url: 'https://youtube.com/@davidbombal', tags: ['Networking', 'Tools'], description: 'Deep dives on networking tools, Python, and career advice. Strong focus on practical Cisco and security skills.' },
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
      { name: 'Kali Linux', url: 'https://kali.org/get-kali/', tags: ['Pentesting', 'Free', 'OS'], description: 'Industry-standard Linux distro for penetration testing. Comes pre-loaded with 600+ security tools. Run as a VM.' },
      { name: 'Wireshark', url: 'https://wireshark.org', tags: ['Network Analysis', 'Free', 'Must Know'], description: 'The standard packet capture and analysis tool. Required knowledge for SOC, network security, and incident response roles.' },
      { name: 'Nmap', url: 'https://nmap.org', tags: ['Reconnaissance', 'Free', 'Must Know'], description: 'Network discovery and port scanning. Appears in nearly every penetration test and network audit.' },
      { name: 'Burp Suite Community', url: 'https://portswigger.net/burp/communitydownload', tags: ['Web Security', 'Free Tier'], description: 'Standard tool for web application security testing. Free community edition covers core interception and scanning.' },
      { name: 'OWASP ZAP', url: 'https://zaproxy.org', tags: ['Web Security', 'Free', 'Open Source'], description: 'Fully free and open-source web app scanner. Good alternative or complement to Burp Suite Community.' },
      { name: 'Autopsy', url: 'https://autopsy.com', tags: ['DFIR', 'Forensics', 'Free'], description: 'Free digital forensics platform used by law enforcement and security teams. Essential for incident response careers.' },
    ],
  },
  {
    id: 'bonus',
    label: 'Bonus Training Platforms',
    description: 'General online learning platforms with cybersecurity courses — most have free tiers or trials.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    resources: [
      { name: 'Coursera', url: 'https://coursera.org', tags: ['Free Audit', 'Certificates'], description: 'University-backed cybersecurity courses. Audit most courses for free — pay only if you want the certificate.' },
      { name: 'edX', url: 'https://edx.org', tags: ['Free Audit', 'University'], description: 'MIT, Harvard, and industry cybersecurity courses. Audit for free or pay for a verified certificate.' },
      { name: 'Udemy', url: 'https://udemy.com', tags: ['Paid / Sales', 'Practical'], description: 'Massive library of practical cybersecurity courses. Rarely full price — wait for sales where courses drop to $10-15.' },
      { name: 'Codecademy', url: 'https://codecademy.com', tags: ['Free Tier', 'Coding'], description: 'Learn Python, Bash, and SQL — foundational skills that make you a stronger security professional.' },
      { name: 'freeCodeCamp', url: 'https://freecodecamp.org', tags: ['Free', 'Coding'], description: 'Completely free coding curriculum. Python and JavaScript skills are increasingly required in security roles.' },
      { name: 'Pluralsight', url: 'https://pluralsight.com', tags: ['Free Trial', 'In-Depth'], description: 'Deep technical courses on cloud security, DevSecOps, and tool-specific training. 10-day free trial available.' },
      { name: 'LinkedIn Learning', url: 'https://linkedin.com/learning', tags: ['Free Trial', 'Soft Skills'], description: '1-month free trial. Good for foundational security concepts, compliance, and soft skills alongside technical content.' },
    ],
  },
]

const TAG_COLORS: Record<string, string> = {
  'Beginner Friendly': 'bg-emerald-900/60 text-emerald-300',
  'Beginner': 'bg-emerald-900/60 text-emerald-300',
  'Intermediate': 'bg-yellow-900/60 text-yellow-300',
  'Advanced': 'bg-red-900/60 text-red-300',
  'Free': 'bg-[#005F73]/50 text-[#94D2BD]',
  'Free Tier': 'bg-[#005F73]/50 text-[#94D2BD]',
  'Free Trial': 'bg-[#005F73]/50 text-[#94D2BD]',
  'Free Audit': 'bg-[#005F73]/50 text-[#94D2BD]',
  'Free Exam*': 'bg-[#005F73]/50 text-[#94D2BD]',
  'Free Starter': 'bg-[#005F73]/50 text-[#94D2BD]',
  'Free Credits': 'bg-[#005F73]/50 text-[#94D2BD]',
  'Free Essentials': 'bg-[#005F73]/50 text-[#94D2BD]',
  'Free Webcasts': 'bg-[#005F73]/50 text-[#94D2BD]',
  'Blue Team': 'bg-blue-900/60 text-blue-300',
  'Must Know': 'bg-amber-900/60 text-amber-300',
  'GovCon': 'bg-purple-900/60 text-purple-300',
  'SIEM': 'bg-purple-900/60 text-purple-300',
  'OSCP': 'bg-red-900/60 text-red-300',
  'Red Team': 'bg-red-900/60 text-red-300',
  'DFIR': 'bg-blue-900/60 text-blue-300',
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
