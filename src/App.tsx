import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Legal from './pages/Legal'
import Privacy from './pages/Privacy'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </>
  )
}
