import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './hooks/useTheme'
import ScrollToTop from './components/ScrollToTop'
import PageLayout from './layouts/PageLayout'
import Home from './pages/Home'
import STLLibrary from './pages/STLLibrary'
import Patterns from './pages/Patterns'
import Templates from './pages/Templates'
import CheatSheets from './pages/CheatSheets'
import InterviewTricks from './pages/InterviewTricks'
import Downloads from './pages/Downloads'
import About from './pages/About'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <PageLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stl-library" element={<STLLibrary />} />
            <Route path="/patterns" element={<Patterns />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/cheat-sheets" element={<CheatSheets />} />
            <Route path="/interview-tricks" element={<InterviewTricks />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </PageLayout>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
