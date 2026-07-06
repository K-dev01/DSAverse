import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import AccordionCard from '../components/AccordionCard'
import { interviewTricks } from '../data/interviewTricks'

function InterviewTricks() {
  const [query, setQuery] = useState('')

  const filteredTricks = useMemo(() => {
    if (!query.trim()) return interviewTricks
    const lowered = query.toLowerCase()
    return interviewTricks.filter((item) =>
      [item.title, item.explanation, item.wrongExample, item.correctExample, item.notes]
        .join(' ')
        .toLowerCase()
        .includes(lowered)
    )
  }, [query])

  return (
    <section className="space-y-10 py-14 text-slate-900 dark:text-slate-100">
      <div className="rounded-[2rem] border border-slate-200/90 bg-white/85 p-12 shadow-xl shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/80">
        <h1 className="text-3xl font-semibold tracking-tight">Interview Tricks</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
          Practice fast, safe, and polished coding habits with focused interview tricks and common pitfalls.
        </p>

        <div className="mt-10 max-w-2xl">
          <label htmlFor="tricks-search" className="sr-only">
            Search interview tricks
          </label>
          <div className="flex items-center gap-3 rounded-[1.75rem] border border-slate-300/80 bg-slate-50 px-4 py-3 shadow-sm shadow-slate-900/5 dark:border-slate-700/80 dark:bg-slate-900/70">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              id="tricks-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search fast IO, overflow, lambda, sorting, debugging..."
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredTricks.length > 0 ? (
          filteredTricks.map((item) => <AccordionCard key={item.id} item={item} />)
        ) : (
          <div className="rounded-[2rem] border border-dashed border-slate-300/80 bg-[var(--surface-soft)] p-10 text-center text-slate-600 dark:border-slate-700/80 dark:bg-slate-950/70 dark:text-slate-300">
            No tricks match that search term. Try a broader keyword like "lambda" or "modulo".
          </div>
        )}
      </div>
    </section>
  )
}

export default InterviewTricks
