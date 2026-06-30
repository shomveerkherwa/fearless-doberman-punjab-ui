import { Link } from 'react-router-dom'
import type { DogSummary } from '../../data/dogs'

// ── Props ─────────────────────────────────────────────────────────────────────
// This component accepts any dog — not hardcoded to a specific one
interface FeaturedDogProps {
  dog         : DogSummary
  photo       : string        // imported image passed in from the page
  flip       ?: boolean       // if true, photo on right, details on left
  bgGradient ?: string        // optional CSS gradient behind the photo
}

export default function FeaturedDog({ dog, photo, flip = false, bgGradient }: FeaturedDogProps) {
  return (
    <section className="w-full px-10 py-16 border-b border-brand-border">

      {/* Section label */}
      <p className="text-[9px] tracking-widest3 uppercase text-brand-red mb-8">
        {dog.sex === 'male' ? 'Stud' : 'Dam'}
      </p>

      <div className={`grid grid-cols-2 gap-12 items-center ${flip ? 'direction-rtl' : ''}`}>

        {/* ── Photo ──────────────────────────────────────────────────────── */}
        <div
          className={`w-full aspect-[4/5] flex items-center justify-center overflow-hidden ${flip ? 'order-2' : 'order-1'}`}
          style={{ background: bgGradient ?? '#0d0d0d' }}
        >
          <img
            src={photo}
            alt={`${dog.name}${dog.callName ? ` "${dog.callName}"` : ''}`}
            className="w-full h-full object-contain"
          />
        </div>

        {/* ── Details ────────────────────────────────────────────────────── */}
        <div className={`flex flex-col gap-8 ${flip ? 'order-1' : 'order-2'}`}>

          {/* Name */}
          <h2 className="font-display text-4xl font-light text-brand-text">
            {dog.name}{' '}
            {dog.callName && (
              <span className="font-semibold">"{dog.callName}"</span>
            )}
          </h2>

          {/* Stats table */}
          <div className="flex flex-col">
            {[
              { label: 'KCI No.',  value: dog.kciNumber   },
              { label: 'Sire',     value: dog.sire         },
              { label: 'Dam',      value: dog.dam          },
              { label: 'Colour',   value: dog.colour       },
              { label: 'Origin',   value: dog.origin       },
              { label: 'Breeder',  value: dog.breeder      },
            ].map((row) => (
              <div
                key={row.label}
                className="flex justify-between items-center py-3 border-b border-brand-border"
              >
                <span className="text-[9px] tracking-widest uppercase text-brand-faint">
                  {row.label}
                </span>
                <span className="text-[12px] text-brand-muted text-right max-w-[60%]">
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Link to full profile */}
          <Link
            to={`/dogs/${dog.slug}`}
            className="text-[10px] tracking-widest uppercase text-brand-red flex items-center gap-2 hover:gap-3 transition-all duration-200"
          >
            Full profile <span>→</span>
          </Link>

        </div>
      </div>
    </section>
  )
}
