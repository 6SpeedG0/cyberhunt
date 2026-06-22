export type Company = {
  id: string
  name: string
  category: 'govcon' | 'vendor' | 'consulting' | 'staffing'
  career_url: string
  remote: 'yes' | 'hybrid' | 'no'
  clearance_accepted: boolean
  clearance_levels: string[]
  preferred_certs: string[]
  state: string
  open_roles_note: string | null
  last_checked: string | null
  is_featured: boolean
}
