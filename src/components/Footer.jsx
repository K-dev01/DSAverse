import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { navLinks } from '../data/navLinks'

function Footer() {
  return (
    <footer className="border-t px-4 py-8 text-[var(--muted)] sm:px-6 sm:py-10 md:px-8" style={{ borderColor: 'var(--card-border)', background: 'var(--surface)' }}>
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            DSA Verse
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            A premium revision hub for data structures and algorithms, designed for clarity,
            speed, and long-term retention.
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--secondary)]">
            ❤️🎀 LOVE FOR DSA by Keerthi
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="grid gap-2 text-sm text-slate-600 dark:text-slate-400 sm:grid-cols-2">
            {navLinks.slice(0, 4).map((link) => (
              <Link key={link.to} to={link.to} className="transition hover:text-slate-950 dark:hover:text-white">
                {link.label}
              </Link>
            ))}
            {navLinks.slice(4).map((link) => (
              <Link key={link.to} to={link.to} className="transition hover:text-slate-950 dark:hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:brightness-95"
            style={{ boxShadow: 'var(--shadow)' }}
          >
            <ArrowUp size={16} />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
