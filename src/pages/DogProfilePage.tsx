import { useParams, Link } from 'react-router-dom'
import { allDogs } from '../data/dogs'

// ── Photo imports — all dog photos imported statically ────────────────────────
import dollarSolo   from '../assets/dogs/dollar/dollar_solo.png'
import dollarHero   from '../assets/dogs/dollar/herotogether.png'
import dollar2      from '../assets/dogs/dollar/dollar_2.png'
import dollar3      from '../assets/dogs/dollar/dollar_3.png'
import dollar4      from '../assets/dogs/dollar/dollar_4.png'
import dona1        from '../assets/dogs/dona/dona1.jpeg'
import dona2        from '../assets/dogs/dona/dona2.jpeg'

// Map each photo path string (from data file) to its imported asset
const photoMap: Record<string, string> = {
  'dogs/dollar/dollar_solo.png'  : dollarSolo,
  'dogs/dollar/herotogether.png' : dollarHero,
  'dogs/dollar/dollar_2.png'     : dollar2,
  'dogs/dollar/dollar_3.png'     : dollar3,
  'dogs/dollar/dollar_4.png'     : dollar4,
  'dogs/dona/dona1.jpeg'         : dona1,
  'dogs/dona/dona2.jpeg'         : dona2,
}

// ── Helper — format date ──────────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

export default function DogProfilePage() {
  const { slug } = useParams<{ slug: string }>()
  const dog = allDogs.find((d) => d.slug === slug)

  // ── Dog not found ─────────────────────────────────────────────────────────
  if (!dog) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-brand-muted text-sm tracking-widest uppercase">Dog not found</p>
      </main>
    )
  }

  const coverSrc = photoMap[dog.coverPhoto] ?? dollarSolo
  const allPhotos = dog.photos.map((p) => photoMap[p]).filter(Boolean)

  return (
    <main>

      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <div className="px-10 py-4 border-b border-brand-border flex items-center gap-3">
        <Link to="/dogs" className="text-[10px] tracking-widest uppercase text-brand-faint hover:text-brand-muted transition-colors">
          Dogs
        </Link>
        <span className="text-brand-border">→</span>
        <span className="text-[10px] tracking-widest uppercase text-brand-muted">
          {dog.name}{dog.callName ? ` "${dog.callName}"` : ''}
        </span>
      </div>

      {/* ── Hero photo ───────────────────────────────────────────────────── */}
      <div className="w-full h-[60vh] overflow-hidden">
        <img
          src={coverSrc}
          alt={dog.name}
          className="w-full h-full object-cover"
          style={{ objectPosition: '50% 20%' }}
        />
      </div>

      {/* ── Name + quick credentials ─────────────────────────────────────── */}
      <div className="px-10 py-10 border-b border-brand-border">
        <p className="text-[9px] tracking-widest3 uppercase text-brand-red mb-3">
          {dog.sex === 'male' ? 'Stud' : 'Dam'} · KCI {dog.kciNumber}
        </p>
        <h1 className="font-display text-5xl font-light text-brand-text mb-3">
          {dog.name}{dog.callName && <span className="font-semibold"> "{dog.callName}"</span>}
        </h1>
        <p className="text-[11px] tracking-wider text-brand-muted">
          {dog.colour} · Born {formatDate(dog.dateOfBirth)} · {dog.origin}
        </p>
      </div>

      {/* ── Gallery ──────────────────────────────────────────────────────── */}
      {allPhotos.length > 1 && (
        <div className="px-10 py-10 border-b border-brand-border">
          <p className="text-[9px] tracking-widest3 uppercase text-brand-red mb-6">Gallery</p>
          <div className="grid grid-cols-4 gap-1">
            {allPhotos.map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden">
                <img
                  src={src}
                  alt={`${dog.name} photo ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Registration details ─────────────────────────────────────────── */}
      <div className="px-10 py-10 border-b border-brand-border">
        <p className="text-[9px] tracking-widest3 uppercase text-brand-red mb-6">Registration</p>
        <div className="grid grid-cols-2 gap-px bg-brand-border">
          {[
            { label: 'KCI No.',       value: dog.kciNumber              },
            { label: 'Microchip',     value: dog.microchip ?? '—'       },
            { label: 'Date of Birth', value: formatDate(dog.dateOfBirth) },
            { label: 'Sex',           value: dog.sex === 'male' ? 'Dog' : 'Bitch' },
            { label: 'Colour',        value: dog.colour                  },
            { label: 'Breeder',       value: dog.breeder                 },
          ].map((row) => (
            <div key={row.label} className="bg-brand-bg px-6 py-4">
              <p className="text-[9px] tracking-widest uppercase text-brand-faint mb-1">{row.label}</p>
              <p className="text-[12px] text-brand-muted">{row.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Pedigree ─────────────────────────────────────────────────────── */}
      <div className="px-10 py-10 border-b border-brand-border overflow-x-auto">
        <p className="text-[9px] tracking-widest3 uppercase text-brand-red mb-6">Pedigree</p>

        <div className="flex items-stretch gap-0 min-w-[700px]">

          {/* ── Col 1 — Subject ──────────────────────────────────────────── */}
          <div className="flex flex-col justify-center flex-none w-36">
            <div className="border border-brand-border px-3 py-3">
              <p className="text-[8px] tracking-widest uppercase text-brand-red mb-1">Subject</p>
              <p className="text-[11px] text-brand-text">{dog.name}</p>
              {dog.callName && <p className="text-[10px] text-brand-faint">"{dog.callName}"</p>}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center px-2 text-brand-faint text-xs flex-none">→</div>

          {/* ── Col 2 — Parents ──────────────────────────────────────────── */}
          <div className="flex flex-col gap-1 flex-none w-44">
            {[
              { label: 'Sire', entry: dog.pedigree.sire },
              { label: 'Dam',  entry: dog.pedigree.dam  },
            ].map((row) => (
              <div key={row.label} className="flex-1 border border-brand-border px-3 py-3">
                <p className="text-[8px] tracking-widest uppercase text-brand-red mb-1">{row.label}</p>
                <p className="text-[10px] text-brand-muted">{row.entry.name}</p>
                {row.entry.kciNumber && <p className="text-[8px] text-brand-faint mt-1">{row.entry.kciNumber}</p>}
              </div>
            ))}
          </div>

          {/* Arrow */}
          <div className="flex items-center px-2 text-brand-faint text-xs flex-none">→</div>

          {/* ── Col 3 — Grandparents ─────────────────────────────────────── */}
          <div className="flex flex-col gap-1 flex-none w-52">
            {[
              { label: "Sire's Sire", entry: dog.pedigree.sire.sire },
              { label: "Sire's Dam",  entry: dog.pedigree.sire.dam  },
              { label: "Dam's Sire",  entry: dog.pedigree.dam.sire  },
              { label: "Dam's Dam",   entry: dog.pedigree.dam.dam   },
            ].map((row) => (
              <div key={row.label} className="flex-1 border border-brand-border px-3 py-2">
                <p className="text-[8px] tracking-widest uppercase text-brand-red mb-1">{row.label}</p>
                <p className="text-[9px] text-brand-muted">{row.entry?.name ?? '—'}</p>
                {row.entry?.kciNumber && <p className="text-[8px] text-brand-faint mt-1">{row.entry.kciNumber}</p>}
              </div>
            ))}
          </div>

          {/* Arrow */}
          <div className="flex items-center px-2 text-brand-faint text-xs flex-none">→</div>

          {/* ── Col 4 — Great-grandparents ───────────────────────────────── */}
          <div className="flex flex-col gap-1 flex-1 opacity-60">
            {[
              { label: 'S·S·S', entry: dog.pedigree.sire.sire?.sire },
              { label: 'S·S·D', entry: dog.pedigree.sire.sire?.dam  },
              { label: 'S·D·S', entry: dog.pedigree.sire.dam?.sire  },
              { label: 'S·D·D', entry: dog.pedigree.sire.dam?.dam   },
              { label: 'D·S·S', entry: dog.pedigree.dam.sire?.sire  },
              { label: 'D·S·D', entry: dog.pedigree.dam.sire?.dam   },
              { label: 'D·D·S', entry: dog.pedigree.dam.dam?.sire   },
              { label: 'D·D·D', entry: dog.pedigree.dam.dam?.dam    },
            ].map((row) => (
              <div key={row.label} className="flex-1 border border-brand-border px-3 py-1">
                <p className="text-[7px] tracking-widest uppercase text-brand-red mb-1">{row.label}</p>
                <p className="text-[9px] text-brand-muted">{row.entry?.name ?? '—'}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Health vault ─────────────────────────────────────────────────── */}
      <div className="px-10 py-10 border-b border-brand-border">
        <p className="text-[9px] tracking-widest3 uppercase text-brand-red mb-6">Health vault</p>
        <p className="text-[11px] text-brand-faint tracking-wider">
          Health records will be uploaded when available.
        </p>
      </div>

      {/* ── Enquiry CTA ──────────────────────────────────────────────────── */}
      <div className="px-10 py-16 text-center">
        <p className="text-[9px] tracking-widest3 uppercase text-brand-red mb-4">Enquiries</p>
        <div className="w-6 h-px bg-brand-red mx-auto mb-6" />
        <p className="text-[12px] text-brand-faint mb-8 max-w-sm mx-auto leading-relaxed tracking-wider">
          Serious enquiries only. A short questionnaire helps us understand your background.
        </p>
        <Link
          to="/enquire"
          className="inline-block px-8 py-3 border border-brand-border text-[10px] tracking-widest uppercase text-brand-muted hover:text-brand-text hover:border-brand-faint transition-all duration-200"
        >
          Begin questionnaire
        </Link>
      </div>

    </main>
  )
}
