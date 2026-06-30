import { useEffect, useRef, useState } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────
interface WaveformPlayerProps {
  src: string
  totalSeconds: number
  label: string
  sublabel: string
  photoSrc?: string
}

// ── WaveformPlayer ────────────────────────────────────────────────────────────
function WaveformPlayer({ src, totalSeconds, label, sublabel, photoSrc }: WaveformPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const waveDataRef = useRef<number[]>([])
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(totalSeconds)
  const [waveReady, setWaveReady] = useState(false)

  const NUM_BARS = 90

  // Decode audio and generate real waveform data
  useEffect(() => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContext) return

    fetch(src)
      .then(r => r.arrayBuffer())
      .then(buf => {
        const ctx = new AudioContext()
        return ctx.decodeAudioData(buf)
      })
      .then(decoded => {
        const data = decoded.getChannelData(0)
        const blockSize = Math.floor(data.length / NUM_BARS)
        const bars: number[] = []
        for (let i = 0; i < NUM_BARS; i++) {
          let sum = 0
          for (let j = 0; j < blockSize; j++) {
            sum += Math.abs(data[i * blockSize + j])
          }
          bars.push(sum / blockSize)
        }
        const max = Math.max(...bars)
        waveDataRef.current = bars.map(v => v / max)
        setWaveReady(true)
      })
      .catch(() => {
        // Fallback: generate a plausible-looking waveform
        const bars: number[] = []
        for (let i = 0; i < NUM_BARS; i++) {
          const t = i / NUM_BARS
          const base = 0.3 + 0.5 * Math.sin(t * Math.PI)
          const noise = (Math.random() - 0.5) * 0.3
          bars.push(Math.max(0.05, Math.min(1, base + noise)))
        }
        waveDataRef.current = bars
        setWaveReady(true)
      })
  }, [src])

  // Draw waveform on canvas
  useEffect(() => {
    if (!waveReady || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const progress = duration > 0 ? currentTime / duration : 0
    const playedIdx = Math.floor(progress * NUM_BARS)
    const W = canvas.width
    const H = canvas.height
    const barW = 3
    const gap = Math.floor((W - barW * NUM_BARS) / (NUM_BARS - 1))

    ctx.clearRect(0, 0, W, H)

    waveDataRef.current.forEach((h, i) => {
      const x = i * (barW + gap)
      const barH = Math.max(2, Math.round(h * H))
      const y = (H - barH) / 2
      ctx.fillStyle = i <= playedIdx ? '#E20612' : '#2a2a2a'
      ctx.fillRect(x, y, barW, barH)
    })
  }, [waveReady, currentTime, duration])

  // Audio element setup
  useEffect(() => {
    const audio = new Audio(src)
    audioRef.current = audio

    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration))
    audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime))
    audio.addEventListener('ended', () => {
      setPlaying(false)
      setCurrentTime(0)
      audio.currentTime = 0
    })

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [src])

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play()
      setPlaying(true)
    }
  }

  function scrub(e: React.MouseEvent<HTMLCanvasElement>) {
    const audio = audioRef.current
    if (!audio || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audio.currentTime = ratio * duration
    setCurrentTime(ratio * duration)
  }

  function fmt(s: number) {
    const m = Math.floor(s / 60)
    const sec = String(Math.floor(s % 60)).padStart(2, '0')
    return `${m}:${sec}`
  }

  return (
    <div className="flex border border-brand-border w-full" style={{ background: '#111111' }}>
      {/* Photo — CSS background so transparent PNG blends into dark surface */}
      <div
        style={{
          width: 88,
          minHeight: 88,
          flexShrink: 0,
          backgroundColor: '#0d0d0d',
          backgroundImage: photoSrc ? `url(${photoSrc})` : 'none',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          borderRight: '0.5px solid #1e1e1e',
        }}
        aria-hidden="true"
      />

      {/* Right panel */}
      <div className="flex-1 px-4 py-3 flex flex-col gap-2 min-w-0">
        {/* Title row */}
        <div>
          <p className="text-xs text-brand-text font-sans font-medium tracking-wide">{label}</p>
          <p className="text-[11px] text-brand-faint font-sans mt-0.5">{sublabel}</p>
        </div>

        {/* Play + waveform + time — all one row */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="w-6 h-6 rounded-full bg-brand-red flex items-center justify-center flex-shrink-0"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? (
              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
              </svg>
            ) : (
              <svg className="w-2.5 h-2.5 text-white ml-px" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <canvas
            ref={canvasRef}
            width={400}
            height={36}
            className="flex-1 cursor-pointer"
            style={{ minWidth: 0 }}
            onClick={scrub}
            aria-label="Audio waveform — click to seek"
          />

          <span className="text-[10px] text-brand-faint font-sans font-mono flex-shrink-0">
            {fmt(currentTime)} / {fmt(duration)}
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Shared inner container ────────────────────────────────────────────────────
function Inner({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  )
}

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`py-12 sm:py-16 border-b border-brand-border ${className}`}>
      <Inner>{children}</Inner>
    </section>
  )
}

function Eyebrow({ num, label }: { num?: string; label: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <span className="text-[11px] tracking-widest2 uppercase text-brand-red font-sans">{label}</span>
      {num && <span className="text-[11px] text-brand-faint font-sans opacity-40">{num}</span>}
    </div>
  )
}

// ── AboutPage ─────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main className="bg-brand-bg text-brand-text">

      {/* Hero */}
      <section className="py-20 sm:py-28 border-b border-brand-border">
        <Inner>
          <p className="text-[11px] tracking-widest2 uppercase text-brand-red font-sans mb-6">
            About the kennel
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-brand-text mb-6">
            Bred with intent.<br />Documented with honesty.
          </h1>
          <p className="font-sans text-brand-muted text-sm sm:text-base leading-relaxed max-w-2xl">
            A small kennel running European Dobermann lines with one rule — fewer litters, no compromises.
          </p>
        </Inner>
      </section>

      {/* 01 — Origin */}
      <Section>
        <Eyebrow num="01" label="Origin" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-brand-text mb-6">
              Passion, not production
            </h2>
            <p className="font-sans text-brand-muted text-sm leading-relaxed">
              This kennel was built around a single conviction — that the Dobermann deserves breeders who treat the breed with the same seriousness the breed was engineered for. We produce a small number of litters each year, by deliberate choice. Volume is a compromise. We are not interested in compromise.
            </p>
          </div>
          <blockquote className="border-l border-brand-red pl-6 lg:mt-14">
            <p className="font-display text-xl sm:text-2xl italic text-brand-muted leading-relaxed">
              "We breed because we love the dog. The business follows — it does not lead."
            </p>
          </blockquote>
        </div>
      </Section>

      {/* 02 — Vision */}
      <Section>
        <Eyebrow num="02" label="Vision" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-10">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-brand-text mb-6">
              Putting India on the map
            </h2>
            <p className="font-sans text-brand-muted text-sm leading-relaxed">
              The kennels in Belarus — <em>Dei Casa</em>, <em>Vital Screen</em> — they define what the European Dobermann looks like at its best. That standard belongs here too. India has the passion, the lineage, and the seriousness to compete at that level.
            </p>
          </div>
          <blockquote className="border-l border-brand-red pl-6 lg:mt-14">
          <p className="font-display text-lg sm:text-xl italic text-brand-muted leading-relaxed">
            "Our ambition is to put this country on the map — and to prove that the finest Dobermann in the world can come from our soil, from our land, from Punjab."
          </p>
          </blockquote>
        </div>
        <WaveformPlayer
          src="/audio/vision.mp3"
          totalSeconds={36}
          label="In his own words"
          sublabel="Gurinder · Fearless Dobermans Punjab"
          photoSrc="/images/gurinder.png"
        />
      </Section>

      {/* 03 — Bloodlines */}
      <Section>
        <Eyebrow num="03" label="Bloodlines" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-brand-text mb-6">
              European stock. Verified lineage.
            </h2>
            <p className="font-sans text-brand-muted text-sm leading-relaxed">
              Our dogs trace to champion lines from Belarus and Russia — working and show lineages with full documentation. Every parent in our programme carries a verified pedigree. We are explicit about this because the Indian market has a documented problem with mislabelled imports and crossbred animals sold as purebred. We are not that.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:mt-14 content-start">
            {['Belarus imports', 'Russian lines', 'KCI registered', 'Champion ancestry'].map(tag => (
              <span key={tag} className="text-[11px] font-sans text-brand-faint border border-brand-border px-3 py-1.5 tracking-wide">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* 04 — Health */}
      <Section>
        <Eyebrow num="04" label="Health & Transparency" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-10">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-brand-text mb-6">
              What we test. What we share.
            </h2>
            <p className="font-sans text-brand-muted text-sm leading-relaxed">
              Every puppy leaves with full documentation. We are building a public health vault — a record of every test, every Holter log, every hip score — available to any buyer, at any time.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-border">
          {[
            { label: 'Cardiac', text: 'DCM1 / DCM2 genetic screening on all breeding animals' },
            { label: 'Structural', text: 'Hip dysplasia scoring before any dog enters the programme' },
            { label: 'Nutrition', text: 'Calcium and D3 protocols to prevent developmental leg issues' },
            { label: 'Holter logs', text: '24-hour cardiac rhythm monitoring shared publicly' },
          ].map(item => (
            <div key={item.label} className="bg-brand-bg p-6">
              <p className="text-[10px] tracking-widest2 uppercase text-brand-red font-sans mb-3">{item.label}</p>
              <p className="text-xs text-brand-faint font-sans leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 05 — Verification */}
      <Section>
        <Eyebrow num="05" label="Verification" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-brand-text mb-6">
              Come and see for yourself.
            </h2>
            <p className="font-sans text-brand-muted text-sm leading-relaxed">
              Every prospective buyer is welcome to visit in person. See the parents. See the environment. Ask every question. We operate a fully refundable deposit system — if you visit and are not satisfied, you leave with your money. No pressure. No performance. Just the dogs as they are.
            </p>
          </div>
          <p className="font-sans text-brand-faint text-sm leading-relaxed lg:mt-14">
            We have received enquiries from the USA, Canada, and Spain. International buyers are welcome — we handle export paperwork in full.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <section className="py-24 text-center">
        <Inner>
          <p className="font-display text-3xl sm:text-4xl text-brand-text mb-8">
            View the dogs currently in our programme
          </p>
          <a
            href="/dogs"
            className="inline-block border border-brand-border text-brand-muted text-[11px] tracking-widest2 uppercase font-sans px-8 py-3 hover:border-brand-faint hover:text-brand-text transition-colors"
          >
            See all dogs
          </a>
        </Inner>
      </section>

    </main>
  )
}
