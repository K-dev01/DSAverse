import { ClipboardCopy } from 'lucide-react'
import { useState } from 'react'
import Button from './Button'

function TemplateCard({ template }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(template.syntax)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch (error) {
      console.error('copy failed', error)
    }
  }

  return (
    <div className="glass-card rounded-[2.25rem] border border-[var(--card-border)] bg-[var(--surface-soft)] p-8 shadow-soft transition duration-200 ease-soft hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--muted)]">Template</p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--text)]">{template.title}</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{template.description}</p>
        </div>
        <Button variant="secondary" className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm" onClick={handleCopy}>
          <ClipboardCopy size={16} />
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>

      <div className="mt-6 rounded-[1.8rem] bg-[var(--surface)] p-5">
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Syntax</p>
          <span className="rounded-full bg-[var(--primary-soft)] px-3 py-1 text-[var(--primary)] text-xs font-semibold">C++</span>
        </div>
        <pre className="overflow-x-auto whitespace-pre rounded-[1.5rem] bg-[var(--surface)] p-5 text-sm leading-6 text-[var(--text)] ring-1" style={{ borderColor: 'var(--code-border)' }}>
          {template.syntax}
        </pre>
      </div>

      <div className="mt-6 rounded-[1.8rem] bg-[var(--surface)] p-5">
        <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--secondary)]">Explanation</h3>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{template.explanation}</p>
      </div>
    </div>
  )
}

export default TemplateCard
