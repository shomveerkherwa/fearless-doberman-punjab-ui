import { Link } from 'react-router-dom'
import { siteConfig } from '../../config/site'
import logo from '/images/logo.png'

export default function Header() {
  return (
    <header className="w-full">

      {/* ── Announcement bar ─────────────────────────────────────────────── */}
      <div className="w-full border-b border-brand-border px-10 py-2 flex justify-center">
        <p className="text-[10px] tracking-widest2 uppercase text-brand-muted">
          {siteConfig.announcement}
        </p>
      </div>

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav className="w-full border-b border-brand-border px-10 py-5 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt={siteConfig.name}
            className="h-20 w-auto"
          />
        </Link>

        {/* Nav links */}
        <ul className="flex gap-8 list-none">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="text-[13px] tracking-widest uppercase text-brand-muted hover:text-brand-text transition-colors duration-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

      </nav>
    </header>
  )
}
