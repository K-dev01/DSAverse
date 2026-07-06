import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, BookOpen, Layers, ClipboardList, FileText, Sparkles, ShieldCheck, Clock3 } from 'lucide-react'
import Button from '../components/Button'

const quickLinks = [
  { title: 'STL Library', to: '/stl-library', description: 'Browse standard container and algorithm notes.', icon: BookOpen },
  { title: 'Pattern Library', to: '/patterns', description: 'Review common problem-solving templates.', icon: Layers },
  { title: 'Templates', to: '/templates', description: 'Open ready-to-use code templates.', icon: ClipboardList },
  { title: 'Cheat Sheets', to: '/cheat-sheets', description: 'Download concise revision sheets.', icon: FileText },
  { title: 'Interview Tricks', to: '/interview-tricks', description: 'See smart patterns and common pitfalls.', icon: Sparkles },
  { title: 'Complexity Guide', to: '/downloads', description: 'Compare runtime and memory tradeoffs.', icon: ShieldCheck },
]

const popularResources = [
  {
    title: 'STL Quick Reference',
    description: 'Fast access to container behaviors, complexity, and common usage patterns.',
  },
  {
    title: 'Pattern Library',
    description: 'Clear descriptions for common problem-solving techniques and when to apply them.',
  },
  {
    title: 'Interview Notes',
    description: 'Practical reminders that help you stay concise and confident during coding interviews.',
  },
]

const continueItems = [
  'Review STL containers',
  'Practice pattern problems',
  'Read interview tricks',
]

function Home() {
  const [search, setSearch] = useState('')

  return (
    <section className="space-y-16 py-16 text-slate-900 dark:text-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="rounded-[2rem] border bg-[var(--surface)] p-10 shadow-soft"
        style={{ borderColor: 'var(--card-border)' }}
      >
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--primary)]">Developer DSA reference</p>
            <h1 className="text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl">
              A cleaner, faster way to review data structures and algorithms.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
              Bookmark the essential notes, templates, and interview guides you need for real developer prep.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <label className="relative block w-full">
              <span className="sr-only">Search documentation</span>
              <div className="flex items-center gap-3 rounded-[1.5rem] border bg-[var(--surface-soft)] px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition focus-within:border-[var(--primary)]" style={{ borderColor: 'var(--card-border)' }}>
                <Search className="h-5 w-5 text-[var(--primary)]" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search STL, patterns, templates..."
                  className="w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
                />
              </div>
            </label>
            <div className="flex flex-wrap gap-3">
              <Button as={Link} to="/stl-library" className="rounded-3xl px-5 py-3 text-sm">
                Browse library
              </Button>
              <Button as={Link} to="/downloads" variant="secondary" className="rounded-3xl px-5 py-3 text-sm">
                Download sheets
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.06, ease: 'easeOut' }}
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {quickLinks.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.title}
              to={item.to}
              className="group rounded-[1.75rem] border bg-[var(--surface)] p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
              style={{ borderColor: 'var(--card-border)' }}
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)] shadow-sm">
                <Icon size={20} />
              </div>
              <h2 className="mt-5 text-lg font-semibold text-[var(--text)]">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
            </Link>
          )
        })}
      </motion.section>

      <section className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">Continue Revising</p>
          <h2 className="mt-3 text-2xl font-semibold text-[var(--text)]">Your current study plan.</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {continueItems.map((title) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="rounded-[1.75rem] border bg-[var(--surface)] p-6 shadow-soft"
              style={{ borderColor: 'var(--card-border)' }}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-base font-semibold text-[var(--text)]">{title}</p>
                <span className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.3em] text-[var(--primary)]" style={{ background: 'var(--primary-soft)' }}>
                  In progress
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">A lightweight placeholder keeping your next revision steps visible.</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">Popular Resources</p>
          <h2 className="mt-3 text-2xl font-semibold text-[var(--text)]">Trusted guides for quick reference.</h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {popularResources.map((resource) => (
            <motion.div
              key={resource.title}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="rounded-[1.75rem] border bg-[var(--surface)] p-6 shadow-soft"
              style={{ borderColor: 'var(--card-border)' }}
            >
              <div className="flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]">
                  <FileText size={18} />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">Resource</p>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[var(--text)]">{resource.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{resource.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border bg-[var(--surface)] p-10 shadow-soft" style={{ borderColor: 'var(--card-border)' }}>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-[var(--primary)]" style={{ background: 'var(--primary-soft)', borderColor: 'var(--card-border)' }}>
              <Clock3 size={18} />
              30-minute revision
            </div>
            <h2 className="text-3xl font-semibold text-[var(--text)]">Focused interview prep in one session.</h2>
            <p className="max-w-xl text-sm leading-7 text-[var(--muted)]">
              Pick one topic, review the essentials, and reinforce it with a short coding drill. Ideal for high-impact revision before a session.
            </p>
          </div>
          <div className="space-y-4">
            {[
              'Start with a ready-made STL or pattern note.',
              'Skim the key examples and common pitfalls.',
              'Finish with a quick interview trick checklist.',
            ].map((step) => (
                <motion.div
                key={step}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="rounded-[1.75rem] border bg-[var(--surface-soft)] p-5"
                style={{ borderColor: 'var(--card-border)' }}
              >
                <div className="flex items-center gap-3 text-sm font-semibold text-[var(--text)]">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]">•</span>
                  {step}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </section>
  )
}

export default Home
