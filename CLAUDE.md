# CyberHunt — Cybersecurity Job Search Platform

## Project At A Glance
**Tagline:** "One search. Hundreds of cybersecurity employers."

CyberHunt aggregates direct career links for cybersecurity jobs across government contractors, vendors, consulting firms, and staffing agencies into a single searchable platform. Built as a 30-day pilot for the 48K-member Cybersecurity Beginners Hub Facebook group.

## Stack
- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Hosting:** Vercel (deployment + serverless functions)
- **Backend:** Supabase (PostgreSQL) for company data
- **Data Freshness:** n8n (weekly health checks for dead links)
- **AI Feature:** Claude API (Haiku) for the AI Matcher endpoint

## Key Links
- **Supabase Project:** [Will be set after project creation]
- **GitHub Repo:** [Will be set after repo creation]
- **Vercel Deployment:** https://cyberhunt-psi.vercel.app/
- **Facebook Group Partner:** Cybersecurity Beginners Hub (48K members)

## Core Features (MVP)

### 1. Directory (Cyber Hunt)
Searchable, filterable table of 100-150 cybersecurity employers.
- Columns: Name | Category | State | Remote/Hybrid | Clearance Accepted | Career URL
- Filters: Category (govcon/vendor/consulting/staffing), state, remote preference, clearance level
- Search: By company name and certification preferences
- Action: Direct "View Jobs" button linking to each company's career page

### 2. US Map (Cyber Job Map)
Interactive U.S. map for geographic job discovery.
- Click any state → sidebar shows companies HQ'd/hiring in that state
- Color-coded by employer density
- Stats per state: Company count, remote ratio, clearance demand
- Highly shareable on LinkedIn (primary viral hook)

### 3. AI Matcher (Cyber Job Search AI)
Simple form for personalized company recommendations.
- User inputs: Certifications (Security+, CISSP, CEH, CISM, etc.), clearance level, remote preference, state
- Backend: POST to /api/match, Claude Haiku ranks companies using rule-based scoring
- Output: Top 5-10 matching companies with match_score and reasoning
- Framed as "AI" in marketing; actually rule-based scoring against company data

### 4. Landing Page
Co-branded with Cybersecurity Beginners Hub.
- Header: "CyberHunt — Built in Partnership with Cybersecurity Beginners Hub"
- Three feature callouts (Directory, Map, Matcher)
- Single CTA: "Find Your Next Cyber Role →"
- Fully public, no authentication required for pilot

## Supabase Schema

### companies table
```
id: UUID (primary key, default gen_random_uuid())
name: text (not null)
category: text ('govcon' | 'vendor' | 'consulting' | 'staffing')
career_url: text
remote: text ('yes' | 'hybrid' | 'no')
clearance_accepted: boolean
clearance_levels: text[] (e.g. ['Secret','TS','TS/SCI'])
preferred_certs: text[] (e.g. ['Security+','CISSP','CEH'])
state: text (primary HQ state, 'national' for remote-only)
open_roles_note: text (e.g. "200+ active")
last_checked: date (updated by n8n weekly)
is_featured: boolean (default false, for future paid listings)
```

**Access Policy:** Public read for pilot (no RLS). Admin-only write. RLS added when monetization goes live.

## Data Seeding
- **Initial Seed:** 110 real companies (50 govcon, 25 vendor, 20 consulting, 25 staffing)
- **Seed File:** SEED_DATA.sql (ready for bulk import)
- **Future:** After pilot validation, automated scraping via n8n + Firecrawl to keep URLs fresh

## API Routes

### /api/match (Vercel Serverless)
**Method:** POST
**Body:**
```json
{
  "certs": ["Security+", "CISSP"],
  "clearance": "TS",
  "remote": "yes",
  "state": "VA"
}
```

**Logic:**
1. Query Supabase for companies matching clearance + remote filters
2. Build compact prompt with user profile + filtered company list
3. Send to Claude Haiku for ranking
4. Return top 5-10 with match_score and reasoning

**Model:** claude-haiku-4-5-20251001 (cheapest, sufficient for ranking)

## n8n Workflow (Health Check)
- **Runs:** Every Sunday 6am
- **Task:** HTTP request to each company career_url
- **Trigger:** Non-200 response → update last_checked + flag in Supabase
- **Purpose:** Keep directory fresh; identify dead links before users encounter them

## Development Timeline (2-3 weeks)

| Session | Task | Est. Time | Status |
|---------|------|-----------|--------|
| Pre-Work | Supabase + GitHub + Vercel setup | 1-2 hrs | Pending |
| Session 1 | Schema + seed 50 companies | 2 hrs | Pending |
| Session 2 | Directory table component | 2 hrs | Pending |
| Session 3 | US Map component | 2 hrs | Pending |
| Session 4 | AI Matcher form + /api/match | 3 hrs | Pending |
| Session 5 | Landing page + routing | 1.5 hrs | Pending |
| Session 6 | Mobile polish + Vercel deploy | 1.5 hrs | Pending |
| Session 7 | n8n health check workflow | 1 hr | Pending |
| Weeks 2-3 | Soft launch + usage data collection | 2 weeks | Pending |

**Total Build Time:** ~13 hours focused work
**Total Timeline:** 2-3 weeks including launch + data collection

## Monetization (Future, Post-Pilot)
- **B2B Featured Listings:** GovCon contractors + staffing agencies ($200-500/mo)
- **Recruiter Directory Placements:** Recruiters pay to be verified/listed ($150-300/mo)
- **Staffing Agency Affiliate Fees:** Commission on placements or lead bounties
- **Consumer Pro ($9-19/mo):** Job alerts, saved filters, matcher history
- **Cert Affiliate Links:** CompTIA Security+, ISC2 CISSP (passive income)

**Revenue Share:** 20% of B2B revenue to Cybersecurity Beginners Hub (partnership agreement)

## Important Notes for Claude Code Sessions
- Start each session by reading this CLAUDE.md file (`/context` or reference @CLAUDE.md)
- Use `@filename` to reference specific files rather than letting Claude scan the whole repo
- Break builds into separate focused sessions by feature — don't do everything in one long conversation
- **Token Efficiency:** Use Sonnet 4.6 for planning/architecture; use Haiku for the API matcher feature (cost-effective)
- **API Key Management:** Supabase keys in env vars; separate Anthropic API key for /api/match endpoint (not your Pro subscription)
- **Testing:** Test directory + map locally before session 5. Test AI Matcher in isolation before session 5 integration.

## Git Workflow
- Commit after each Claude Code session
- Use clear commit messages: "Session 1: Supabase schema + seed data", "Session 2: Directory table", etc.
- Push to GitHub to trigger automatic Vercel deployment
- Monitor Vercel preview deployments before merging to main

---

**Built by:** James (Sr. Security Specialist, DAC Inc. + Developer)
**Partner:** Cybersecurity Beginners Hub (48K-member Facebook group)
**Pilot Period:** 30 days (launch → data collection → B2B sales)
