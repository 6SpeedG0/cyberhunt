import { NavLink, Outlet } from 'react-router-dom'

const navLinks = [
  { to: '/directory', label: 'Directory' },
  { to: '/map', label: 'Map' },
  { to: '/matcher', label: 'Matcher' },
]

function App() {
  return (
    <div className="min-h-screen">
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-8 h-14">
          <NavLink
            to="/"
            className="text-purple-400 font-bold text-lg tracking-tight hover:text-purple-300 transition-colors"
          >
            CyberHunt
          </NavLink>
          <div className="flex gap-6">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-purple-400 border-b-2 border-purple-400 pb-0.5'
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
