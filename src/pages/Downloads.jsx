import { Link } from 'react-router-dom'
import { BookOpen, Layers, Sparkles, FileText } from 'lucide-react'
import Button from '../components/Button'

const resourceCards = [
  {
    title: 'STL Library',
    description: 'Quick STL reference with syntax, complexity, and examples.',
    to: '/stl-library',
    icon: BookOpen,
  },
  {
    title: 'Pattern Library',
    description: 'Interview-focused DSA patterns with recognition tips and templates.',
    to: '/patterns',
    icon: Layers,
  },
  {
    title: 'Interview Tricks',
    description: 'Common mistakes, optimizations, and revision notes.',
    to: '/interview-tricks',
    icon: Sparkles,
  },
  {
    title: 'Templates',
    description: 'Ready-to-use C++ templates for frequently used algorithms.',
    to: '/templates',
    icon: FileText,
  },
]

function Downloads() {
  return (
    <section className="space-y-16 py-16 text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-5xl space-y-6 px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border bg-[var(--surface)] p-10 shadow-soft" style={{ borderColor: 'var(--card-border)' }}>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--primary)]">Downloads</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl">
            Printable Interview Handbooks
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg">
            All learning resources are currently available through the website.
            The downloadable PDF collection is being written separately to ensure every handbook is concise, accurate,
            and genuinely useful for interview preparation.
          </p>
        </div>

        <div className="mx-auto max-w-3xl rounded-[2rem] border bg-[var(--surface-soft)] p-10 shadow-soft" style={{ borderColor: 'var(--card-border)' }}>
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold text-[var(--primary)]" style={{ background: 'var(--primary-soft)', borderColor: 'var(--card-border)' }}>
              🚧 Printable Handbooks Coming Soon
            </div>

            <div className="space-y-4">
              <p className="text-lg font-semibold text-[var(--text)]">Every handbook is being written from scratch.</p>
              <p className="text-base leading-8 text-[var(--muted)]">
                The website already provides complete online notes, templates, pattern guides, interview tricks, and revision resources.
                Instead of automatically exporting those pages as PDFs, every printable handbook is being written from scratch to create a better interview revision experience.
                The downloadable collection will be published only when it reaches the quality standard of DSA Verse.
              </p>
            </div>

            <div className="pt-2">
              <Button as={Link} to="/patterns" className="rounded-full px-6 py-3 text-base">
                📖 Browse Online Notes
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--secondary)]">What can you access today?</p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--text)]">The online library is ready for review.</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {resourceCards.map((card) => {
              const Icon = card.icon
              return (
                <Link
                  key={card.title}
                  to={card.to}
                  className="group rounded-[1.75rem] border bg-[var(--surface)] p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  style={{ borderColor: 'var(--card-border)' }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-[var(--text)]">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{card.description}</p>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="rounded-[2rem] border bg-[var(--surface)] p-10 shadow-soft" style={{ borderColor: 'var(--card-border)' }}>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">Why no PDFs yet?</p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--text)]">Quality matters more than speed.</h2>
          <p className="mt-5 rounded-[1.5rem] border bg-[var(--surface)] p-6 text-base leading-8 text-[var(--muted)]" style={{ borderColor: 'var(--card-border)' }}>
            I believe interview notes should be something developers can genuinely rely on.
            Rather than publishing incomplete or automatically generated PDFs, every handbook is being written manually
            with a focus on clarity, correctness, and long-term usefulness.
            Thank you for your patience and support.
          </p>
        </div>

        <div className="rounded-[2rem] border bg-[var(--surface-soft)] p-8 text-center text-[var(--muted)] shadow-soft" style={{ borderColor: 'var(--card-border)' }}>
          <p className="text-2xl">🌸</p>
          <p className="mt-4 text-base leading-7">
            Quality over quantity.
            The online notes are available today.
            The printable handbook collection will be released when it's truly ready.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Downloads
