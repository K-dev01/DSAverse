import { forwardRef } from 'react'

const Button = forwardRef(
  ({ as: Component = 'button', children, variant = 'primary', className = '', ...props }, ref) => {
    const variantStyles =
      variant === 'secondary'
        ? 'bg-[var(--primary-soft)] text-[var(--text)] ring-1 ring-[var(--card-border)] hover:bg-[var(--surface)] dark:bg-[var(--primary-soft)]'
        : 'bg-[var(--primary)] text-white shadow-[0_10px_24px_rgba(185,28,109,0.12)] hover:brightness-95'

    return (
      <Component
        ref={ref}
        className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300 ease-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${variantStyles} ${className}`}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

export default Button
