function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 ${className}`}>{children}</div>
  )
}

export default Container
