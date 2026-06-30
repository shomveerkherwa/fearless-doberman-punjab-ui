import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import DogProfilePage from './pages/DogProfilePage'
import AboutPage from './pages/AboutPage'
import GalleryPage from './pages/GalleryPage'
import EnquirePage from './pages/EnquirePage'

function DogsPage() {
  return <main className="min-h-screen flex items-center justify-center">
    <p className="text-brand-muted text-sm tracking-widest uppercase">Dogs — coming soon</p>
  </main>
}

function NotFound() {
  return <main className="min-h-screen flex items-center justify-center">
    <p className="text-brand-muted text-sm tracking-widest uppercase">Page not found</p>
  </main>
}

// ── App — root component ──────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col">

        <Header />

        <Routes>
          <Route path="/"        element={<HomePage />}  />
          <Route path="/dogs"           element={<DogsPage />}       />
          <Route path="/dogs/:slug"    element={<DogProfilePage />} />
          <Route path="/about"   element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/enquire" element={<EnquirePage />} />
          <Route path="*"        element={<NotFound />}  />
        </Routes>

        <Footer />

      </div>
    </BrowserRouter>
  )
}
