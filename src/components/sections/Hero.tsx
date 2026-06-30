import heroImage from '../../assets/dogs/dollar/herotogether.png'
import { siteConfig } from '../../config/site'

export default function Hero() {
  return (
    <section className="relative w-full h-[90vh] overflow-hidden">

      {/* ── Full-bleed photo ─────────────────────────────────────────────── */}
      <img
        src={heroImage}
        alt={siteConfig.name}
        className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: '50% 30%' }}
      />

      {/* ── Dark gradient overlay — bottom to top so text is readable ────── */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-transparent" />

      {/* ── Text content — sits above the overlay ────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 px-10 pb-14">

        {/* Eyebrow — small label above the headline */}
        <p className="text-[10px] tracking-widest3 uppercase text-brand-red mb-3">
          European Dobermann · {siteConfig.location}
        </p>

        {/* Headline */}
        <h1 className="font-display text-5xl font-light leading-tight text-brand-text mb-4">
          {siteConfig.tagline.split('.').map((line, i) => (
            <span key={i} className="block">
              {line.trim()}{i < siteConfig.tagline.split('.').length - 2 ? '.' : ''}
            </span>
          ))}
        </h1>

        {/* Red rule */}
        <div className="w-8 h-px bg-brand-red mb-4" />

        {/* Credential strip */}
        <p className="text-[11px] tracking-widest uppercase text-brand-muted">
          KCI Registered · DCM Tested · Holter Certified
        </p>

      </div>
    </section>
  )
}
