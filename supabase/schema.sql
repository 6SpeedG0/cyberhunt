-- Run this in Supabase Dashboard → SQL Editor

-- 1. Create companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT CHECK (category IN ('govcon', 'vendor', 'consulting', 'staffing')),
  career_url TEXT,
  remote TEXT CHECK (remote IN ('yes', 'hybrid', 'no')),
  clearance_accepted BOOLEAN DEFAULT false,
  clearance_levels TEXT[] DEFAULT '{}',
  preferred_certs TEXT[] DEFAULT '{}',
  state TEXT,
  open_roles_note TEXT,
  last_checked DATE,
  is_featured BOOLEAN DEFAULT false
);

-- 2. Seed 50 companies
INSERT INTO companies (name, category, career_url, remote, clearance_accepted, clearance_levels, preferred_certs, state, open_roles_note, is_featured) VALUES

-- GovCon (17)
('Leidos', 'govcon', 'https://careers.leidos.com', 'hybrid', true, ARRAY['Secret','TS','TS/SCI'], ARRAY['Security+','CISSP','CEH'], 'VA', '500+ active', false),
('Booz Allen Hamilton', 'govcon', 'https://careers.boozallen.com', 'hybrid', true, ARRAY['Secret','TS','TS/SCI','Public Trust'], ARRAY['CISSP','Security+','CISM'], 'VA', '300+ active', false),
('SAIC', 'govcon', 'https://www.saic.com/careers', 'hybrid', true, ARRAY['Secret','TS','TS/SCI'], ARRAY['Security+','CISSP'], 'VA', '400+ active', false),
('ManTech International', 'govcon', 'https://www.mantech.com/careers', 'hybrid', true, ARRAY['Secret','TS','TS/SCI'], ARRAY['Security+','CEH','CISSP'], 'VA', '200+ active', false),
('CACI International', 'govcon', 'https://careers.caci.com', 'hybrid', true, ARRAY['Secret','TS','TS/SCI'], ARRAY['Security+','CISSP','CEH'], 'VA', '250+ active', false),
('Peraton', 'govcon', 'https://www.peraton.com/careers', 'hybrid', true, ARRAY['Secret','TS','TS/SCI'], ARRAY['Security+','CISSP'], 'VA', '150+ active', false),
('General Dynamics IT', 'govcon', 'https://careers.gdit.com', 'hybrid', true, ARRAY['Secret','TS','TS/SCI','Public Trust'], ARRAY['Security+','CISSP','CISM'], 'VA', '350+ active', false),
('Northrop Grumman', 'govcon', 'https://www.northropgrumman.com/careers', 'hybrid', true, ARRAY['Secret','TS','TS/SCI'], ARRAY['Security+','CISSP'], 'VA', '200+ active', false),
('Raytheon Intelligence & Space', 'govcon', 'https://jobs.rtx.com', 'hybrid', true, ARRAY['Secret','TS','TS/SCI'], ARRAY['Security+','CISSP'], 'VA', '100+ active', false),
('L3Harris Technologies', 'govcon', 'https://careers.l3harris.com', 'hybrid', true, ARRAY['Secret','TS','TS/SCI'], ARRAY['Security+','CISSP'], 'FL', '150+ active', false),
('BAE Systems', 'govcon', 'https://jobs.baesystems.com/global/en', 'hybrid', true, ARRAY['Secret','TS'], ARRAY['Security+','CISSP'], 'VA', '100+ active', false),
('Parsons Corporation', 'govcon', 'https://www.parsons.com/careers', 'hybrid', true, ARRAY['Secret','TS','TS/SCI'], ARRAY['Security+','CISSP'], 'VA', '100+ active', false),
('Amentum', 'govcon', 'https://careers.amentum.com', 'hybrid', true, ARRAY['Secret','TS'], ARRAY['Security+','CISSP'], 'MD', '80+ active', false),
('Jacobs Engineering', 'govcon', 'https://careers.jacobs.com', 'hybrid', true, ARRAY['Secret','TS'], ARRAY['Security+','CISSP'], 'TX', '100+ active', false),
('ICF International', 'govcon', 'https://www.icf.com/careers', 'hybrid', true, ARRAY['Public Trust','Secret'], ARRAY['Security+','CISSP'], 'VA', '50+ active', false),
('Chenega Corporation', 'govcon', 'https://www.chenegacorporation.com/careers', 'hybrid', true, ARRAY['Secret','TS','TS/SCI'], ARRAY['Security+'], 'AK', '30+ active', false),
('DXC Technology', 'govcon', 'https://jobs.dxc.com', 'hybrid', true, ARRAY['Public Trust','Secret'], ARRAY['Security+','CISSP'], 'VA', '80+ active', false),

-- Vendor (12)
('CrowdStrike', 'vendor', 'https://www.crowdstrike.com/careers', 'yes', false, '{}', ARRAY['CISSP','CEH','Security+'], 'TX', '200+ active', false),
('Palo Alto Networks', 'vendor', 'https://www.paloaltonetworks.com/company/careers', 'yes', false, '{}', ARRAY['PCNSE','CISSP','Security+'], 'CA', '300+ active', false),
('Fortinet', 'vendor', 'https://www.fortinet.com/corporate/careers', 'yes', false, '{}', ARRAY['NSE4','NSE7','Security+'], 'CA', '150+ active', false),
('Splunk', 'vendor', 'https://www.splunk.com/en_us/careers.html', 'yes', false, '{}', ARRAY['Splunk Core','CISSP','Security+'], 'CA', '200+ active', false),
('Tenable', 'vendor', 'https://www.tenable.com/careers', 'yes', false, '{}', ARRAY['Security+','CISSP'], 'MD', '100+ active', false),
('SentinelOne', 'vendor', 'https://www.sentinelone.com/jobs', 'yes', false, '{}', ARRAY['CISSP','CEH'], 'CA', '150+ active', false),
('CyberArk', 'vendor', 'https://careers.cyberark.com', 'yes', false, '{}', ARRAY['CISSP','CyberArk Defender'], 'MA', '80+ active', false),
('Rapid7', 'vendor', 'https://www.rapid7.com/company/careers', 'yes', false, '{}', ARRAY['Security+','CEH','CISSP'], 'MA', '100+ active', false),
('Qualys', 'vendor', 'https://www.qualys.com/company/careers', 'yes', false, '{}', ARRAY['Security+','CISSP'], 'CA', '50+ active', false),
('Cisco Systems', 'vendor', 'https://jobs.cisco.com', 'yes', false, '{}', ARRAY['CCNA Security','CCNP Security','CISSP'], 'CA', '400+ active', false),
('Trellix', 'vendor', 'https://www.trellix.com/about/careers', 'yes', false, '{}', ARRAY['Security+','CISSP'], 'CA', '80+ active', false),
('Varonis Systems', 'vendor', 'https://www.varonis.com/company/careers', 'yes', false, '{}', ARRAY['Security+','CISSP'], 'NY', '60+ active', false),

-- Consulting (13)
('Deloitte', 'consulting', 'https://jobs2.deloitte.com/us/en', 'hybrid', false, '{}', ARRAY['CISSP','CISM','CEH','Security+'], 'national', '200+ active', false),
('Accenture Federal Services', 'consulting', 'https://www.accenturefederal.com/careers', 'hybrid', true, ARRAY['Public Trust','Secret'], ARRAY['CISSP','CISM','Security+'], 'VA', '150+ active', false),
('IBM Security', 'consulting', 'https://www.ibm.com/employment/us/en', 'yes', false, '{}', ARRAY['CISSP','CEH','Security+'], 'national', '100+ active', false),
('PwC', 'consulting', 'https://www.pwc.com/us/en/careers.html', 'hybrid', false, '{}', ARRAY['CISSP','CISM','CEH'], 'national', '80+ active', false),
('KPMG', 'consulting', 'https://www.kpmg.us/careers.html', 'hybrid', false, '{}', ARRAY['CISSP','CISM'], 'national', '60+ active', false),
('CGI Federal', 'consulting', 'https://www.cgi.com/en/careers', 'hybrid', true, ARRAY['Public Trust','Secret','TS'], ARRAY['Security+','CISSP','CISM'], 'VA', '100+ active', false),
('EY', 'consulting', 'https://careers.ey.com/ey/jobs', 'hybrid', false, '{}', ARRAY['CISSP','CISM','CEH'], 'national', '80+ active', false),
('Coalfire', 'consulting', 'https://www.coalfire.com/careers', 'yes', false, '{}', ARRAY['CISSP','CISM','QSA'], 'national', '50+ active', false),
('Optiv Security', 'consulting', 'https://www.optiv.com/careers', 'hybrid', false, '{}', ARRAY['CISSP','CEH','Security+'], 'national', '60+ active', false),
('Mandiant', 'consulting', 'https://www.mandiant.com/company/jobs', 'yes', false, '{}', ARRAY['GCFE','GCIH','GREM','CISSP'], 'CA', '50+ active', false),
('Guidehouse', 'consulting', 'https://guidehouse.com/careers', 'hybrid', true, ARRAY['Public Trust','Secret'], ARRAY['CISSP','CISM','Security+'], 'VA', '80+ active', false),
('MITRE Corporation', 'consulting', 'https://careers.mitre.org', 'hybrid', true, ARRAY['Public Trust','Secret','TS','TS/SCI'], ARRAY['CISSP','Security+'], 'VA', '50+ active', false),
('Noblis', 'consulting', 'https://noblis.org/careers', 'hybrid', true, ARRAY['Secret','TS','TS/SCI'], ARRAY['Security+','CISSP'], 'VA', '30+ active', false),

-- Staffing (8)
('Apex Systems', 'staffing', 'https://www.apexsystems.com/jobs', 'yes', false, '{}', ARRAY['Security+','CISSP'], 'national', '100+ active', false),
('Zachary Piper Solutions', 'staffing', 'https://zpipersolutions.com/jobs', 'hybrid', true, ARRAY['Secret','TS','TS/SCI'], ARRAY['Security+','CISSP'], 'VA', '30+ active', false),
('A-TEK Inc.', 'staffing', 'https://atekfed.com/careers', 'hybrid', true, ARRAY['Secret','TS'], ARRAY['Security+','CISSP'], 'MD', '20+ active', false),
('Highlight Technologies', 'staffing', 'https://www.highlighttech.com/careers', 'hybrid', true, ARRAY['Secret','TS','TS/SCI'], ARRAY['Security+','CISSP'], 'VA', '20+ active', false),
('ActioNet', 'staffing', 'https://www.actionet.com/careers', 'hybrid', true, ARRAY['Secret','TS'], ARRAY['Security+','CISSP'], 'VA', '15+ active', false),
('Staffmark Government Solutions', 'staffing', 'https://www.staffmark.com/job-seekers/search-jobs', 'hybrid', true, ARRAY['Secret'], ARRAY['Security+'], 'national', '20+ active', false),
('Saalex Solutions', 'staffing', 'https://www.saalex.com/careers', 'hybrid', true, ARRAY['Secret','TS'], ARRAY['Security+'], 'CA', '15+ active', false),
('IntelliSource', 'staffing', 'https://www.intellisource.com/careers', 'hybrid', true, ARRAY['Secret','TS'], ARRAY['Security+'], 'VA', '25+ active', false);
