"use client";

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import hackLogo from '../assets/hack-2027-logo.webp'
import simatsLogo from '../assets/simats-engineering-logo.webp'
import type { CommitteeMemberData } from '../page'
import { ScrollProgress } from './ScrollProgress'
import { CautionTape } from './CautionTape'
import { PlatformPartner } from './PlatformPartner'
import { REGISTRATION } from '@/lib/registration-config'

const CustomCursor = dynamic(
  () => import('./CustomCursor').then((m) => m.CustomCursor),
  { ssr: false }
)
const BinaryBackground = dynamic(
  () => import('./BinaryBackground').then((m) => m.BinaryBackground),
  { ssr: false }
)
const CommitteeEditModal = dynamic(
  () => import('./CommitteeEditModal').then((m) => m.CommitteeEditModal),
  { ssr: false }
)

// Edit official event details and links here as they are confirmed.
const eventConfig = {
  eventDate: '2027-02-20T00:00:00+05:30',
  registrationStatus: 'Coming Soon' as 'Coming Soon' | 'Open' | 'Closed',
  registrationUrl: REGISTRATION.url,
  email: 'Simatshack2027@gmail.com',
  instagramUrl: 'https://www.instagram.com/hack2027_simats?mdxt=MWZ5cHF2cXBkcWx2cg==',
  whatsappUrl: 'https://chat.whatsapp.com/FhHEM1K3y5125qcIR1ulEa',
  linkedinUrl: '',
  phone: '',
}

const navItems = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Domains', 'domains'],
  ['Timeline', 'timeline'],
  ['Prizes', 'prizes'],
  ['Organizing Team', 'team'],
  ['Contact', 'contact'],
] as const

const features = [
  [
    '01',
    '24 Hours of Innovation',
    'A focused sprint designed to turn ambitious ideas into working solutions.',
    'bolt',
  ],
  [
    '02',
    'Team Collaboration',
    'Build alongside developers, designers and fearless problem-solvers.',
    'users',
  ],
  [
    '03',
    'Rapid Prototyping',
    'Build, test and iterate functional solutions to solve real-world challenges.',
    'terminal',
  ],
  [
    '04',
    'Innovation & Recognition',
    'Present bold thinking and celebrate meaningful technical execution.',
    'spark',
  ],
]

const domains = [
  [
    'Web Development',
    'Create fast, accessible and transformative experiences for the open web.',
    'code',
  ],
  ['App Development', 'Design powerful mobile products for people on the move.', 'phone'],
  [
    'Cybersecurity',
    'Protect systems, identities and data in an increasingly connected world.',
    'shield',
  ],
  [
    'Blockchain Technology',
    'Explore trusted, transparent and decentralized digital systems.',
    'blocks',
  ],
  [
    'Open Innovation',
    'Bring an original challenge and build beyond conventional boundaries.',
    'orbit',
  ],
]

const committee = [
  {
    name: 'ARSHATH ALI A',
    designation: 'Chief Organizer & Event Director',
    photo: '/uploads/committee/arshath-ali-chief-organizer.webp',
    linkedinUrl: 'https://www.linkedin.com/in/arshath-ali-53b9a3416/',
    instagramUrl: 'https://www.instagram.com/arshhhh._.04/',
    githubUrl: null,
  },
  {
    name: 'KAREEMULLAH AR',
    designation: 'Chief Event Coordinator',
    photo:
      '/uploads/committee/WhatsApp_Image_2026-11-16_at_8_03_35_PM_1794840105527.webp',
    linkedinUrl: null,
    instagramUrl: null,
    githubUrl: null,
  },
  {
    name: 'VISWAJITH K',
    designation: 'Technical Head',
    photo:
      '/uploads/committee/WhatsApp_Image_2026-11-16_at_8_36_40_PM_1794841639578.webp',
    linkedinUrl: null,
    instagramUrl: null,
    githubUrl: null,
  },
  {
    name: 'RESHEKESH B',
    designation: 'Registration & Participant Coordinator',
    photo:
      '/uploads/committee/WhatsApp_Image_2026-11-16_at_11_51_56_AM_1794841777402.webp',
    linkedinUrl: 'https://www.linkedin.com/in/reshekesh-b-b79a84387/',
    instagramUrl: null,
    githubUrl: null,
  },
  {
    name: 'SUDHARSHSHINI R',
    designation: 'Media & Public Relations Head',
    photo:
      '/uploads/committee/WhatsApp_Image_2026-11-16_at_8_50_10_PM_1794842437602.webp',
    linkedinUrl:
      'https://www.linkedin.com/in/sudharshshini-r-5979b73a0?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    instagramUrl: 'https://www.instagram.com/ohhhellnawwww?xtok=dGJ6NWkyOW44dG44',
    githubUrl: null,
  },
  {
    name: 'KEERTHANA R',
    designation: 'Sponsorship & Partnership Coordinator',
    photo: '/uploads/committee/keerthana-r.webp',
    linkedinUrl: null,
    instagramUrl: null,
    githubUrl: null,
  },
  {
    name: 'ANURUPA T',
    designation: 'Hospitality & Accommodation Coordinator',
    photo:
      '/uploads/committee/WhatsApp_Image_2026-11-16_at_8_38_28_PM_1794841727157.webp',
    linkedinUrl: null,
    instagramUrl: null,
    githubUrl: null,
  },
  {
    name: 'C RAKSHITHA',
    designation: 'Documentation & Certificate Coordinator',
    photo: null,
    linkedinUrl: null,
    instagramUrl: null,
    githubUrl: null,
  },
  {
    name: 'DHAVAJ JAIN',
    designation: 'PR Head',
    photo: '/uploads/committee/dhavaj-jain.webp',
    linkedinUrl: null,
    instagramUrl: null,
    githubUrl: null,
  },
  {
    name: '',
    designation: '',
    photo: null,
    linkedinUrl: null,
    instagramUrl: null,
    githubUrl: null,
  },
]

const techSkills = [
  ['HTML', 'code'],
  ['CSS', 'spark'],
  ['JavaScript', 'blocks'],
  ['Python', 'terminal'],
  ['Java', 'bolt'],
  ['React', 'orbit'],
  ['Node.js', 'signal'],
  ['SQL', 'database'],
  ['Git & GitHub', 'git'],
  ['Cloud Computing', 'cloud'],
  ['Cybersecurity', 'shield'],
]

const timeline = [
  {
    title: 'Registration Opens',
    date: 'December 1, 2026',
    description: 'Online registration begins through Devfolio.',
  },
  {
    title: 'Problem Statement Release',
    date: 'January 1, 2027',
    description: 'Official problem statements are released.',
  },
  {
    title: 'Round 1: Online PPT Submission',
    date: 'January 1–20, 2027',
    description:
      'Participants submit their idea presentation online through Devfolio. This is an ONLINE ROUND. No physical attendance is required for Round 1.',
    badge: 'ONLINE ROUND',
  },
  {
    title: 'Shortlisted Teams Announcement',
    date: 'January 25, 2027',
    description:
      'Shortlisted teams are announced. Only selected teams qualify for the offline hackathon.',
  },
  {
    title: 'Opening Ceremony',
    date: 'February 20, 2027',
    description: 'Official inauguration for shortlisted participants.',
  },
  {
    title: 'Offline Hackathon Begins',
    date: 'February 20, 2027',
    description: 'The 24-hour offline hackathon begins at SIMATS Engineering.',
  },
  {
    title: 'Hackathon Ends',
    date: 'February 21, 2027',
    description: 'Final project submissions by participating teams.',
  },
  {
    title: 'Final Evaluation & Winner Announcement',
    date: 'February 21, 2027',
    description: 'Final evaluation and winner announcement.',
  },
]

const rules = [
  'Eligibility Criteria',
  'Team Formation',
  'Team Size',
  'Registration Rules',
  'Project Development',
  'Submission Guidelines',
  'Judging Criteria',
  'Code of Conduct',
]

const faqs = [
  {
    question: 'What is HACK 2027?',
    answer:
      'HACK.2027 is a premier 24-hour national-level hackathon bringing together brilliant student developers, designers, and innovators to build disruptive tech solutions and functional prototypes for real-world challenge statements.',
  },
  {
    question: 'Who can participate?',
    answer:
      'The hackathon is open to all undergraduate and postgraduate students from engineering, science, and technology disciplines who are passionate about coding, design, and problem-solving.',
  },
  {
    question: 'Is this a 24-hour hackathon?',
    answer:
      'Yes! HACK.2027 is an intensive, non-stop 24-hour coding and prototyping sprint where teams race against the clock to build their solutions.',
  },
  {
    question: 'How do I register?',
    answer: 'You can register your team online through our Devfolio Page.',
  },
  {
    question: 'Can students from different colleges participate?',
    answer:
      'Yes, cross-institutional teams are welcome. Team members can be from different colleges, universities, or degree programs.',
  },
  {
    question: 'What is the team size?',
    answer: 'Teams can consist of 2 to 4 members.',
  },
  {
    question: 'What should participants bring?',
    answer: 'Participants must bring their own laptops, chargers, extension box,college ID card.',
  },
  {
    question: 'Will accommodation be provided?',
    answer:
      'Yes, overnight accommodation and resting spaces will be provided on campus for out-of-station participants during the duration of the hackathon.',
  },
  {
    question: 'How will projects be evaluated?',
    answer:
      'Projects will be judged by a panel of industry experts and faculty mentors based on four core pillars: Innovation & Uniqueness, Technical Execution & Working Prototype, Impact & Feasibility, and the Final Presentation/Pitch.',
  },
  {
    question: 'Will certificates be provided?',
    answer:
      'Yes! All participants who successfully submit a completed project will receive digital certificates of participation. Finalists and winning teams will receive special certificates of excellence alongside exciting prizes.',
  },
]

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),
    bolt: <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" />,
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    compass: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m16 8-2.7 5.3L8 16l2.7-5.3L16 8Z" />
      </>
    ),
    spark: (
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />
    ),
    brain: (
      <>
        <path d="M9.5 4.5A3 3 0 0 0 4 6a3 3 0 0 0 0 6 3 3 0 0 0 2 5.8V19a2 2 0 0 0 4 0V5.5a2 2 0 0 0-.5-1Z" />
        <path d="M14.5 4.5A3 3 0 0 1 20 6a3 3 0 0 1 0 6 3 3 0 0 1-2 5.8V19a2 2 0 0 1-4 0V5.5a2 2 0 0 1 .5-1Z" />
      </>
    ),
    code: (
      <>
        <path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
      </>
    ),
    phone: (
      <>
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <path d="M10 18h4" />
      </>
    ),
    shield: <path d="M12 22s8-3.8 8-10V5l-8-3-8 3v7c0 6.2 8 10 8 10Zm-3-10 2 2 4-4" />,
    signal: (
      <>
        <path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" />
        <circle cx="12" cy="20" r="1" />
      </>
    ),
    blocks: (
      <>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="8.5" y="14" width="7" height="7" />
        <path d="M10 6.5h4M6.5 10v3.5m11-3.5v3.5" />
      </>
    ),
    orbit: (
      <>
        <circle cx="12" cy="12" r="2" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(45 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-45 12 12)" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    chevron: <path d="m6 9 6 6 6-6" />,
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    trophy: (
      <>
        <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
        <path d="M8 6H4v1a4 4 0 0 0 4 4m8-5h4v1a4 4 0 0 1-4 4M12 13v5m-4 2h8" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" />
      </>
    ),
    message: (
      <>
        <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5Z" />
      </>
    ),
    linkedin: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 11v6M8 8v.1M12 17v-6m0 3a3 3 0 0 1 6 0v3" />
      </>
    ),
    github: (
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4M9 18c-4.51 2-5-2-7-2" />
    ),
    terminal: (
      <>
        <path d="m5 7 4 5-4 5M11 17h8" />
        <rect x="2.5" y="3.5" width="19" height="17" rx="2" />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" />
      </>
    ),
    git: (
      <>
        <circle cx="6" cy="5" r="2" />
        <circle cx="18" cy="7" r="2" />
        <circle cx="8" cy="19" r="2" />
        <path d="M6 7v3a4 4 0 0 0 4 4h2a6 6 0 0 0 6-5M8 17v-3" />
      </>
    ),
    cloud: <path d="M7 18h11a4 4 0 0 0 .5-8A7 7 0 0 0 5 9a4.5 4.5 0 0 0 2 9Z" />,
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.spark}
    </svg>
  )
}

function SectionHeader({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string
  title: string
  copy?: string
}) {
  return (
    <div className="section-head reveal">
      <span className="eyebrow">
        <i />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}

function Accordion({
  items,
  type,
}: {
  items: string[] | { question: string; answer: string }[]
  type: 'rule' | 'faq'
}) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className={`accordion ${type === 'faq' ? 'faq-accordion' : ''}`}>
      {items.map((item, index) => {
        const question = typeof item === 'string' ? item : item.question
        const answer =
          typeof item === 'string'
            ? 'Official details will be published here once confirmed by the organizing team.'
            : item.answer
        const buttonId = `${type}-question-${index + 1}`
        const answerId = `${type}-answer-${index + 1}`
        return (
          <div className={`accordion-item ${open === index ? 'open' : ''}`} key={question}>
            <button
              id={buttonId}
              type="button"
              onClick={() => setOpen(open === index ? null : index)}
              aria-expanded={open === index}
              aria-controls={answerId}
            >
              <span>
                <b>{String(index + 1).padStart(2, '0')}</b>
                {question}
              </span>
              <i>
                <Icon name={type === 'faq' ? 'chevron' : 'plus'} size={18} />
              </i>
            </button>
            <div
              className="accordion-answer"
              id={answerId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={open !== index}
            >
              <p>{answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ActionLink({
  href,
  children,
  className = '',
  ariaLabel,
}: {
  href: string
  children: ReactNode
  className?: string
  ariaLabel?: string
}) {
  if (!href)
    return (
      <button
        className={`${className} is-disabled`}
        disabled
        title="Link will be added when confirmed"
        aria-label={ariaLabel}
      >
        {children}
      </button>
    )
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
    >
      {children}
    </a>
  )
}

export function Hack2027App({
  committeeMembers: cmsMembers,
}: {
  committeeMembers?: CommitteeMemberData[]
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [loaded, setLoaded] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [liveMembers, setLiveMembers] = useState<CommitteeMemberData[]>(cmsMembers || [])

  // Owner authentication & direct editing state
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState(false)
  const [editingMember, setEditingMember] = useState<Partial<CommitteeMemberData> | null>(null)
  const [isNewMemberModal, setIsNewMemberModal] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Check owner session on mount
  useEffect(() => {
    fetch('/api/committee/auth/check')
      .then((res) => res.json())
      .then((data) => {
        if (data?.authenticated) {
          setIsOwnerAuthenticated(true)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (cmsMembers && cmsMembers.length > 0) {
      setLiveMembers(cmsMembers)
    }
  }, [cmsMembers])

  const [countdown, setCountdown] = useState({
    days: '--',
    hours: '--',
    minutes: '--',
    seconds: '--',
  })

  const [isRegistrationOpen, setIsRegistrationOpen] = useState(
    () => new Date() >= REGISTRATION.openDate,
  )

  useEffect(() => {
    if (isRegistrationOpen) return
    const checkOpen = () => {
      if (new Date() >= REGISTRATION.openDate) {
        setIsRegistrationOpen(true)
      }
    }
    const timer = window.setInterval(checkOpen, 1000)
    return () => clearInterval(timer)
  }, [isRegistrationOpen])

  const registrationLabel = isRegistrationOpen ? 'REGISTER NOW' : 'REGISTRATION OPENS DECEMBER 1'
  const registrationStatus = isRegistrationOpen ? 'REGISTRATION OPEN' : 'COMING SOON'

  useEffect(() => {
    const loadTimer = window.setTimeout(() => setLoaded(true), 900)
    let scrollTicking = false
    const onScroll = () => {
      if (!scrollTicking) {
        scrollTicking = true
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY
          setScrolled(scrollY > 30)
          setShowTop(scrollY > 700)
          const sections = navItems
            .map(([, id]) => document.getElementById(id))
            .filter(Boolean) as HTMLElement[]
          const current = [...sections]
            .reverse()
            .find((section) => section.getBoundingClientRect().top <= 180)
          if (current) setActive(current.id)
          scrollTicking = false
        })
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        }),
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => {
      clearTimeout(loadTimer)
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!eventConfig.eventDate) return
    const update = () => {
      const distance = Math.max(0, new Date(eventConfig.eventDate!).getTime() - Date.now())
      setCountdown({
        days: String(Math.floor(distance / 86400000)).padStart(2, '0'),
        hours: String(Math.floor(distance / 3600000) % 24).padStart(2, '0'),
        minutes: String(Math.floor(distance / 60000) % 60).padStart(2, '0'),
        seconds: String(Math.floor(distance / 1000) % 60).padStart(2, '0'),
      })
    }
    update()
    const timer = window.setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [])

  const prizeCards = useMemo(
    () => [
      ['SECOND PRIZE', '02', 'silver'],
      ['FIRST PRIZE', '01', 'gold'],
      ['THIRD PRIZE', '03', 'bronze'],
    ],
    [],
  )

  // Merge live/CMS committee members with static fallback data.
  const displayCommittee = useMemo(() => {
    if (liveMembers && liveMembers.length > 0) {
      const regular = liveMembers.filter((m) => !m.isFaculty)
      const faculty = liveMembers.filter((m) => m.isFaculty)
      return { regular, faculty }
    }
    // Fallback to static data
    const regular = committee.map((m, i) => ({
      id: `member-${i + 1}`,
      name: m.name,
      designation: m.designation,
      photoUrl: m.photo,
      linkedinUrl: m.linkedinUrl,
      instagramUrl: m.instagramUrl,
      githubUrl: m.githubUrl || null,
      isFaculty: false,
      sortOrder: i + 1,
      isActive: true,
    }))
    const faculty: CommitteeMemberData[] = [
      {
        id: 'faculty-1',
        name: 'DR. JOTHI ARUNACHALAM',
        designation: 'Faculty In-Charge',
        photoUrl:
          '/uploads/committee/WhatsApp_Image_2026-11-16_at_12_04_01_PM_1794841881836.webp',
        linkedinUrl: null,
        instagramUrl: null,
        githubUrl: null,
        isFaculty: true,
        sortOrder: 99,
        isActive: true,
      },
    ]
    return { regular, faculty }
  }, [liveMembers])

  return (
    <div className="site-shell">
      <ScrollProgress />
      <CustomCursor />
      <BinaryBackground />

      <div className={`loader ${loaded ? 'loaded' : ''}`}>
        <img src={hackLogo.src} alt="" width={410} height={205} />
        <span />
      </div>

      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a className="nav-logo" href="#home" aria-label="HACK 2027 home">
          <img src={hackLogo.src} alt="HACK 2027" width={235} height={78} />
        </a>
        <nav className={menuOpen ? 'open' : ''} aria-label="Primary navigation">
          {navItems.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href={REGISTRATION.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-menu-register"
            onClick={() => setMenuOpen(false)}
          >
            REGISTER NOW <span className="cta-arrow">↗</span>
          </a>
        </nav>
        <div className="nav-cta-wrap">
          <a href={REGISTRATION.url} target="_blank" rel="noopener noreferrer" className="button button-nav">
            REGISTER NOW <span className="cta-arrow">↗</span>
          </a>
        </div>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="grid-bg" />
          <div className="hero-lines">
            <i />
            <i />
            <i />
          </div>
          <div className="hero-content">
            <div className="hero-kicker">
              <span>24-HOUR HACKATHON</span>
              <span className="pulse">
                <i /> {registrationStatus}
              </span>
            </div>
            <div className="hero-brand">
              <div className="hero-logo-container">
                <div className="hero-logo-glow" aria-hidden="true" />
                <img
                  className="hero-logo"
                  src={hackLogo.src}
                  alt="HACK 2027"
                  width={412}
                  height={206}
                  fetchPriority="high"
                  decoding="sync"
                />
              </div>
            </div>
            <h1>
              <span>INNOVATE. BUILD.</span>
              <em>BREAK LIMITS.</em>
            </h1>
            <p>
              24 Hours. Limitless Innovation.
              <br className="mobile-only" /> One Platform to Build the Future.
            </p>
            <div className="countdown" aria-label="Event countdown">
              {Object.entries(countdown).map(([label, value]) => (
                <div key={label}>
                  <strong className="countdown-num">{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            {!eventConfig.eventDate && <div className="date-note">EVENT DATE TO BE ANNOUNCED</div>}
            {eventConfig.eventDate && (
              <div className="date-note">
                FEBRUARY 20–21, 2027 &nbsp;·&nbsp; <span style={{ color: '#facc15' }}>TENTATIVE DATE</span>
              </div>
            )}
            <div className="hero-actions">
              <a className="button" href={REGISTRATION.url} target="_blank" rel="noopener noreferrer">
                {registrationLabel} <Icon name="arrow" size={18} />
              </a>
              <a className="button button-ghost" href="#about">
                Explore Event <span>↓</span>
              </a>
            </div>
          </div>
          <CautionTape />
          <div className="scroll-cue">
            <span>SCROLL TO EXPLORE</span>
            <i />
          </div>
        </section>

        <section className="institution">
          <div className="institution-inner reveal">
            <div className="institution-copy">
              <span>ORGANIZING INSTITUTION</span>
              <h2>ORGANIZED BY</h2>
              <p>Department of Smart Materials · SIMATS Engineering</p>
            </div>
            <div className="simats-wrap">
              <img
                src={simatsLogo.src}
                alt="SIMATS Engineering – Engineer to Excel"
                width={450}
                height={150}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section id="about" className="section about">
          <SectionHeader
            eyebrow="About the event"
            title="MORE THAN JUST A HACKATHON."
            copy="HACK 2027 brings together passionate developers, designers, innovators and problem-solvers for an intensive 24-hour innovation experience. Collaborate with talented minds, develop creative solutions and transform ideas into impactful technology."
          />
          <div className="feature-grid">
            {features.map(([number, title, copy, icon]) => (
              <article className="feature-card reveal" key={number}>
                <div className="card-top">
                  <span>{number}</span>
                  <i>
                    <Icon name={icon} />
                  </i>
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
                <div className="card-line" />
              </article>
            ))}
          </div>
        </section>

        <section className="section highlights">
          <SectionHeader
            eyebrow="Event highlights"
            title="THE EXPERIENCE. THE CHALLENGE. THE INNOVATION."
          />
          <div className="stats-grid reveal">
            {[
              ['24', 'HOURS', 'clock'],
              ['05', 'DOMAINS', 'orbit'],
              ['TEAM', 'BASED INNOVATION', 'users'],
              ['TBA', 'EXCITING REWARDS', 'trophy'],
            ].map(([value, label, icon]) => (
              <div className="stat" key={label}>
                <Icon name={icon} size={26} />
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <p className="data-note">
            Confirmed details and statistics will be updated by the organizing team.
          </p>
        </section>

        <section id="domains" className="section domains">
          <SectionHeader
            eyebrow="Innovation tracks"
            title="CHOOSE YOUR BATTLEFIELD."
            copy="Five directions. One relentless goal: build something that matters."
          />
          <div className="domain-grid">
            {domains.map(([title, copy, icon], index) => (
              <article className="domain-card reveal" key={title}>
                <span className="domain-number">0{index + 1}</span>
                <div className="domain-icon">
                  <Icon name={icon} size={29} />
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
                <button>
                  Explore Domain <Icon name="arrow" size={18} />
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="section tech-section">
          <SectionHeader
            eyebrow="Technical toolkit"
            title="TECH SKILLS & TECHNOLOGIES"
            copy="Explore the technologies that can help turn an ambitious idea into a working solution."
          />
          <div className="tech-grid">
            {techSkills.map(([skill, icon], index) => (
              <article className="tech-card reveal" key={skill}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <i>
                  <Icon name={icon} size={25} />
                </i>
                <h3>{skill}</h3>
              </article>
            ))}
          </div>
          <p className="tech-note">
            Technology skills are separate from the five official hackathon domains.
          </p>
        </section>

        <section id="timeline" className="section timeline-section">
          <SectionHeader
            eyebrow="Road to HACK 2027"
            title="24 HOURS. ONE JOURNEY."
            copy="TENTATIVE SCHEDULE — Dates may change. Follow our socials for updates."
          />
          <div
            className="timeline-notice reveal"
            style={{
              maxWidth: 900,
              margin: '0 auto 36px',
              padding: '16px 22px',
              border: '1.5px solid #FFD600',
              borderRadius: 8,
              background: 'rgba(255, 214, 0, 0.08)',
              color: '#FFFFFF',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.92rem',
              lineHeight: 1.6,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 14,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '3px 9px',
                background: '#FFD600',
                color: '#050505',
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                borderRadius: 4,
                whiteSpace: 'nowrap',
                marginTop: 2,
              }}
            >
              IMPORTANT
            </span>
            <span>
              <strong>Round 1 is conducted entirely online through Devfolio.</strong> Only
              shortlisted teams announced on <strong>January 25, 2027</strong>, will be eligible to
              participate in the offline hackathon on <strong>February 20–21, 2027</strong>.
            </span>
          </div>
          <div className="timeline">
            {timeline.map((item, index) => (
              <div className="timeline-item reveal" key={item.title}>
                <div className="timeline-marker">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="timeline-card">
                  <span>{item.date}</span>
                  {item.badge && (
                    <span style={{ display: 'inline-block', marginLeft: 8, padding: '2px 8px', background: '#facc15', color: '#000', fontSize: '0.7rem', fontWeight: 700, borderRadius: 4, letterSpacing: '0.05em' }}>
                      {item.badge}
                    </span>
                  )}
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="prizes" className="section prizes">
          <SectionHeader
            eyebrow="Prizes & rewards"
            title="YOUR INNOVATION DESERVES RECOGNITION."
            copy="Recognition designed to celebrate the strongest ideas, execution and impact."
          />
          <div className="prize-grid">
            {prizeCards.map(([title, rank, tone]) => (
              <article className={`prize-card ${tone} reveal`} key={title}>
                <span className="prize-rank">{rank}</span>
                <Icon name="trophy" size={40} />
                <h3>{title}</h3>
                <strong>PRIZE VALUE — TBA</strong>
                <ul>
                  <li>
                    <Icon name="check" size={15} /> Cash Prize — TBA
                  </li>
                  <li>
                    <Icon name="check" size={15} /> Goodies — TBA
                  </li>
                  <li>
                    <Icon name="check" size={15} /> Certificates
                  </li>
                  <li>
                    <Icon name="check" size={15} /> Special Recognition — TBA
                  </li>
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section participate">
          <SectionHeader eyebrow="How to participate" title="YOUR JOURNEY STARTS HERE." />
          <div className="steps">
            {[
              ['REGISTER', 'Complete the online registration.'],
              ['BUILD YOUR TEAM', 'Form your team according to official guidelines.'],
              ['CHOOSE YOUR DOMAIN', 'Select your preferred innovation domain.'],
              ['BUILD & COMPETE', 'Bring your ideas to life in 24 hours.'],
            ].map(([title, copy], index) => (
              <div className="step reveal" key={title}>
                <span>STEP {String(index + 1).padStart(2, '0')}</span>
                <i>{index + 1}</i>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
          <a href={REGISTRATION.url} target="_blank" rel="noopener noreferrer" className="button journey-cta">
            {registrationLabel} <Icon name="arrow" size={18} />
          </a>
        </section>

        <section id="registration" className="registration section">
          <div className="registration-panel reveal">
            <div className="registration-copy">
              <span className="eyebrow">
                <i />
                Registration portal
              </span>
              <div className="status">
                <i />
                {registrationStatus}
              </div>
              <h2>
                READY TO BUILD
                <br />
                THE <em>FUTURE?</em>
              </h2>
              <p>
                {isRegistrationOpen
                  ? 'Register your team now on Devfolio to participate in HACK 2027.'
                  : 'Registration opens December 1, 2026. Get your team ready!'}
              </p>
              <a href={REGISTRATION.url} target="_blank" rel="noopener noreferrer" className="button">
                {registrationLabel} <Icon name="arrow" size={18} />
              </a>
            </div>
            <div className="registration-info">
              {[
                ['ELIGIBILITY', 'Open to all undergraduate and postgraduate students'],
                ['TEAM SIZE', '2 to 4 members per team'],
                ['REGISTRATION', isRegistrationOpen ? 'Register on Devfolio' : 'Opens December 1, 2026'],
              ].map(([title, copy]) => (
                <div key={title}>
                  <Icon name="check" />
                  <span>
                    <b>{title}</b>
                    {copy}
                  </span>
                </div>
              ))}
              <small>No application is submitted on this website.</small>
            </div>
          </div>
        </section>

        <section id="guidelines" className="section rules-section">
          <SectionHeader
            eyebrow="Rules & guidelines"
            title="KNOW THE RULES. PLAY FAIR."
            copy="Official event policies will be added here as they are approved."
          />
          <Accordion items={rules} type="rule" />
        </section>

        <section className="section judging">
          <SectionHeader
            eyebrow="Evaluation framework"
            title="IDEAS ARE NOTHING WITHOUT EXECUTION."
          />
          <div className="judging-grid">
            {[
              'Innovation & Creativity',
              'Technical Implementation',
              'Problem Relevance',
              'Practical Feasibility',
              'Presentation & Demonstration',
            ].map((title, index) => (
              <article className="judge-card reveal" key={title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>Weightage — To be confirmed</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <PlatformPartner />

        <section className="section sponsors">
          <SectionHeader
            eyebrow="Sponsors & partners"
            title="POWERING THE NEXT GENERATION OF INNOVATION."
          />
          <div className="sponsor-grid">
            {[
              'Title Sponsor',
              'Gold Sponsor',
              'Technology Partner',
              'Community Partner',
              'Media Partner',
            ].map((title) => (
              <a
                className="sponsor-slot reveal"
                href="mailto:Simatshack2027@gmail.com?subject=HACK%202027%20Sponsorship%20Enquiry"
                aria-label={`Enquire about becoming a ${title} for HACK 2027`}
                key={title}
              >
                <span>{title}</span>
                <div>
                  <Icon name="plus" />
                  <b>PARTNER LOGO</b>
                  <small>COMING SOON</small>
                  <small className="sponsor-enquiry">Enquire Now</small>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="faq" className="section faq-section">
          <SectionHeader eyebrow="Frequently asked" title="GOT QUESTIONS? WE HAVE ANSWERS." />
          <Accordion items={faqs} type="faq" />
        </section>

        <section className="section department-section">
          <div className="department-panel reveal">
            <div className="department-logo">
              <img
                src={simatsLogo.src}
                alt="SIMATS Engineering"
                width={300}
                height={100}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="department-copy">
              <span className="eyebrow">
                <i />
                Organizing department
              </span>
              <h2>
                DEPARTMENT OF
                <br />
                <em>SMART MATERIALS</em>
              </h2>
              <h3>SIMATS ENGINEERING</h3>
              <p>Organized by the Department of Smart Materials, SIMATS Engineering.</p>
            </div>
          </div>
        </section>

        <section id="team" className="section team-section">
          <div className="team-header-row reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <SectionHeader
              eyebrow="People behind the event"
              title="MEET THE ORGANIZING COMMITTEE"
              copy="The team behind HACK 2027."
            />
            {isOwnerAuthenticated && (
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20 }}>
                <span
                  style={{
                    padding: '4px 10px',
                    background: 'rgba(255, 214, 0, 0.12)',
                    border: '1px solid #FFD600',
                    color: '#FFD600',
                    borderRadius: 4,
                    fontSize: '11px',
                    fontFamily: "'Orbitron', sans-serif",
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                  }}
                >
                  ⚡ DIRECT EDIT ACTIVE
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setEditingMember(null)
                    setIsNewMemberModal(true)
                    setIsEditModalOpen(true)
                  }}
                  style={{
                    padding: '9px 18px',
                    background: '#FFD600',
                    color: '#050505',
                    border: 'none',
                    borderRadius: 4,
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '11px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    letterSpacing: '0.06em',
                    boxShadow: '0 2px 10px rgba(255, 214, 0, 0.4)',
                  }}
                >
                  + ADD MEMBER
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await fetch('/api/committee/auth/logout', { method: 'POST' })
                    setIsOwnerAuthenticated(false)
                  }}
                  style={{
                    padding: '8px 14px',
                    background: 'transparent',
                    color: '#ef4444',
                    border: '1px solid #ef4444',
                    borderRadius: 4,
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    letterSpacing: '0.05em',
                  }}
                  title="Logout from owner edit session"
                >
                  LOGOUT
                </button>
              </div>
            )}
          </div>
          <div className="committee-grid">
            {displayCommittee.regular.map((member, index) => {
              const isEmptyMember = !member.name && !member.designation
              return (
                <article
                  className={`profile-card reveal ${isEmptyMember ? 'empty-member-card' : ''}`}
                  key={member.id}
                  style={
                    isEmptyMember
                      ? {
                          border: '1.5px dashed rgba(255, 214, 0, 0.45)',
                          background: 'rgba(255, 214, 0, 0.02)',
                        }
                      : undefined
                  }
                >
                  <span className="profile-index">{String(index + 1).padStart(2, '0')}</span>

                  {/* Owner-only Edit Icon badge in top-right corner of card */}
                  {isOwnerAuthenticated && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingMember(member)
                        setIsNewMemberModal(false)
                        setIsEditModalOpen(true)
                      }}
                      style={{
                        position: 'absolute',
                        top: 14,
                        right: 14,
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: '#FFD600',
                        color: '#050505',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: '13px',
                        fontWeight: 900,
                        boxShadow: '0 2px 8px rgba(255, 214, 0, 0.4)',
                        zIndex: 3,
                        transition: 'transform 0.2s ease',
                      }}
                      title="Edit this committee member"
                    >
                      ✎
                    </button>
                  )}

                  {/* Photo area: clickable to edit when owner */}
                  <div
                    className={`profile-avatar ${member.photoUrl ? 'has-photo' : ''}`}
                    onClick={() => {
                      if (isOwnerAuthenticated) {
                        setEditingMember(member)
                        setIsNewMemberModal(false)
                        setIsEditModalOpen(true)
                      }
                    }}
                    style={{
                      cursor: isOwnerAuthenticated ? 'pointer' : 'default',
                      position: 'relative',
                    }}
                    title={isOwnerAuthenticated ? 'Click to replace or upload photo' : undefined}
                  >
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={`Profile photo of ${member.name || 'Committee Member'}`}
                        width={130}
                        height={130}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <Icon name="users" size={33} />
                    )}
                    {isOwnerAuthenticated && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: -4,
                          padding: '2px 8px',
                          background: '#FFD600',
                          color: '#050505',
                          fontSize: '8px',
                          fontFamily: "'Orbitron', sans-serif",
                          fontWeight: 800,
                          borderRadius: 3,
                          letterSpacing: '0.05em',
                        }}
                      >
                        PHOTO ✎
                      </span>
                    )}
                  </div>

                  {/* Name: clickable to edit */}
                  <h3
                    onClick={() => {
                      if (isOwnerAuthenticated) {
                        setEditingMember(member)
                        setIsNewMemberModal(false)
                        setIsEditModalOpen(true)
                      }
                    }}
                    style={{
                      cursor: isOwnerAuthenticated ? 'pointer' : 'default',
                      color: isEmptyMember ? 'rgba(255, 214, 0, 0.65)' : undefined,
                      fontStyle: isEmptyMember ? 'italic' : undefined,
                    }}
                    title={isOwnerAuthenticated ? 'Click to edit name' : undefined}
                  >
                    {member.name || (isEmptyMember ? '[ENTER MEMBER NAME]' : 'UNNAMED MEMBER')}
                    {isOwnerAuthenticated && (
                      <span style={{ fontSize: '11px', marginLeft: 6, color: '#FFD600' }}>✎</span>
                    )}
                  </h3>

                  {/* Designation: clickable to edit */}
                  <p
                    className="profile-designation"
                    onClick={() => {
                      if (isOwnerAuthenticated) {
                        setEditingMember(member)
                        setIsNewMemberModal(false)
                        setIsEditModalOpen(true)
                      }
                    }}
                    style={{
                      cursor: isOwnerAuthenticated ? 'pointer' : 'default',
                      color: isEmptyMember ? '#888' : undefined,
                      fontStyle: isEmptyMember ? 'italic' : undefined,
                    }}
                    title={isOwnerAuthenticated ? 'Click to edit designation' : undefined}
                  >
                    {member.designation || (isEmptyMember ? '[Enter designation / role]' : '—')}
                    {isOwnerAuthenticated && (
                      <span style={{ fontSize: '10px', marginLeft: 6, color: '#888' }}>✎</span>
                    )}
                  </p>

                  {(member.linkedinUrl || member.instagramUrl || member.githubUrl) && (
                    <div className="profile-socials">
                      {member.linkedinUrl && (
                        <a
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on LinkedIn`}
                          className="social-icon-link"
                        >
                          <Icon name="linkedin" size={17} />
                        </a>
                      )}
                      {member.instagramUrl && (
                        <a
                          href={member.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on Instagram`}
                          className="social-icon-link"
                        >
                          <Icon name="instagram" size={17} />
                        </a>
                      )}
                      {member.githubUrl && (
                        <a
                          href={member.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on GitHub`}
                          className="social-icon-link"
                        >
                          <Icon name="github" size={17} />
                        </a>
                      )}
                    </div>
                  )}

                  {/* Direct Edit / Delete Controls for Owner */}
                  {isOwnerAuthenticated && (
                    <div style={{ display: 'flex', gap: 6, marginTop: 14, width: '100%', justifyContent: 'center' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingMember(member)
                          setIsNewMemberModal(false)
                          setIsEditModalOpen(true)
                        }}
                        style={{
                          width: '100%',
                          maxWidth: 160,
                          padding: '8px 14px',
                          background: '#FFD600',
                          border: 'none',
                          color: '#050505',
                          borderRadius: 4,
                          fontFamily: "'Orbitron', sans-serif",
                          fontSize: '11px',
                          fontWeight: 800,
                          letterSpacing: '0.08em',
                          cursor: 'pointer',
                          boxShadow: '0 2px 10px rgba(255, 214, 0, 0.4)',
                        }}
                      >
                        ✎ EDIT MEMBER
                      </button>
                    </div>
                  )}

                  <i />
                </article>
              )
            })}
          </div>
          {displayCommittee.faculty.length > 0 ? (
            displayCommittee.faculty.map((fac) => (
              <div
                className="faculty-block reveal"
                key={fac.id}
                style={{ position: 'relative' }}
              >
                {/* Owner-only Edit button for faculty */}
                {isOwnerAuthenticated && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingMember(fac)
                      setIsNewMemberModal(false)
                      setIsEditModalOpen(true)
                    }}
                    style={{
                      position: 'absolute',
                      top: 14,
                      right: 14,
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      background: '#FFD600',
                      color: '#050505',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: '13px',
                      fontWeight: 900,
                      boxShadow: '0 2px 8px rgba(255, 214, 0, 0.4)',
                      zIndex: 3,
                    }}
                    title="Edit Faculty In-Charge"
                  >
                    ✎
                  </button>
                )}
                <div
                  className={`faculty-avatar ${fac.photoUrl ? 'has-photo' : ''}`}
                  onClick={() => {
                    if (isOwnerAuthenticated) {
                      setEditingMember(fac)
                      setIsNewMemberModal(false)
                      setIsEditModalOpen(true)
                    }
                  }}
                  style={{
                    cursor: isOwnerAuthenticated ? 'pointer' : 'default',
                    position: 'relative',
                  }}
                  title={isOwnerAuthenticated ? 'Click to replace faculty photo' : undefined}
                >
                  {fac.photoUrl ? (
                    <img
                      src={fac.photoUrl}
                      alt={`Profile photo of ${fac.name}`}
                      width={130}
                      height={130}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <Icon name="users" size={38} />
                  )}
                  {isOwnerAuthenticated && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: -4,
                        padding: '2px 8px',
                        background: '#FFD600',
                        color: '#050505',
                        fontSize: '8px',
                        fontFamily: "'Orbitron', sans-serif",
                        fontWeight: 800,
                        borderRadius: 3,
                      }}
                    >
                      PHOTO ✎
                    </span>
                  )}
                </div>
                <div>
                  <span>FACULTY IN-CHARGE</span>
                  <h3
                    onClick={() => {
                      if (isOwnerAuthenticated) {
                        setEditingMember(fac)
                        setIsNewMemberModal(false)
                        setIsEditModalOpen(true)
                      }
                    }}
                    style={{ cursor: isOwnerAuthenticated ? 'pointer' : 'default' }}
                    title={isOwnerAuthenticated ? 'Click to edit faculty details' : undefined}
                  >
                    {fac.name}
                    {isOwnerAuthenticated && (
                      <span style={{ fontSize: '12px', marginLeft: 8, color: '#FFD600' }}>✎</span>
                    )}
                  </h3>
                </div>
                <div className="faculty-mark">FIC</div>
              </div>
            ))
          ) : (
            <div className="faculty-block reveal">
              <div className="faculty-avatar">
                <Icon name="users" size={38} />
              </div>
              <div>
                <span>FACULTY IN-CHARGE</span>
                <h3>DR. JOTHI ARUNACHALAM</h3>
              </div>
              <div className="faculty-mark">FIC</div>
            </div>
          )}
        </section>

        <section id="contact" className="section contact">
          <div className="contact-panel reveal">
            <div>
              <span className="eyebrow">
                <i />
                Contact
              </span>
              <h2>
                GET IN TOUCH
                <br />
                <em>WITH OUR TEAM.</em>
              </h2>
              <p>Connect directly with the HACK 2027 organizing team.</p>
            </div>
            <div className="contact-list">
              <div>
                <Icon name="users" />
                <span>
                  <small>ORGANIZING TEAM</small>
                  <b>HACK 2027 Organizing Committee</b>
                </span>
              </div>
              <div>
                <Icon name="mail" />
                <span>
                  <small>FACULTY IN-CHARGE</small>
                  <b>Dr. Jothi Arunachalam</b>
                </span>
              </div>
              <div>
                <Icon name="orbit" />
                <span>
                  <small>ORGANIZING DEPARTMENT</small>
                  <b>Department of Smart Materials · SIMATS Engineering</b>
                </span>
              </div>
              <a href={`mailto:${eventConfig.email}`}>
                <Icon name="mail" />
                <span>
                  <small>OFFICIAL EMAIL</small>
                  <b>{eventConfig.email}</b>
                </span>
              </a>
              <a href="tel:+918870986482">
                <Icon name="phone" />
                <span>
                  <small>CONTACT 01</small>
                  <b>+91 8870986482</b>
                </span>
              </a>
              <a href="tel:+919344334585">
                <Icon name="phone" />
                <span>
                  <small>CONTACT 02</small>
                  <b>+91 93443 34585</b>
                </span>
              </a>
            </div>
            <div className="social-actions">
              <ActionLink href={eventConfig.whatsappUrl} className="social-button">
                <Icon name="message" /> Join Our WhatsApp Community
              </ActionLink>
              <ActionLink href={eventConfig.instagramUrl} className="social-button">
                <Icon name="instagram" /> Follow Us on Instagram
              </ActionLink>
              <ActionLink
                href={eventConfig.email ? `mailto:${eventConfig.email}` : ''}
                className="social-button"
              >
                <Icon name="mail" /> Contact Organizers
              </ActionLink>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <img
              src={hackLogo.src}
              alt="HACK 2027"
              width={210}
              height={105}
              loading="lazy"
              decoding="async"
            />
            <p>
              24 HOURS. ONE CHALLENGE.
              <br />
              INFINITE POSSIBILITIES.
            </p>
          </div>
          <div className="footer-links">
            <span>QUICK LINKS</span>
            {[
              ['Home', 'home'],
              ['About', 'about'],
              ['Domains', 'domains'],
              ['Committee', 'team'],
              ['Timeline', 'timeline'],
              ['Prizes', 'prizes'],
              ['Registration', 'registration'],
              ['Contact', 'contact'],
            ].map(([label, id]) => (
              <a href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
          </div>
          <div className="footer-institution">
            <span>ORGANIZED BY</span>
            <img
              src={simatsLogo.src}
              alt="SIMATS Engineering"
              width={180}
              height={60}
              loading="lazy"
              decoding="async"
            />
            <p>
              Department of Smart Materials
              <br />
              SIMATS Engineering
              <br />
              Faculty In-Charge: Dr. Jothi Arunachalam
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2027 HACK 2027. ALL RIGHTS RESERVED.</span>
          <div>
            <ActionLink href={eventConfig.instagramUrl} ariaLabel="Instagram">
              <Icon name="instagram" size={18} />
            </ActionLink>
            <ActionLink href={eventConfig.whatsappUrl} ariaLabel="WhatsApp">
              <Icon name="message" size={18} />
            </ActionLink>
            <ActionLink href={eventConfig.linkedinUrl} ariaLabel="LinkedIn">
              <Icon name="linkedin" size={18} />
            </ActionLink>
          </div>
          <span>BUILT FOR THE BOLD.</span>
        </div>
      </footer>

      <button
        className={`back-top ${showTop ? 'show' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>

      {/* Direct Committee Edit Modal for Authenticated Owner */}
      {isOwnerAuthenticated && isEditModalOpen && (
        <CommitteeEditModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setEditingMember(null)
          }}
          member={editingMember}
          isNew={isNewMemberModal}
          onSaveSuccess={(saved) => {
            setLiveMembers((prev) => {
              const idx = prev.findIndex((m) => m.id === saved.id)
              if (idx >= 0) {
                const next = [...prev]
                next[idx] = saved
                return next
              }
              return [...prev, saved]
            })
          }}
          onDeleteSuccess={(deletedId) => {
            setLiveMembers((prev) => prev.filter((m) => m.id !== deletedId))
          }}
        />
      )}
    </div>
  )
}
