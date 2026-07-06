import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from '../components/Container'

function PageLayout({ children }) {
  return (
    <div className="page-shell min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <Navbar />
      <main className="pb-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default PageLayout
