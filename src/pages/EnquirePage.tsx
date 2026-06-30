import { useState } from 'react'
import { Link } from 'react-router-dom'
import { siteConfig } from '../config/site'

// ── Types ─────────────────────────────────────────────────────────────────────
interface FormData {
  // Step 1
  name           : string
  location       : string
  ownedDobermann : string
  ownedLarge     : string
  // Step 2
  livingSituation : string
  homePresence    : string
  activityLevel   : string
  // Step 3
  purpose         : string
  timeline        : string
  healthAware     : string
  // Step 4
  email           : string
  phone           : string
  contactPref     : string
  message         : string
}

const initial: FormData = {
  name: '', location: '',
  ownedDobermann: '', ownedLarge: '',
  livingSituation: '', homePresence: '', activityLevel: '',
  purpose: '', timeline: '', healthAware: '',
  email: '', phone: '', contactPref: '', message: '',
}

// ── Small components ──────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] tracking-widest uppercase text-brand-faint font-sans">
        {label}
      </label>
      {children}
    </div>
  )
}

function TextInput({
  value, onChange, placeholder, type = 'text',
}: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-brand-surface border border-brand-border text-brand-text text-sm font-sans px-4 py-3 outline-none focus:border-brand-muted transition-colors placeholder:text-brand-faint"
    />
  )
}

function Pills({
  options, value, onChange,
}: {
  options: string[]; value: string; onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-4 py-2 text-[11px] tracking-wider uppercase font-sans border transition-colors duration-150 ${
            value === opt
              ? 'border-brand-muted text-brand-muted'
              : 'border-brand-border text-brand-faint hover:border-brand-faint hover:text-brand-muted'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

function PrefCard({
  label, icon, selected, onClick,
}: {
  label: string; icon: React.ReactNode; selected: boolean; onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-3 py-5 px-4 border transition-colors duration-150 ${
        selected ? 'border-brand-muted' : 'border-brand-border hover:border-brand-faint'
      }`}
    >
      <span className={selected ? 'text-brand-muted' : 'text-brand-faint'}>{icon}</span>
      <span className={`text-[10px] tracking-widest uppercase font-sans ${selected ? 'text-brand-muted' : 'text-brand-faint'}`}>
        {label}
      </span>
    </button>
  )
}

// ── SVG icons ─────────────────────────────────────────────────────────────────
const IconWhatsApp = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const IconPhone = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconEmail = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// ── Step labels ───────────────────────────────────────────────────────────────
const STEP_LABELS = ['About you', 'Lifestyle', 'Intent', 'Contact']

// ── Thank-you screen ──────────────────────────────────────────────────────────
function ThankYou() {
  return (
    <main className="min-h-screen bg-brand-bg flex flex-col">

      {/* Header */}
      <div className="border-b border-brand-border px-6 sm:px-10 lg:px-16 py-14 sm:py-20">
        <p className="text-[10px] tracking-widest uppercase text-brand-faint font-sans mb-3">
          {siteConfig.name}
        </p>
        <h1
          className="text-4xl sm:text-5xl font-normal text-brand-text"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Enquire
        </h1>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center border-b border-brand-border">
        <span className="w-2 h-2 rounded-full bg-brand-red mb-10 block" />
        <p className="text-[10px] tracking-widest uppercase text-brand-faint font-sans mb-5">
          Enquiry received
        </p>
        <h2
          className="text-3xl sm:text-4xl font-normal text-brand-text mb-8 leading-snug"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Keep calm.<br />Do your kaam.
        </h2>
        <div className="w-8 border-t border-brand-border mb-8" />
        <p className="text-sm text-brand-faint font-sans leading-relaxed max-w-sm">
          Gurinder reviews every submission personally. If there's a fit, he'll reach out on your preferred channel. This may take a few days.
        </p>
      </div>

      {/* Footer bar */}
      <div className="px-6 sm:px-10 lg:px-16 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
          <span className="text-[10px] tracking-widest uppercase text-brand-faint font-sans">
            {siteConfig.name}
          </span>
        </div>
        <Link
          to="/"
          className="text-[10px] tracking-widest uppercase text-brand-faint font-sans hover:text-brand-muted transition-colors"
        >
          ← Back to home
        </Link>
      </div>

    </main>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function EnquirePage() {
  const [step, setStep]         = useState(0)
  const [form, setForm]         = useState<FormData>(initial)
  const [submitted, setSubmitted] = useState(false)

  const set = (key: keyof FormData) => (val: string) =>
    setForm(f => ({ ...f, [key]: val }))

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) return <ThankYou />

  return (
    <main className="min-h-screen bg-brand-bg">

      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div className="border-b border-brand-border px-6 sm:px-10 lg:px-16 py-14 sm:py-20">
        <p className="text-[10px] tracking-widest uppercase text-brand-faint font-sans mb-3">
          {siteConfig.name}
        </p>
        <h1
          className="text-4xl sm:text-5xl font-normal text-brand-text"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Enquire
        </h1>
        <p className="mt-3 text-sm text-brand-muted font-sans">
          Fill in the form below. Gurinder reviews every submission personally and reaches out to suitable applicants.
        </p>
      </div>

      {/* ── Step tabs ─────────────────────────────────────────────────────── */}
      <div className="flex border-b border-brand-border overflow-x-auto">
        {STEP_LABELS.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => i < step && setStep(i)}
            className={`flex-1 min-w-[80px] py-4 text-[9px] tracking-widest uppercase font-sans border-r border-brand-border last:border-r-0 transition-colors duration-150 ${
              i === step
                ? 'text-brand-muted border-b border-brand-text -mb-px'
                : i < step
                ? 'text-brand-faint cursor-pointer hover:text-brand-muted'
                : 'text-[#2a2a2a] cursor-default'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Form ──────────────────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit}>
        <div className="px-6 sm:px-10 lg:px-16 py-10 max-w-3xl">

          {/* Step indicator */}
          <p className="text-[10px] tracking-widest uppercase text-brand-red font-sans mb-8">
            Step {step + 1} of {STEP_LABELS.length} — {STEP_LABELS[step]}
          </p>

          {/* ── Step 1: About you ─────────────────────────────────────────── */}
          {step === 0 && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="Full name">
                  <TextInput value={form.name} onChange={set('name')} placeholder="Your name" />
                </Field>
                <Field label="City / Country">
                  <TextInput value={form.location} onChange={set('location')} placeholder="e.g. Delhi, India" />
                </Field>
              </div>
              <Field label="Have you owned a Dobermann before?">
                <Pills options={['Yes', 'No']} value={form.ownedDobermann} onChange={set('ownedDobermann')} />
              </Field>
              <Field label="Have you owned a large breed dog before?">
                <Pills options={['Yes', 'No']} value={form.ownedLarge} onChange={set('ownedLarge')} />
              </Field>
            </div>
          )}

          {/* ── Step 2: Lifestyle ─────────────────────────────────────────── */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <Field label="Living situation">
                <Pills
                  options={['House with yard', 'Apartment', 'Farm / open land']}
                  value={form.livingSituation}
                  onChange={set('livingSituation')}
                />
              </Field>
              <Field label="Who is home during the day?">
                <Pills
                  options={['Someone always home', 'Part of the day', 'Mostly empty']}
                  value={form.homePresence}
                  onChange={set('homePresence')}
                />
              </Field>
              <Field label="Household activity level">
                <Pills
                  options={['Very active', 'Moderate', 'Low-key']}
                  value={form.activityLevel}
                  onChange={set('activityLevel')}
                />
              </Field>
            </div>
          )}

          {/* ── Step 3: Intent ────────────────────────────────────────────── */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              <Field label="Purpose">
                <Pills
                  options={['Family companion', 'Personal protection', 'Sport & training', 'Breeding']}
                  value={form.purpose}
                  onChange={set('purpose')}
                />
              </Field>
              <Field label="Timeline">
                <Pills
                  options={['Ready now', 'Within 6 months', 'Just exploring']}
                  value={form.timeline}
                  onChange={set('timeline')}
                />
              </Field>
              <Field label="Are you aware this breed requires significant investment in training and health?">
                <Pills
                  options={['Yes, fully aware', "I'd like to learn more"]}
                  value={form.healthAware}
                  onChange={set('healthAware')}
                />
              </Field>
            </div>
          )}

          {/* ── Step 4: Contact ───────────────────────────────────────────── */}
          {step === 3 && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="Email address">
                  <TextInput value={form.email} onChange={set('email')} placeholder="your@email.com" type="email" />
                </Field>
                <Field label="WhatsApp / Phone">
                  <TextInput value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210" type="tel" />
                </Field>
              </div>
              <Field label="Preferred contact method">
                <div className="grid grid-cols-3 gap-3">
                  <PrefCard label="WhatsApp"   icon={IconWhatsApp} selected={form.contactPref === 'WhatsApp'}   onClick={() => set('contactPref')('WhatsApp')}   />
                  <PrefCard label="Phone call" icon={IconPhone}    selected={form.contactPref === 'Phone call'} onClick={() => set('contactPref')('Phone call')} />
                  <PrefCard label="Email"      icon={IconEmail}    selected={form.contactPref === 'Email'}      onClick={() => set('contactPref')('Email')}      />
                </div>
              </Field>
              <Field label="Anything else you'd like Gurinder to know?">
                <textarea
                  value={form.message}
                  onChange={e => set('message')(e.target.value)}
                  placeholder="Optional — share any details that might help"
                  rows={4}
                  className="bg-brand-surface border border-brand-border text-brand-text text-sm font-sans px-4 py-3 outline-none focus:border-brand-muted transition-colors placeholder:text-brand-faint resize-none"
                />
              </Field>
            </div>
          )}

          {/* ── Navigation ────────────────────────────────────────────────── */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-brand-border">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep(s => s - 1)}
                className="text-[10px] tracking-widest uppercase text-brand-faint font-sans border border-brand-border px-6 py-3 hover:border-brand-faint hover:text-brand-muted transition-colors"
              >
                ← Back
              </button>
            ) : (
              <span />
            )}

            <span className="text-[10px] tracking-widest text-[#2a2a2a] font-sans">
              {step + 1} / {STEP_LABELS.length}
            </span>

            {step < STEP_LABELS.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep(s => s + 1)}
                className="text-[10px] tracking-widest uppercase text-brand-muted font-sans border border-brand-muted px-6 py-3 hover:border-brand-text hover:text-brand-text transition-colors"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                className="text-[10px] tracking-widest uppercase text-brand-muted font-sans border border-brand-muted px-6 py-3 hover:border-brand-text hover:text-brand-text transition-colors"
              >
                Submit enquiry →
              </button>
            )}
          </div>

        </div>
      </form>

    </main>
  )
}
