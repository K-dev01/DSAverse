import Button from './Button'

function DownloadCard({ sheet }) {
  const url = new URL(`../assets/pdfs/${sheet.file}`, import.meta.url).href

  return (
    <div className="glass-card rounded-[2.25rem] border border-[var(--card-border)] bg-[var(--surface-soft)] p-8 shadow-soft transition duration-200 ease-soft hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--muted)]">Cheat Sheet</p>
        <h2 className="mt-2 text-2xl font-semibold text-[var(--text)]">{sheet.title}</h2>
      </div>
      <p className="text-sm leading-7 text-[var(--muted)]">{sheet.description}</p>
      <div className="mt-7">
        <Button as="a" href={url} target="_blank" rel="noreferrer">
          Download PDF
        </Button>
      </div>
    </div>
  )
}

export default DownloadCard
