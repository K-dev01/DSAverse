import { useMemo, useState } from 'react'
import { ChevronDown, ChevronUp, Layers, Sparkles, Terminal, AlertTriangle, CircleDot, Hash } from 'lucide-react'
import { patterns as allPatterns } from '../data/patterns'

const sectionOrder = [
  { key: 'keywords', label: 'Keywords' },
  { key: 'complexities', label: 'Complexity' },
  { key: 'whenToUse', label: 'When to Use' },
  { key: 'template', label: 'Template' },
  { key: 'mistakes', label: 'Mistakes' },
  { key: 'tips', label: 'Tips' },
  { key: 'related', label: 'Related' },
]

function splitBullets(text) {
  return text
    .split(/\.\s+|;\s+/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function getRelatedPatterns(pattern) {
  return allPatterns
    .filter((item) => item.id !== pattern.id)
    .map((item) => ({
      ...item,
      score: item.keywords.filter((keyword) => pattern.keywords.includes(keyword)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

function PatternIllustration({ id }) {
  const baseStyle = 'stroke-[var(--primary)] stroke-2 fill-none'
  switch (id) {
    case 'arrays':
      return (
        <svg viewBox="0 0 120 60" className="h-full w-full">
          <rect x="6" y="18" width="108" height="24" rx="8" className="stroke-[var(--primary)] fill-[var(--primary-soft)]" />
          {[14, 38, 62, 86].map((x) => (
            <line key={x} x1={x} y1="18" x2={x} y2="42" className={baseStyle} />
          ))}
        </svg>
      )
    case 'sliding-window':
      return (
        <svg viewBox="0 0 120 60" className="h-full w-full">
          <rect x="8" y="26" width="104" height="10" rx="5" className="stroke-[var(--muted)] fill-[var(--code-border)]" />
          <rect x="24" y="18" width="56" height="24" rx="8" className="stroke-[var(--primary)] fill-[var(--primary-soft)]" />
          <path d="M22 30 L18 30 M22 30 L24 26 M22 30 L24 34" className={baseStyle} />
          <path d="M84 30 L88 30 M84 30 L82 26 M84 30 L82 34" className={baseStyle} />
        </svg>
      )
    case 'two-pointer':
      return (
        <svg viewBox="0 0 120 60" className="h-full w-full">
          <line x1="16" y1="18" x2="104" y2="18" className={baseStyle} />
          <line x1="16" y1="42" x2="104" y2="42" className={baseStyle} />
          <circle cx="28" cy="30" r="8" className="fill-[var(--primary-soft)] stroke-[var(--primary)]" />
          <circle cx="92" cy="30" r="8" className="fill-[var(--primary-soft)] stroke-[var(--primary)]" />
          <polyline points="40,22 54,30 40,38" className={baseStyle} />
          <polyline points="80,22 66,30 80,38" className={baseStyle} />
        </svg>
      )
    case 'binary-search':
      return (
        <svg viewBox="0 0 120 60" className="h-full w-full">
          <line x1="12" y1="30" x2="108" y2="30" className={baseStyle} />
          <line x1="60" y1="18" x2="60" y2="42" className={baseStyle} />
          <circle cx="32" cy="30" r="5" className="fill-[var(--primary-soft)] stroke-[var(--primary)]" />
          <circle cx="60" cy="30" r="5" className="fill-[var(--primary-soft)] stroke-[var(--primary)]" />
          <circle cx="88" cy="30" r="5" className="fill-[var(--primary-soft)] stroke-[var(--primary)]" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 120 60" className="h-full w-full">
          <rect x="14" y="16" width="28" height="28" rx="7" className="stroke-[var(--primary)] fill-[var(--primary-soft)]" />
          <rect x="44" y="12" width="28" height="36" rx="7" className="stroke-[var(--primary)] fill-[var(--primary-soft)]" />
          <rect x="74" y="20" width="28" height="20" rx="7" className="stroke-[var(--primary)] fill-[var(--primary-soft)]" />
        </svg>
      )
  }
}

function Accordion({ id, title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-[var(--surface)]" style={{ borderColor: 'var(--card-border)', borderStyle: 'solid' }}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--primary-soft)]"
        id={id}
      >
        <span>{title}</span>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary-soft)] text-[var(--primary)]">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>
      {open && <div className="border-t px-6 py-5" style={{ borderColor: 'var(--card-border)' }}>{children}</div>}
    </div>
  )
}

function PatternCard({ pattern }) {
  const relatedPatterns = useMemo(() => getRelatedPatterns(pattern), [pattern])
  const definitionPoints = useMemo(() => splitBullets(pattern.definition), [pattern.definition])
  const whenPoints = useMemo(() => splitBullets(pattern.whenToUse), [pattern.whenToUse])
  const mistakePoints = useMemo(() => splitBullets(pattern.mistakes), [pattern.mistakes])
  const tipPoints = useMemo(() => splitBullets(pattern.tips), [pattern.tips])
  const complexityBadges = useMemo(() => pattern.complexities.split(/,\s*/), [pattern.complexities])

  return (
    <article className="glass-card rounded-[2.25rem] border border-[var(--card-border)] bg-[var(--surface-soft)] p-8 shadow-soft transition duration-200 ease-soft hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--muted)]">Pattern</p>
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--text)]">{pattern.title}</h2>
        </div>
        <span className="rounded-full bg-[var(--primary-soft)] px-4 py-2 text-sm font-semibold text-[var(--primary)] shadow-sm">
          {pattern.id.replace('-', ' ').toUpperCase()}
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.75rem] border bg-[var(--surface)] p-6" style={{ borderColor: 'var(--card-border)' }}>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--secondary)]">Definition</h3>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--muted)]">
            {definitionPoints.map((point, index) => (
              <li key={index} className="flex gap-3">
                <CircleDot className="mt-1 h-3 w-3 text-[var(--primary)]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[1.75rem] border bg-[var(--surface)] p-6" style={{ borderColor: 'var(--card-border)' }}>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Recognition Keywords</h3>
            <span className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">Quick scan</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {pattern.keywords.map((keyword) => (
              <span key={keyword} className="rounded-full px-3 py-1 text-xs font-semibold text-[var(--text)] border" style={{ background: 'var(--primary-soft)', borderColor: 'var(--card-border)' }}>
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.75rem] border bg-[var(--surface)] p-6" id={`whenToUse-${pattern.id}`} style={{ borderColor: 'var(--card-border)' }}>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">When to Use</h3>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--muted)]">
            {whenPoints.map((point, index) => (
              <li key={index} className="flex gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--primary)]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[1.75rem] border bg-[var(--surface)] p-6" id={`complexities-${pattern.id}`} style={{ borderColor: 'var(--card-border)' }}>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Complexity</h3>
            <span className="rounded-full bg-[var(--primary-soft)] px-3 py-1 text-xs uppercase tracking-[0.35em] text-[var(--primary)]">
              Review
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {complexityBadges.map((item) => (
              <span key={item} className="rounded-full px-3 py-1 text-xs font-semibold text-[var(--text)] bg-[var(--surface-muted)]" style={{ border: '1px solid var(--card-border)' }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[1.75rem] border bg-[var(--surface)] p-6" style={{ borderColor: 'var(--card-border)' }}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Visualization</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">A focused visual summary for quick recall.</p>
          </div>
          <Layers className="h-5 w-5 text-[var(--primary)]" />
        </div>
        <div className="mt-5 flex h-32 items-center justify-center rounded-[1.5rem] bg-[var(--primary-soft)] p-4">
          <PatternIllustration id={pattern.id} />
        </div>
        <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{pattern.visualization}</p>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.35em] text-[var(--secondary)]">
          <a href={`#keywords-${pattern.id}`} className="rounded-full border px-3 py-2 transition" style={{ background: 'var(--primary-soft)', borderColor: 'var(--card-border)' }}>
            Keywords
          </a>
          <a href={`#complexities-${pattern.id}`} className="rounded-full border px-3 py-2 transition" style={{ background: 'var(--primary-soft)', borderColor: 'var(--card-border)' }}>
            Complexity
          </a>
          <a href={`#whenToUse-${pattern.id}`} className="rounded-full border px-3 py-2 transition" style={{ background: 'var(--primary-soft)', borderColor: 'var(--card-border)' }}>
            When to Use
          </a>
        </div>

        <Accordion id={`template-${pattern.id}`} title="Generic Template" defaultOpen={false}>
          <pre className="overflow-x-auto rounded-[1.5rem] bg-[var(--surface)] p-4 text-sm leading-6 text-[var(--text)] ring-1" style={{ borderColor: 'var(--code-border)' }}>
            {pattern.template}
          </pre>
        </Accordion>

        <Accordion id={`mistakes-${pattern.id}`} title="Common Mistakes" defaultOpen={false}>
          <ul className="space-y-3 text-sm leading-7 text-[var(--muted)]">
            {mistakePoints.map((point, index) => (
              <li key={index} className="flex gap-3">
                <AlertTriangle className="mt-1 h-4 w-4 text-[var(--primary)]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Accordion>

        <Accordion id={`tips-${pattern.id}`} title="Interview Tips" defaultOpen={false}>
          <ul className="space-y-3 text-sm leading-7 text-[var(--muted)]">
            {tipPoints.map((point, index) => (
              <li key={index} className="flex gap-3">
                <Sparkles className="mt-1 h-4 w-4 text-[var(--primary)]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Accordion>

        <Accordion id={`related-${pattern.id}`} title="Related Patterns" defaultOpen={false}>
          {relatedPatterns.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedPatterns.map((item) => (
                <div key={item.id} className="rounded-2xl border p-4 text-sm text-[var(--text)]" style={{ background: 'var(--surface)', borderColor: 'var(--card-border)', boxShadow: '0 12px 30px rgba(15,23,42,0.04)' }}>
                  <p className="font-semibold">{item.title}</p>
                  <p className="mt-2 text-[var(--muted)]">{item.definition}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-7 text-[var(--muted)]">No related patterns are defined for this entry.</p>
          )}
        </Accordion>
      </div>
    </article>
  )
}

export default PatternCard
