function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-6 py-8 sm:px-8 ${className}`}>{children}</div>
  )
}

export default Container
