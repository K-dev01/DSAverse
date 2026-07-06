import Button from './Button'

function DownloadAssetCard({ asset }) {
  const url = new URL(`../assets/pdfs/${asset.file}`, import.meta.url).href

  return (
    <div className="glass-card rounded-[2.25rem] border border-[var(--card-border)] bg-[var(--surface-soft)] p-8 shadow-soft transition duration-200 ease-soft hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">Download</p>
          <h3 className="mt-3 text-2xl font-semibold text-[var(--text)]">{asset.title}</h3>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{asset.description}</p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary-soft)] text-[var(--primary)]">
          📄
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 border-t pt-6" style={{ borderColor: 'var(--card-border)' }}>
        <span className="text-sm text-[var(--muted)]">Category: {asset.category}</span>
        <Button as="a" href={url} target="_blank" rel="noreferrer">
          Download
        </Button>
      </div>
    </div>
  )
}

export default DownloadAssetCard
