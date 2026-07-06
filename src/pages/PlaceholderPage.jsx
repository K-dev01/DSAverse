function PlaceholderPage({ title, description }) {
  return (
    <section className="space-y-4 py-14 text-[var(--text)]">
      <div className="glass-card rounded-[2.25rem] border border-[var(--card-border)] bg-[var(--surface-soft)] p-12 shadow-soft transition duration-200 ease-soft hover:-translate-y-0.5 hover:shadow-md">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--muted)]">{description}</p>
      </div>
    </section>
  )
}

export default PlaceholderPage
