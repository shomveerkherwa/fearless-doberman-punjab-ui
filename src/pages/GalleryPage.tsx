import { useState, useEffect, useCallback } from 'react'
import { siteConfig } from '../config/site'

// ── All images in public/images/gallery ──────────────────────────────────────
// Add or remove filenames here as you drop photos in / take them out
const galleryImages = [
  'Screenshot 2026-06-29 at 21.35.58.png',
  'Screenshot 2026-06-29 at 21.36.31.png',
  'Screenshot 2026-06-29 at 21.37.14.png',
  'Screenshot 2026-06-29 at 21.37.27.png',
  'Screenshot 2026-06-29 at 21.37.43.png',
  'Screenshot 2026-06-29 at 21.37.56.png',
  'Screenshot 2026-06-29 at 21.38.04.png',
  'Screenshot 2026-06-29 at 21.38.44.png',
]

function imgSrc(filename: string) {
  return `/images/gallery/${encodeURIComponent(filename)}`
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
interface LightboxProps {
  images  : string[]
  index   : number
  onClose : () => void
  onPrev  : () => void
  onNext  : () => void
}

function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape')      onClose()
      if (e.key === 'ArrowLeft')   onPrev()
      if (e.key === 'ArrowRight')  onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-brand-faint hover:text-brand-text transition-colors text-[11px] tracking-widest uppercase font-sans"
        aria-label="Close"
      >
        Close ✕
      </button>

      {/* Counter */}
      <span className="absolute top-5 left-6 text-[10px] tracking-widest uppercase text-brand-faint font-sans">
        {index + 1} / {images.length}
      </span>

      {/* Prev */}
      {index > 0 && (
        <button
          onClick={e => { e.stopPropagation(); onPrev() }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-brand-faint hover:text-brand-text transition-colors"
          aria-label="Previous"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Image */}
      <img
        src={imgSrc(images[index])}
        alt={`Gallery image ${index + 1}`}
        className="max-h-[88vh] max-w-[88vw] object-contain"
        onClick={e => e.stopPropagation()}
        style={{ boxShadow: '0 0 80px rgba(0,0,0,0.8)' }}
      />

      {/* Next */}
      {index < images.length - 1 && (
        <button
          onClick={e => { e.stopPropagation(); onNext() }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-brand-faint hover:text-brand-text transition-colors"
          aria-label="Next"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const open  = (i: number) => setLightboxIndex(i)
  const close = useCallback(() => setLightboxIndex(null), [])
  const prev  = useCallback(() => setLightboxIndex(i => (i !== null && i > 0 ? i - 1 : i)), [])
  const next  = useCallback(() => setLightboxIndex(i => (i !== null && i < galleryImages.length - 1 ? i + 1 : i)), [])

  return (
    <main className="min-h-screen bg-brand-bg">

      {/* ── Page header ─────────────────────────────────────────────────────── */}
      <div className="border-b border-brand-border px-6 sm:px-10 lg:px-16 py-14 sm:py-20">
        <p className="text-[10px] tracking-widest uppercase text-brand-faint font-sans mb-3">
          {siteConfig.name}
        </p>
        <h1
          className="text-4xl sm:text-5xl font-normal text-brand-text"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Gallery
        </h1>
        <p className="mt-3 text-sm text-brand-muted font-sans">
          {galleryImages.length} photographs · {siteConfig.location}
        </p>
      </div>

      {/* ── Masonry grid ────────────────────────────────────────────────────── */}
      <div
        className="px-6 sm:px-10 lg:px-16 py-10"
        style={{
          columns: 'var(--gallery-cols)',
          columnGap: '10px',
        }}
      >
        <style>{`
          :root { --gallery-cols: 1 }
          @media (min-width: 640px)  { :root { --gallery-cols: 2 } }
          @media (min-width: 1024px) { :root { --gallery-cols: 3 } }
        `}</style>

        {galleryImages.map((filename, i) => (
          <div
            key={filename}
            className="mb-[10px] break-inside-avoid cursor-pointer group overflow-hidden border border-brand-border"
            onClick={() => open(i)}
          >
            <div className="overflow-hidden">
              <img
                src={imgSrc(filename)}
                alt={`Gallery photo ${i + 1}`}
                loading="lazy"
                className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom label ────────────────────────────────────────────────────── */}
      <div className="border-t border-brand-border px-6 sm:px-10 lg:px-16 py-8 flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-red flex-shrink-0" />
        <span className="text-[10px] tracking-widest uppercase text-brand-faint font-sans">
          {siteConfig.name} · All rights reserved
        </span>
      </div>

      {/* ── Lightbox ────────────────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          index={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}

    </main>
  )
}
