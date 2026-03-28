import { useState, useEffect, useRef } from 'react'

// ─── Constants ────────────────────────────────────────────────────────────────
const PHONE      = '(619) 480-5324'
const PHONE_HREF = 'tel:6194805324'
const LOGO_URL   = 'https://yadala-towing.com/wp-content/uploads/2021/05/logo2.png'
const HERO_IMG   = 'https://www.yadala-towing.com/wp-content/uploads/2021/08/6b9ded4a-b55d-41b5-aed2-20f32e81f02c-1024x768.jpg'

// ─── Color tokens ─────────────────────────────────────────────────────────────
const C = {
  bg:         '#FFFFFF',
  bgAlt:      '#F8F9FA',
  bgFooter:   '#111111',
  card:       '#FFFFFF',
  cardBorder: '#E5E7EB',
  heading:    '#111111',
  body:       '#374151',
  muted:      '#6B7280',
  accent:     '#F5A623',
  accentDark: '#D97706',
  accentText: '#111111',
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const PhoneIcon  = ({ cls = 'w-5 h-5' }) => <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
const BoltIcon   = ({ cls = 'w-6 h-6' }) => <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>
const ClockIcon  = ({ cls = 'w-6 h-6' }) => <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
const ShieldIcon = ({ cls = 'w-5 h-5' }) => <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
const MedalIcon  = ({ cls = 'w-6 h-6' }) => <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" /></svg>
const MapPinIcon = ({ cls = 'w-4 h-4' }) => <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
const ChatIcon   = ({ cls = 'w-5 h-5' }) => <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" /></svg>
const SendIcon   = ({ cls = 'w-4 h-4' }) => <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
const XIcon      = ({ cls = 'w-5 h-5' }) => <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>

const StarFilled = ({ cls = 'w-4 h-4' }) => (
  <svg className={cls} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

// ─── Data ─────────────────────────────────────────────────────────────────────
const PRIMARY_SERVICES = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10" style={{ color: C.accent }}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>,
    name: 'Car & Vehicle Towing',
    desc: 'Local and long distance towing — damage-free guaranteed on every job.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10" style={{ color: C.accent }}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg>,
    name: 'Flatbed Towing',
    desc: 'Perfect for AWD, luxury, classic, and custom vehicles that need extra care.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10" style={{ color: C.accent }}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>,
    name: 'Medium Duty / Truck & SUV Towing',
    desc: 'Heavy-duty capability for vans, trucks, and larger vehicles.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10" style={{ color: C.accent }}><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" /></svg>,
    name: 'Motorcycle Towing',
    desc: 'Specialized flatbed transport designed specifically for bikes.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10" style={{ color: C.accent }}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" /></svg>,
    name: 'Roadside Assistance',
    desc: 'Jump-starts, lockouts, fuel delivery (gas & diesel), flat tire replacement.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10" style={{ color: C.accent }}><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" /></svg>,
    name: 'Winch-Out & Recovery',
    desc: 'Flatbed & 4x4 off-road recovery and winching service — we get you unstuck.',
  },
]

const GALLERY_IMGS = [
  { src: 'https://www.yadala-towing.com/wp-content/uploads/2021/05/WhatsApp-Image-2021-05-01-at-2.56.42-PM-4-1024x768.jpeg',  alt: 'flatbed towing San Diego', w: 1024, h: 768  },
  { src: 'https://www.yadala-towing.com/wp-content/uploads/2021/08/b218556a-f0e4-41b3-bbcb-39b1b17195df-1024x768.jpg',        alt: 'car towing Chula Vista', w: 1024, h: 768    },
  { src: 'https://www.yadala-towing.com/wp-content/uploads/2021/05/WhatsApp-Image-2021-05-01-at-2.56.42-PM-3-1024x576.jpeg',  alt: 'motorcycle towing San Diego', w: 1024, h: 576},
  { src: 'https://www.yadala-towing.com/wp-content/uploads/2021/05/WhatsApp-Image-2021-05-01-at-2.56.40-PM-5-1024x768.jpeg',  alt: 'roadside assistance San Diego County', w: 1024, h: 768 },
  { src: 'https://www.yadala-towing.com/wp-content/uploads/2021/08/7e7fe498-13ef-42f7-b52d-dd25ce1ee1dc-1024x768.jpg',        alt: 'tow truck near me San Diego', w: 1024, h: 768 },
  { src: 'https://www.yadala-towing.com/wp-content/uploads/2021/05/WhatsApp-Image-2021-05-01-at-2.22.34-PM-1-1024x768.jpeg',  alt: 'emergency towing Chula Vista CA', w: 1024, h: 768 },
  { src: 'https://www.yadala-towing.com/wp-content/uploads/2021/08/408be158-28f3-4802-878a-c5541e27d35a-768x1024.jpg',        alt: 'flatbed towing San Diego', w: 768, h: 1024  },
  { src: 'https://www.yadala-towing.com/wp-content/uploads/2021/05/WhatsApp-Image-2021-05-01-at-2.56.39-PM-4-1024x768.jpeg',  alt: 'car towing Chula Vista', w: 1024, h: 768    },
  { src: 'https://www.yadala-towing.com/wp-content/uploads/2021/08/de26df67-e3e4-456f-8b09-3bd2c40910b0-1024x768.jpg',        alt: 'motorcycle towing San Diego', w: 1024, h: 768},
  { src: 'https://www.yadala-towing.com/wp-content/uploads/2021/08/4a4f43ae-2800-46fd-b6be-2c1f1dd0bf62-1024x768.jpg',        alt: 'roadside assistance San Diego County', w: 1024, h: 768 },
  { src: 'https://www.yadala-towing.com/wp-content/uploads/2021/08/b816bd49-4573-4291-b8ef-1984db9ede45-1024x768.jpg',        alt: 'tow truck near me San Diego', w: 1024, h: 768 },
]

const REVIEWS_DATA = [
  { name: 'Sofia C.',    location: 'San Diego, CA',    date: 'Sep 2024', text: 'Edgar made my day. It was such an easy process. It was the smoothest tow ever.' },
  { name: 'Cristal R.', location: 'Spring Valley, CA', date: 'Apr 2023', text: 'Louis Peña is great! He picked up our car very quick! Highly recommend!' },
  { name: 'Eric J.',    location: 'National City, CA', date: '',         text: 'Yadala towed me for $65 flat when everyone else wanted over $120. You guys are the goats.' },
  { name: 'Vanessa H.', location: 'Poway, CA',         date: '',         text: 'Sain came out and was able to put her car into neutral and on his truck. Highly recommend! Great customer service!' },
  { name: 'Brianna L.', location: '',                  date: '',         text: 'Very reliable. They were on time and have very good customer service skills.' },
  { name: 'Jorge V.',   location: '',                  date: '',         text: 'Very professional, polite and affordable. Gave us a time frame and showed up on time.' },
]

// ─── Hook: Fade Up on Scroll ──────────────────────────────────────────────────
function useFadeUp(delay = 0) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.unobserve(el) } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return [ref, visible]
}

const fade = (v, d = 0) => ({
  opacity: v ? 1 : 0,
  transform: v ? 'translateY(0)' : 'translateY(26px)',
  transition: `opacity 0.65s ease ${d}ms, transform 0.65s ease ${d}ms`,
})

const SectionLabel = ({ children }) => (
  <p className="font-body font-semibold text-sm uppercase tracking-[0.25em] text-center mb-2" style={{ color: C.accentDark }}>
    {children}
  </p>
)

const SectionHeading = ({ children }) => (
  <h2 className="font-display font-black text-center mb-4" style={{ color: C.heading, fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
    {children}
  </h2>
)

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Gallery',  href: '#gallery'  },
    { label: 'Reviews',  href: '#reviews'  },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: `1px solid ${scrolled ? C.cardBorder : 'transparent'}`,
        boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          <a href="#" aria-label="Yadala Towing — Home" className="flex-shrink-0">
            <img src={LOGO_URL} alt="Yadala Towing logo" className="h-9 sm:h-10 lg:h-12 w-auto" width="160" height="52" />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a
                key={l.href} href={l.href}
                className="font-body font-medium text-sm uppercase tracking-widest transition-colors duration-200"
                style={{ color: C.muted }}
                onMouseEnter={e => e.currentTarget.style.color = C.accentDark}
                onMouseLeave={e => e.currentTarget.style.color = C.muted}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href={PHONE_HREF}
            className="hidden md:inline-flex items-center gap-2 font-display font-bold text-sm px-5 py-3 rounded-xl transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: C.accent, color: C.accentText }}
          >
            <PhoneIcon cls="w-4 h-4" /> Call {PHONE}
          </a>

          {/* Mobile: call button + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={PHONE_HREF}
              className="animate-pulse-cta inline-flex items-center gap-1.5 font-display font-bold text-sm px-3 py-2.5 rounded-xl"
              style={{ backgroundColor: C.accent, color: C.accentText, minHeight: '44px' }}
            >
              <PhoneIcon cls="w-4 h-4" /> Call Now
            </a>
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              className="flex items-center justify-center rounded-xl"
              style={{ color: C.heading, minWidth: '44px', minHeight: '44px' }}
            >
              {menuOpen
                ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className="md:hidden overflow-hidden transition-all duration-300" style={{ maxHeight: menuOpen ? '280px' : '0' }}>
        <div className="px-4 py-3 border-t" style={{ backgroundColor: C.bgAlt, borderColor: C.cardBorder }}>
          {links.map(l => (
            <a
              key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="flex items-center font-body font-medium py-3.5 px-2 uppercase tracking-widest text-sm border-b last:border-0"
              style={{ color: C.body, borderColor: C.cardBorder, minHeight: '52px' }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={PHONE_HREF}
            className="flex items-center justify-center gap-2 font-display font-bold py-4 rounded-xl mt-3"
            style={{ backgroundColor: C.accent, color: C.accentText, fontSize: '1.1rem' }}
          >
            <PhoneIcon cls="w-5 h-5" /> Call {PHONE}
          </a>
        </div>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false)
  return (
    <section id="hero" className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '100svh', paddingTop: '56px' }}>
      <div className="absolute inset-0">
        <img
          src={HERO_IMG} alt="towing truck San Diego County roadside assistance"
          onLoad={() => setLoaded(true)}
          className="w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: loaded ? 1 : 0 }}
          width="1024" height="768" fetchpriority="high"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.48) 0%, rgba(0,0,0,0.72) 55%, rgba(10,10,10,0.97) 100%)' }} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: `linear-gradient(to right, transparent, ${C.accent}, transparent)` }} />

      <div className="relative z-10 text-center w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-24">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4 sm:mb-6" style={{ backgroundColor: 'rgba(245,166,35,0.18)', border: '1px solid rgba(245,166,35,0.45)' }}>
          <span className="inline-block w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ backgroundColor: C.accent }} />
          <span className="font-body font-medium text-xs sm:text-sm tracking-widest uppercase" style={{ color: C.accent }}>San Diego County's Most Trusted Towing</span>
        </div>

        {/* H1 — bigger impact on mobile */}
        <h1
          className="font-display font-black text-white leading-none mb-4 sm:mb-6"
          style={{ fontSize: 'clamp(2.6rem, 10vw, 5.5rem)', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
        >
          Towing &amp; Roadside<br />
          Assistance in
          <span style={{ color: C.accent }}> San Diego</span>
        </h1>

        {/* Sub */}
        <p className="font-body text-base sm:text-xl mb-7 sm:mb-10 max-w-2xl mx-auto" style={{ color: '#E5E7EB', lineHeight: 1.6 }}>
          Fast Response &nbsp;&middot;&nbsp; Open 24/7 &nbsp;&middot;&nbsp; Damage&#8209;Free Guaranteed
        </p>

        {/* CTAs — full width on mobile, side by side on sm+ */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-7 sm:mb-10 px-2 sm:px-0">
          <a
            href={PHONE_HREF}
            className="animate-pulse-cta inline-flex items-center justify-center gap-3 font-display font-black rounded-2xl shadow-2xl w-full sm:w-auto"
            style={{
              backgroundColor: C.accent, color: C.accentText,
              fontSize: 'clamp(1.2rem, 5vw, 1.4rem)',
              padding: '1.1rem 2rem',
              minHeight: '60px',
              boxShadow: '0 0 40px rgba(245,166,35,0.4)',
            }}
          >
            <PhoneIcon cls="w-6 h-6" /> Call {PHONE}
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 font-display font-bold rounded-2xl w-full sm:w-auto"
            style={{
              border: '2px solid rgba(255,255,255,0.6)', color: '#FFFFFF',
              fontSize: 'clamp(1rem, 4vw, 1.2rem)',
              padding: '1.1rem 1.75rem',
              minHeight: '60px',
            }}
          >
            See Our Services
          </a>
        </div>

        {/* Trust badges — 2×2 on mobile, row on desktop */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-3 px-2 sm:px-0">
          {[
            { icon: <StarFilled cls="w-4 h-4" />,  text: '4.6 Star Rated'   },
            { icon: <ClockIcon cls="w-4 h-4" />,   text: 'Open 24/7'        },
            { icon: <ShieldIcon cls="w-4 h-4" />,  text: 'Damage-Free'       },
            { icon: <MedalIcon cls="w-4 h-4" />,   text: 'Military Discount' },
          ].map(b => (
            <div
              key={b.text}
              className="flex items-center justify-center gap-2 rounded-full px-3 py-2 font-body font-medium text-xs sm:text-sm text-white"
              style={{ backgroundColor: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(4px)' }}
            >
              {b.icon} {b.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Trust Bar ────────────────────────────────────────────────────────────────
function TrustBar() {
  const items = [
    { icon: <BoltIcon cls="w-5 h-5 sm:w-6 sm:h-6" />,   title: 'Fast Response', sub: '30–40 Min'   },
    { icon: <ClockIcon cls="w-5 h-5 sm:w-6 sm:h-6" />,  title: 'Open',          sub: '24/7'         },
    { icon: <StarFilled cls="w-5 h-5 sm:w-6 sm:h-6" />, title: '4.6 Star',      sub: 'Rated'        },
    { icon: <MedalIcon cls="w-5 h-5 sm:w-6 sm:h-6" />,  title: 'Military',      sub: 'Discount'     },
  ]
  return (
    <div style={{ backgroundColor: C.accent }}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-5">
        <div className="grid grid-cols-4 gap-1 sm:gap-0 sm:divide-x sm:divide-black/10">
          {items.map(item => (
            <div key={item.title} className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 py-1 text-center sm:text-left">
              <span style={{ color: C.accentText }} className="flex-shrink-0">{item.icon}</span>
              <div>
                <div className="font-display font-bold leading-tight" style={{ color: C.accentText, fontSize: 'clamp(0.8rem, 3vw, 1.05rem)' }}>{item.title}</div>
                <div className="font-body" style={{ color: 'rgba(17,17,17,0.6)', fontSize: 'clamp(0.7rem, 2.5vw, 0.875rem)' }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services() {
  const [ref, visible] = useFadeUp()
  return (
    <section id="services" className="py-14 sm:py-20 px-4 sm:px-6" style={{ backgroundColor: C.bg }}>
      <div className="max-w-7xl mx-auto">
        <div ref={ref} style={fade(visible)}>
          <SectionLabel>What We Do</SectionLabel>
          <SectionHeading>Towing Services in San Diego &amp; Chula Vista</SectionHeading>
          <p className="font-body text-center max-w-2xl mx-auto mb-14" style={{ color: C.muted, fontSize: '1.05rem' }}>
            From emergency tows to specialized transport — fully insured, always reliable, 24 hours a day.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {PRIMARY_SERVICES.map((svc, i) => (
              <ServiceCard key={svc.name} svc={svc} delay={i * 80} visible={visible} />
            ))}
          </div>

          <div className="text-center">
            <div className="inline-block rounded-xl px-6 py-4 font-body text-sm" style={{ backgroundColor: C.bgAlt, border: `1px solid ${C.cardBorder}` }}>
              <span className="font-semibold" style={{ color: C.accentDark }}>Also available: </span>
              <span style={{ color: C.muted }}>RV Towing &nbsp;&middot;&nbsp; Boat Towing &nbsp;&middot;&nbsp; Bus Towing &nbsp;&middot;&nbsp; Trailer Towing &nbsp;&middot;&nbsp; Vehicle Relocation Services</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ svc, delay, visible }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-xl p-6 cursor-default"
      style={{
        backgroundColor: C.card,
        borderTop: `4px solid ${C.accent}`,
        border: `1px solid ${hovered ? C.accent : C.cardBorder}`,
        borderTopColor: C.accent,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.10)' : '0 1px 4px rgba(0,0,0,0.06)',
        opacity: visible ? 1 : 0,
        translate: visible ? '0 0' : '0 28px',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.2s ease, opacity 0.65s ease, translate 0.65s ease',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="mb-4">{svc.icon}</div>
      <h3 className="font-display font-bold text-xl mb-2" style={{ color: C.heading }}>{svc.name}</h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: C.muted }}>{svc.desc}</p>
    </div>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const [ref, visible] = useFadeUp()
  const steps = [
    { num: '01', title: `Call ${PHONE}`, href: PHONE_HREF, desc: 'Reach our dispatch team any time — 24 hours a day, 7 days a week, including all holidays.' },
    { num: '02', title: 'We Dispatch Immediately', href: null, desc: 'We identify the nearest available truck and provide you with an accurate ETA right away.' },
    { num: '03', title: 'We Arrive in 30–40 Min', href: null, desc: 'Our fully insured driver arrives and handles your vehicle with precision — damage-free, every time.' },
  ]
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6" style={{ backgroundColor: C.bgAlt }}>
      <div className="max-w-7xl mx-auto">
        <div ref={ref} style={fade(visible)}>
          <SectionLabel>Simple Process</SectionLabel>
          <SectionHeading>How Our San Diego Towing Service Works</SectionHeading>
          <div className="h-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 relative">
            <div
              className="hidden md:block absolute"
              style={{ top: '3rem', left: 'calc(16.67% + 1.5rem)', right: 'calc(16.67% + 1.5rem)', height: '2px', background: `linear-gradient(to right, rgba(245,166,35,0.15), ${C.accent}, rgba(245,166,35,0.15))` }}
            />
            {steps.map((step, i) => (
              <div key={step.num} className="text-center relative" style={fade(visible, i * 120)}>
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 relative z-10" style={{ backgroundColor: C.accent }}>
                  <span className="font-display font-black text-3xl" style={{ color: C.accentText }}>{step.num}</span>
                </div>
                <h3 className="font-display font-bold text-xl mb-3" style={{ color: C.heading }}>
                  {step.href
                    ? <a href={step.href} style={{ color: C.accentDark }} className="hover:underline">{step.title}</a>
                    : step.title}
                </h3>
                <p className="font-body text-sm leading-relaxed max-w-xs mx-auto" style={{ color: C.muted }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
function Gallery() {
  const [lbIdx, setLbIdx] = useState(null)
  const [ref, visible] = useFadeUp()

  useEffect(() => {
    if (lbIdx === null) return
    const fn = (e) => {
      if (e.key === 'Escape')     setLbIdx(null)
      if (e.key === 'ArrowRight') setLbIdx(i => Math.min(i + 1, GALLERY_IMGS.length - 1))
      if (e.key === 'ArrowLeft')  setLbIdx(i => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [lbIdx])

  useEffect(() => {
    document.body.style.overflow = lbIdx !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lbIdx])

  return (
    <section id="gallery" className="py-14 sm:py-20 px-3 sm:px-6" style={{ backgroundColor: C.bg }}>
      <div className="max-w-7xl mx-auto">
        <div ref={ref} style={fade(visible)}>
          <SectionLabel>Real Fleet, Real Team</SectionLabel>
          <SectionHeading>Our Fleet &amp; Team in Action</SectionHeading>
          <div className="h-8" />
          <div className="gallery-grid">
            {GALLERY_IMGS.map((img, i) => (
              <div
                key={i} className="gallery-item group cursor-pointer rounded-xl overflow-hidden relative"
                onClick={() => setLbIdx(i)} style={fade(visible, 30 + i * 45)}
              >
                <img
                  src={img.src} alt={img.alt} loading="lazy"
                  width={img.w} height={img.h} className="w-full h-auto block"
                  style={{ transition: 'transform 0.4s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: 'rgba(245,166,35,0.15)' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center bg-white/80">
                    <svg className="w-5 h-5" style={{ color: C.heading }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {lbIdx !== null && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fade-in" style={{ backgroundColor: 'rgba(0,0,0,0.95)' }} onClick={() => setLbIdx(null)}>
          <button className="absolute top-4 right-5 text-white text-5xl font-light leading-none z-10 hover:opacity-70" onClick={() => setLbIdx(null)}>×</button>
          {lbIdx > 0 && (
            <button className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} onClick={e => { e.stopPropagation(); setLbIdx(i => i - 1) }}>‹</button>
          )}
          <img key={lbIdx} src={GALLERY_IMGS[lbIdx].src} alt={GALLERY_IMGS[lbIdx].alt} className="max-w-full max-h-[88vh] object-contain rounded-xl animate-fade-in" style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.8)' }} onClick={e => e.stopPropagation()} />
          {lbIdx < GALLERY_IMGS.length - 1 && (
            <button className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} onClick={e => { e.stopPropagation(); setLbIdx(i => i + 1) }}>›</button>
          )}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-body text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{lbIdx + 1} / {GALLERY_IMGS.length}</div>
        </div>
      )}
    </section>
  )
}

// ─── Reviews ──────────────────────────────────────────────────────────────────
function Reviews() {
  const [ref, visible] = useFadeUp()
  return (
    <section id="reviews" className="py-14 sm:py-20 px-4 sm:px-6" style={{ backgroundColor: C.bgAlt }}>
      <div className="max-w-7xl mx-auto">
        <div ref={ref} style={fade(visible)}>
          <SectionLabel>Customer Reviews</SectionLabel>
          <SectionHeading>What San Diego Customers Say About Yadala Towing</SectionHeading>
          <p className="font-body text-center mb-12" style={{ color: C.muted }}>Real reviews from real customers across San Diego County.</p>

          <div className="reviews-scroll flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 md:overflow-visible md:grid md:grid-cols-3 md:pb-0">
            {REVIEWS_DATA.map((review, i) => (
              <ReviewCard key={review.name} review={review} delay={i * 70} visible={visible} />
            ))}
          </div>

          <div className="text-center mt-10">
            <div className="inline-flex items-center gap-4 rounded-2xl px-8 py-4" style={{ backgroundColor: C.card, border: `1px solid ${C.cardBorder}`, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div className="flex gap-0.5" style={{ color: C.accent }}>
                {[...Array(5)].map((_, i) => <StarFilled key={i} cls="w-5 h-5" />)}
              </div>
              <span className="font-display font-black text-2xl" style={{ color: C.heading }}>4.6</span>
              <span className="font-body text-sm" style={{ color: C.muted }}>on Google &amp; Yelp</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ReviewCard({ review, delay, visible }) {
  return (
    <div
      className="flex-shrink-0 w-[300px] md:w-auto snap-start flex flex-col rounded-2xl p-6"
      style={{
        backgroundColor: C.card,
        border: `1px solid ${C.cardBorder}`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        opacity: visible ? 1 : 0,
        translate: visible ? '0 0' : '0 28px',
        transition: `opacity 0.65s ease ${delay}ms, translate 0.65s ease ${delay}ms`,
      }}
    >
      <div className="flex gap-0.5 mb-3" style={{ color: C.accent }}>
        {[...Array(5)].map((_, i) => <StarFilled key={i} cls="w-4 h-4" />)}
      </div>
      <p className="font-body text-sm leading-relaxed flex-1 mb-5 italic" style={{ color: C.body }}>"{review.text}"</p>
      <div className="mt-auto pt-4" style={{ borderTop: `1px solid ${C.cardBorder}` }}>
        <div className="font-display font-bold text-sm" style={{ color: C.heading }}>{review.name}</div>
        {review.location && <div className="font-body text-xs mt-0.5" style={{ color: C.muted }}>{review.location}</div>}
        {review.date     && <div className="font-body text-xs mt-0.5" style={{ color: C.muted }}>{review.date}</div>}
      </div>
    </div>
  )
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner() {
  const [ref, visible] = useFadeUp()
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6" style={{ backgroundColor: C.accent }}>
      <div className="max-w-4xl mx-auto text-center">
        <div ref={ref} style={fade(visible)}>
          <h2 className="font-display font-black leading-tight mb-4" style={{ color: C.accentText, fontSize: 'clamp(2.2rem, 6vw, 4.5rem)' }}>
            Stranded? We're Available 24/7.
          </h2>
          <p className="font-body text-lg mb-8" style={{ color: 'rgba(17,17,17,0.65)' }}>
            Don't wait on the roadside — our nearest truck reaches you in 30–40 minutes.
          </p>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-3 font-display font-black rounded-2xl shadow-2xl transition-all duration-200 hover:scale-105 hover:-translate-y-1"
            style={{ backgroundColor: C.heading, color: '#FFFFFF', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', padding: '1.1rem 2.5rem' }}
          >
            <PhoneIcon cls="w-6 h-6" /> Call {PHONE} Now
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Footer (stays dark for contrast) ────────────────────────────────────────
const ALL_SERVICES = [
  'Car & Vehicle Towing', 'Flatbed Towing', 'Medium Duty / Truck & SUV Towing',
  'Motorcycle Towing', 'Roadside Assistance', 'Winch-Out & Recovery',
  'RV Towing', 'Trailer Towing', 'Boat Towing', 'Bus Towing', 'Vehicle Relocation Services',
]

function Footer() {
  const half = Math.ceil(ALL_SERVICES.length / 2)
  return (
    <footer style={{ backgroundColor: '#111111' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          <div>
            <img src={LOGO_URL} alt="Yadala Towing" className="h-12 w-auto mb-5" width="160" height="52" />
            <p className="font-body text-sm leading-relaxed mb-5" style={{ color: '#6B7280' }}>
              San Diego's fast, affordable towing and roadside assistance — serving Chula Vista and all of San Diego County, 24 hours a day.
            </p>
            <a href={PHONE_HREF} className="inline-flex items-center gap-2 font-display font-bold px-4 py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity" style={{ backgroundColor: C.accent, color: C.accentText }}>
              <PhoneIcon cls="w-4 h-4" /> {PHONE}
            </a>
          </div>

          <div>
            <h3 className="font-display font-bold text-white uppercase tracking-widest text-sm mb-5">Services</h3>
            <ul className="space-y-2.5">
              {ALL_SERVICES.slice(0, half).map(s => <li key={s} className="font-body text-sm" style={{ color: '#6B7280' }}>{s}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-white uppercase tracking-widest text-sm mb-5 invisible">Services</h3>
            <ul className="space-y-2.5">
              {ALL_SERVICES.slice(half).map(s => <li key={s} className="font-body text-sm" style={{ color: '#6B7280' }}>{s}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-white uppercase tracking-widest text-sm mb-5">Contact &amp; Location</h3>
            <address className="not-italic space-y-3 mb-5">
              <p className="flex items-start gap-2 font-body text-sm" style={{ color: '#6B7280' }}>
                <MapPinIcon cls="w-4 h-4 flex-shrink-0 mt-0.5" /> 3487 Main St<br />Chula Vista, CA 91911
              </p>
              <p>
                <a href={PHONE_HREF} className="flex items-center gap-2 font-body text-sm hover:underline" style={{ color: C.accent }}>
                  <PhoneIcon cls="w-4 h-4" /> {PHONE}
                </a>
              </p>
              <p className="flex items-center gap-2 font-body text-sm" style={{ color: '#6B7280' }}>
                <ClockIcon cls="w-4 h-4 flex-shrink-0" /> Open 24 Hours, 7 Days a Week
              </p>
            </address>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <iframe
                title="Yadala Towing location"
                src="https://maps.google.com/maps?q=3487+Main+St+Chula+Vista+CA+91911&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" height="180"
                style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="font-body text-sm" style={{ color: '#4B5563' }}>© 2025 Yadala Towing. All rights reserved.</p>
          <p className="font-body text-sm" style={{ color: '#4B5563' }}>Serving San Diego County 24/7 &nbsp;&middot;&nbsp; Chula Vista, CA 91911</p>
        </div>
      </div>
    </footer>
  )
}

// ─── Mobile Sticky Bottom Bar ─────────────────────────────────────────────────
function MobileBottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40" style={{ boxShadow: '0 -4px 24px rgba(0,0,0,0.18)' }}>
      <a
        href={PHONE_HREF}
        className="mobile-bar-safe flex items-center justify-center gap-3 w-full font-display font-black"
        style={{
          backgroundColor: C.accent,
          color: C.accentText,
          fontSize: 'clamp(1.1rem, 5vw, 1.3rem)',
          paddingTop: '1rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          minHeight: '64px',
        }}
      >
        <PhoneIcon cls="w-6 h-6 flex-shrink-0" />
        <span>Tap to Call: {PHONE}</span>
      </a>
    </div>
  )
}

// ─── Chat Widget ──────────────────────────────────────────────────────────────
const INITIAL_MSG = {
  role: 'assistant',
  content: "Hi! I'm Yadala Towing's virtual assistant. Ask me anything — services, pricing, availability, service area. If you need help right now, call us at (619) 480-5324.",
}

function ChatWidget() {
  const [open, setOpen]       = useState(false)
  const [messages, setMessages] = useState([INITIAL_MSG])
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 150) }, [open])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const userMsg = { role: 'user', content: text }
    const next = [...messages, userMsg]
    setMessages(next)
    setLoading(true)

    const apiMessages = next
      .slice(messages[0] === INITIAL_MSG ? 1 : 0)
      .map(m => ({ role: m.role, content: m.content }))

    try {
      const res  = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: apiMessages }) })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.content || data.error || 'Something went wrong. Please call us at (619) 480-5324.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please call us directly at (619) 480-5324.' }])
    } finally {
      setLoading(false)
    }
  }

  const onKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }

  return (
    <>
      {/* Chat panel */}
      <div
        className="chat-panel-wrap fixed z-50 flex flex-col"
        style={{
          bottom: '5.5rem', right: '1.25rem',
          width: 'min(380px, calc(100vw - 2rem))', height: '520px',
          borderRadius: '1.25rem',
          backgroundColor: '#111111',
          border: '1px solid rgba(245,166,35,0.3)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transform: open ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.97)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
          transformOrigin: 'bottom right',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#1C1C1C', borderRadius: '1.25rem 1.25rem 0 0' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: C.accent }}>
              <ChatIcon cls="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-white text-sm leading-tight">Yadala Towing Assistant</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                <span className="font-body text-xs" style={{ color: '#9CA3AF' }}>Online now</span>
              </div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="p-1 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors">
            <XIcon cls="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: 'thin' }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className="font-body text-sm leading-relaxed max-w-[85%] px-4 py-2.5 rounded-2xl"
                style={msg.role === 'user'
                  ? { backgroundColor: C.accent, color: C.accentText, borderBottomRightRadius: '0.25rem' }
                  : { backgroundColor: '#1C1C1C', color: '#E5E7EB', borderBottomLeftRadius: '0.25rem', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl" style={{ backgroundColor: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)', borderBottomLeftRadius: '0.25rem' }}>
                {[0, 150, 300].map(d => (
                  <span key={d} className="w-2 h-2 rounded-full" style={{ backgroundColor: C.accent, animation: `chatbounce 1s ease-in-out ${d}ms infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex-shrink-0 px-4 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-end gap-2 rounded-xl px-4 py-2.5" style={{ backgroundColor: '#1C1C1C', border: '1px solid rgba(255,255,255,0.1)' }}>
            <textarea
              ref={inputRef} value={input}
              onChange={e => setInput(e.target.value)} onKeyDown={onKey}
              placeholder="Ask about services, pricing, availability..."
              rows={1} className="flex-1 bg-transparent font-body text-white placeholder-gray-600 resize-none focus:outline-none"
              style={{ fontSize: '16px', maxHeight: '80px', lineHeight: '1.5' }}
            />
            <button
              onClick={send} disabled={!input.trim() || loading}
              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-40"
              style={{ backgroundColor: input.trim() && !loading ? C.accent : 'transparent', color: input.trim() && !loading ? C.accentText : '#6B7280' }}
            >
              <SendIcon cls="w-4 h-4" />
            </button>
          </div>
          <p className="font-body text-xs text-center mt-2" style={{ color: '#4B5563' }}>
            Need immediate help? <a href={PHONE_HREF} className="hover:underline" style={{ color: C.accent }}>Call {PHONE}</a>
          </p>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : 'Open chat assistant'}
        className="chat-toggle-btn fixed z-50 flex items-center gap-2.5 font-display font-bold text-sm rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          bottom: '1.25rem', right: '1.25rem',
          backgroundColor: open ? '#1C1C1C' : C.accent,
          color: open ? C.accent : C.accentText,
          border: open ? `1px solid rgba(245,166,35,0.4)` : 'none',
          padding: '0.75rem 1.25rem',
          boxShadow: open ? 'none' : `0 8px 30px rgba(245,166,35,0.35)`,
        }}
      >
        {open ? <><XIcon cls="w-5 h-5" /> Close</> : <><ChatIcon cls="w-5 h-5" /> Ask a Question</>}
      </button>

      <style>{`@keyframes chatbounce { 0%,100%{transform:translateY(0);opacity:.5} 50%{transform:translateY(-4px);opacity:1} }`}</style>
    </>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="font-body" style={{ backgroundColor: C.bg, color: C.heading }}>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <HowItWorks />
        <Gallery />
        <Reviews />
        <CTABanner />
      </main>
      <Footer />
      <MobileBottomBar />
      <ChatWidget />
    </div>
  )
}
