import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import PatternCard from '../components/PatternCard'
import { patterns } from '../data/patterns'

function Patterns() {
  const [query, setQuery] = useState('')

  const filteredPatterns = useMemo(() => {
    return patterns.filter((pattern) => {
      const searchText = [pattern.title, pattern.definition, pattern.keywords.join(' '), pattern.whenToUse].join(' ').toLowerCase()
      return searchText.includes(query.toLowerCase())
    })
  }, [query])

  return (
    <section className="space-y-10 py-14">
      <div className="glass-card rounded-[2.5rem] border border-[var(--card-border)] bg-[var(--surface-soft)] p-10 shadow-soft backdrop-blur-[20px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--secondary)]">Pattern Library</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl">
              Find the right problem-solving pattern for every challenge.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted)]">
              Search patterns by concept, recognize keywords quickly, and review reusable templates for interview problems.
            </p>
          </div>
          <label className="relative block w-full max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-4 text-[var(--muted)]" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search patterns"
              className="w-full rounded-[1.5rem] border border-[var(--card-border)] bg-[var(--surface)] py-4 pl-12 pr-4 text-sm text-[var(--text)] outline-none transition duration-300 focus:border-[var(--primary)]"
            />
          </label>
        </div>
      </div>

      <div className="space-y-8">
        {filteredPatterns.length ? (
          filteredPatterns.map((pattern) => <PatternCard key={pattern.id} pattern={pattern} />)
        ) : (
          <div className="rounded-[2rem] border border-[var(--card-border)] bg-[var(--surface-soft)] p-10 text-center text-[var(--muted)] shadow-soft">
            No patterns matched your search. Try another keyword or review the pattern names.
          </div>
        )}
      </div>
    </section>
  )
}

export default Patterns
