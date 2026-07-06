function Card({ title, description, footer, className = '', children }) {
  return (
    <div className={`group glass-card rounded-[2.25rem] border border-[var(--card-border)] bg-[var(--surface-soft)] p-8 shadow-soft transition duration-200 ease-soft hover:-translate-y-0.5 hover:shadow-md ${className}`}>
      {title ? <h3 className="text-xl font-semibold text-[var(--text)]">{title}</h3> : null}
      {description ? <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{description}</p> : null}
      {children}
      {footer ? <div className="mt-6 text-sm text-[var(--muted)]">{footer}</div> : null}
    </div>
  )
}

export default Card
