import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, Moon, SunMedium } from 'lucide-react'
import { navLinks } from '../data/navLinks'
import Button from './Button'
import { useTheme } from '../hooks/useTheme'

function Navbar() {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b bg-[var(--surface)]/90 transition duration-300" style={{ borderColor: 'var(--card-border)' }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 sm:px-8">
        <Link to="/" className="text-lg font-semibold tracking-tight text-[var(--text)]">
          DSA Verse
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? 'text-[var(--text)]'
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[var(--surface)] text-[var(--text)] shadow-sm border"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            style={{ borderColor: 'var(--card-border)' }}
          >
            {theme === 'dark' ? <SunMedium size={16} /> : <Moon size={16} />}
          </button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[var(--surface)] text-[var(--text)] shadow-sm border md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Open navigation menu"
            style={{ borderColor: 'var(--card-border)' }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t px-6 py-5 md:hidden" style={{ borderColor: 'var(--card-border)', background: 'var(--surface)' }}>
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-3xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-slate-100 text-slate-950 dark:bg-slate-900 dark:text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button variant="secondary" onClick={toggleTheme} className="w-full justify-center">
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default Navbar
