import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import STLCard from '../components/STLCard'
import { stlItems } from '../data/stlItems'

const categories = [
  { id: 'All', label: 'All' },
  { id: 'Sequence', label: 'Sequence Containers' },
  { id: 'Associative', label: 'Associative Containers' },
  { id: 'Adapter', label: 'Container Adaptors' },
  { id: 'Algorithm', label: 'Algorithms' },
  { id: 'Numeric', label: 'Utilities' },
]

function STLLibrary() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filteredItems = useMemo(() => {
    return stlItems.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category
      const searchText = [item.title, item.intro, item.category, item.syntax, item.functions.join(' ')].join(' ').toLowerCase()
      return matchesCategory && searchText.includes(query.toLowerCase())
    })
  }, [category, query])

  const relatedItems = useMemo(() => {
    if (category !== 'All') {
      return stlItems.filter((item) => item.category === category).slice(0, 4)
    }
    return stlItems.slice(0, 4)
  }, [category])

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-[2rem] border bg-[var(--surface)] p-5" style={{ borderColor: 'var(--card-border)' }}>
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">Browse</p>
                <h2 className="mt-3 text-2xl font-semibold text-[var(--text)]">STL categories</h2>
                <nav className="mt-6 space-y-2">
                  {categories.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setCategory(option.id)}
                      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                        category === option.id
                          ? 'bg-[var(--primary-soft)] text-[var(--text)]'
                          : 'bg-[var(--surface-muted)] text-[var(--muted)] hover:bg-[var(--surface)]'
                      }`}
                    >
                      <span>{option.label}</span>
                      {category === option.id ? '•' : null}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="rounded-[2rem] border bg-[var(--surface)] p-5" style={{ borderColor: 'var(--card-border)' }}>
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">Quick filter</p>
                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl bg-[var(--surface-muted)] p-4 text-sm text-[var(--muted)]">Search instantly updates results.</div>
                  <div className="rounded-2xl bg-[var(--surface-muted)] p-4 text-sm text-[var(--muted)]">Category filters keep reference fast.</div>
                </div>
              </div>
            </div>
          </aside>

          <main className="space-y-8">
            <div className="rounded-[2rem] border border-[#E4E7EC] bg-white p-8">
              <p className="text-sm uppercase tracking-[0.35em] text-[#98A2B3]">STL Library</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#1D2939] sm:text-4xl">
                Find the STL building blocks you need for interview-ready code.
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#667085]">
                Compact reference for headers, syntax, complexity, and quick revision notes across sequences, associative containers, adaptors, algorithms, and utilities.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_280px]">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-4 top-4 text-[#98A2B3]" size={18} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search STL components"
                  className="w-full rounded-[1.75rem] border border-[#E4E7EC] bg-white py-4 pl-12 pr-4 text-sm text-[#1D2939] outline-none transition duration-200 focus:border-[#EC4899] focus:ring-4 focus:ring-[rgba(236,72,153,0.12)]"
                />
              </label>

              <div className="hidden md:block">
                <div className="rounded-[1.75rem] border border-[#E4E7EC] bg-white p-4 text-sm text-[#334155]">
                  <p className="font-semibold text-[#1D2939]">Visible items</p>
                  <p className="mt-2 text-sm text-[#667085]">{filteredItems.length} result{filteredItems.length === 1 ? '' : 's'}</p>
                  <p className="mt-2 rounded-2xl bg-[#F8F9FC] p-3 text-sm text-[#334155]">Category: {category}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {filteredItems.length ? (
                filteredItems.map((item) => <STLCard key={item.id} item={item} />)
              ) : (
                <div className="rounded-[2rem] border border-[#E4E7EC] bg-white p-8 text-center text-[#667085]">
                  No matching STL items found. Try a broader search or another category.
                </div>
              )}
            </div>

            <div className="rounded-[2rem] border border-[#E4E7EC] bg-white p-8">
              <p className="text-xs uppercase tracking-[0.35em] text-[#98A2B3]">Related Containers</p>
              <h2 className="mt-3 text-2xl font-semibold text-[#1D2939]">Browse related STL entries</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {relatedItems.map((item) => (
                  <div key={item.id} className="rounded-[1.75rem] border border-[#E4E7EC] bg-[#F8F9FC] p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#98A2B3]">{item.category}</p>
                    <p className="mt-2 text-lg font-semibold text-[#1D2939]">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[#667085]">{item.intro}</p>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  )
}

export default STLLibrary
