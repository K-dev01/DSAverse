import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

function AccordionCard({ item }) {
  const [open, setOpen] = useState(false)

  return (
    <article className="rounded-[2.25rem] border border-[var(--card-border)] bg-[var(--surface-soft)] shadow-soft transition duration-200 ease-soft hover:-translate-y-0.5 hover:shadow-md">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 rounded-[2.25rem] bg-[var(--surface)] px-6 py-5 text-left"
        onClick={() => setOpen((current) => !current)}
      >
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--muted)]">Interview Trick</p>
          <h2 className="mt-2 text-xl font-semibold text-[var(--text)]">{item.title}</h2>
        </div>
        <ChevronDown
          className={`h-6 w-6 text-[var(--primary)] transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[1000px] p-6' : 'max-h-0 px-6'}`}>
        <div className="space-y-5 border-t pt-6" style={{ borderColor: 'var(--card-border)' }}>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--secondary)]">Explanation</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.explanation}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--secondary)]">Wrong Example</h3>
            <pre className="mt-3 overflow-x-auto rounded-[1.5rem] bg-[var(--surface)] p-4 text-sm leading-6 text-[var(--text)] ring-1" style={{ borderColor: 'var(--code-border)' }}>
              {item.wrongExample}
            </pre>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--secondary)]">Correct Example</h3>
            <pre className="mt-3 overflow-x-auto rounded-[1.5rem] bg-[var(--surface)] p-4 text-sm leading-6 text-[var(--text)] ring-1" style={{ borderColor: 'var(--code-border)' }}>
              {item.correctExample}
            </pre>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--secondary)]">Interview Notes</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.notes}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default AccordionCard
