function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="group rounded-[2rem] border border-[var(--card-border)] bg-[var(--surface-soft)] p-6 shadow-soft transition duration-200 ease-soft hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[var(--primary-soft)] text-[var(--primary)] shadow-sm transition duration-200 group-hover:scale-105">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-semibold text-[var(--text)]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{description}</p>
    </div>
  )
}

export default FeatureCard
