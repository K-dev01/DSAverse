/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Outfit', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        soft: '0 30px 90px rgba(15, 23, 42, 0.12)',
        glass: '0 30px 80px rgba(255, 92, 168, 0.15)',
      },
      backgroundImage: {
        'glass-gradient': 'radial-gradient(circle at top, rgba(255, 92, 168, 0.18), transparent 32%)',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

