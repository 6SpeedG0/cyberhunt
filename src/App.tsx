import { NavLink, Outlet } from 'react-router-dom'

const navLinks = [
  { to: '/directory', label: 'Directory' },
  { to: '/map', label: 'Map' },
  { to: '/matcher', label: 'Matcher' },
  { to: '/featured', label: 'Featured' },
  { to: '/learn', label: 'Learn' },
]

function App() {
  return (
    <div className="min-h-screen">
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-6 h-14">
          <NavLink
            to="/"
            className="shrink-0 text-[#0A9396] font-bold text-lg tracking-tight hover:text-[#94D2BD] transition-colors"
          >
            CyberHunt
          </NavLink>
          <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#0A9396] border-b-2 border-[#0A9396] pb-0.5'
                      : 'text-gray-400 hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
