import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { templates } from '../data/templates'
import TemplateCard from '../components/TemplateCard'

function Templates() {
  const [query, setQuery] = useState('')

  const filteredTemplates = useMemo(() => {
    if (!query.trim()) return templates
    const lowered = query.toLowerCase()
    return templates.filter(
      (template) =>
        template.title.toLowerCase().includes(lowered) ||
        template.description.toLowerCase().includes(lowered) ||
        template.explanation.toLowerCase().includes(lowered)
    )
  }, [query])

  return (
    <section className="space-y-10 py-14 text-slate-900 dark:text-slate-100">
      <div className="rounded-[2rem] border border-slate-200/90 bg-white/85 p-12 shadow-xl shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/80">
        <h1 className="text-3xl font-semibold tracking-tight">Templates</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
          Clean revision templates for organized note-taking, fast concept review, and coding-ready syntax references.
        </p>

        <div className="mt-10 max-w-2xl">
          <label htmlFor="template-search" className="sr-only">
            Search templates
          </label>
          <div className="flex items-center gap-3 rounded-[1.75rem] border border-slate-300/80 bg-slate-50 px-4 py-3 shadow-sm shadow-slate-900/5 dark:border-slate-700/80 dark:bg-slate-900/70">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              id="template-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search templates by name or concept"
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        {filteredTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </section>
  )
}

export default Templates
