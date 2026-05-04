'use client'

import { useEffect, useRef, useState, type ReactNode } from "react"
import {
  ArrowUpRight,
  Copy,
  Mail,
  MapPin,
  Check,
  Link2,
} from "lucide-react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion"

const LINKEDIN_URL = "https://www.linkedin.com/in/ronaldb17/"
const EMAIL_ADDRESS = "rbeltran0524@gmail.com"

export function HeroContactSection() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "fallback">("idle")

  useEffect(() => {
    if (copyState === "idle") return

    const timeout = window.setTimeout(() => {
      setCopyState("idle")
    }, 1800)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [copyState])

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(EMAIL_ADDRESS)
        setCopyState("copied")
        return
      }

      const textArea = document.createElement("textarea")
      textArea.value = EMAIL_ADDRESS
      textArea.setAttribute("readonly", "")
      textArea.style.position = "absolute"
      textArea.style.left = "-9999px"
      document.body.appendChild(textArea)
      textArea.select()
      const copied = document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopyState(copied ? "copied" : "fallback")
    } catch {
      setCopyState("fallback")
    }
  }

  const copyLabel =
    copyState === "copied"
      ? "Copied"
      : copyState === "fallback"
        ? "Copy failed"
        : "Copy Email"

  return (
    <section
      id="contact"
      className="mx-auto mt-24 max-w-6xl scroll-mt-28 rounded-[2rem] border border-black/10 bg-white px-5 py-8 shadow-[0_20px_55px_rgba(0,0,0,0.06)] md:px-8 md:py-10"
    >
      <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">Let&apos;s connect</p>
            <h3 className="text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
              Contact Me
            </h3>
            <p className="max-w-xl text-base leading-8 text-neutral-600 md:text-lg">
              Open to internships, projects, and interesting engineering conversations. Reach out
              directly or copy my email and send a note whenever you&apos;re ready.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <MagneticContactCard
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              icon={<Link2 className="h-5 w-5" strokeWidth={1.8} />}
              eyebrow="Professional"
              title="LinkedIn"
              description="See my profile and connect there."
              accent="dark"
            >
              <span className="inline-flex items-center gap-2 text-sm font-medium">
                Open profile
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
              </span>
            </MagneticContactCard>

            <MagneticContactCard
              href={`mailto:${EMAIL_ADDRESS}`}
              icon={<Mail className="h-5 w-5" strokeWidth={1.8} />}
              eyebrow="Direct"
              title="Email Me"
              description={EMAIL_ADDRESS}
              accent="light"
            >
              <span className="inline-flex items-center gap-2 text-sm font-medium">
                Start an email
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
              </span>
            </MagneticContactCard>

            <MagneticContactCard
              onClick={handleCopyEmail}
              icon={
                copyState === "copied" ? (
                  <Check className="h-5 w-5" strokeWidth={1.8} />
                ) : (
                  <Copy className="h-5 w-5" strokeWidth={1.8} />
                )
              }
              eyebrow="Quick access"
              title={copyLabel}
              description={copyState === "fallback" ? "Use the address above manually." : EMAIL_ADDRESS}
              accent="subtle"
              fullWidth
            >
              <span className="inline-flex items-center gap-2 text-sm font-medium">
                {copyState === "copied" ? "Ready to paste" : "Copy to clipboard"}
              </span>
            </MagneticContactCard>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[1.75rem] border border-black/8 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_rgba(244,244,245,0.95)_42%,_rgba(236,236,239,0.98)_100%)] p-5 md:p-6"
        >
          <div className="flex flex-col items-center gap-6 text-center">
            <RadarOrb />

            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.24em] text-neutral-500">Signal is open</p>
              <p className="mx-auto max-w-sm text-sm leading-7 text-neutral-600 md:text-base">
                Best for internship opportunities, project collaboration, and engineering roles in
                New York and remote-friendly teams.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-neutral-600 shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
              <MapPin className="h-4 w-4" strokeWidth={1.8} />
              <span>New York, NY</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

type MagneticContactCardProps = {
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
  icon: ReactNode
  eyebrow: string
  title: string
  description: string
  accent: "dark" | "light" | "subtle"
  fullWidth?: boolean
  children: ReactNode
}

function MagneticContactCard({
  href,
  target,
  rel,
  onClick,
  icon,
  eyebrow,
  title,
  description,
  accent,
  fullWidth = false,
  children,
}: MagneticContactCardProps) {
  const reducedMotion = useReducedMotion()
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.6 })
  const glowX = useTransform(springX, [-16, 16], ["44%", "56%"])
  const glowY = useTransform(springY, [-16, 16], ["44%", "56%"])

  const accentStyles =
    accent === "dark"
      ? "border-neutral-900 bg-neutral-900 text-white"
      : accent === "light"
        ? "border-black/10 bg-white text-neutral-900"
        : "border-black/8 bg-neutral-50 text-neutral-900"

  const descriptionClass = accent === "dark" ? "text-white/72" : "text-neutral-500"
  const eyebrowClass = accent === "dark" ? "text-white/55" : "text-neutral-400"
  const iconClass = accent === "dark" ? "bg-white/10 text-white" : "bg-black/5 text-neutral-800"
  const glowColor =
    accent === "dark"
      ? "radial-gradient(circle at center, rgba(255,255,255,0.18), transparent 62%)"
      : "radial-gradient(circle at center, rgba(17,17,17,0.06), transparent 62%)"

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return

    const element = wrapperRef.current
    if (!element) return

    const bounds = element.getBoundingClientRect()
    const offsetX = event.clientX - (bounds.left + bounds.width / 2)
    const offsetY = event.clientY - (bounds.top + bounds.height / 2)

    x.set(offsetX * 0.12)
    y.set(offsetY * 0.12)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const content = (
    <div className="relative z-10 flex h-full flex-col justify-between gap-5 p-5 md:p-6">
      <div className="space-y-4">
        <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${iconClass}`}>
          {icon}
        </div>

        <div className="space-y-1.5">
          <p className={`text-[11px] uppercase tracking-[0.24em] ${eyebrowClass}`}>{eyebrow}</p>
          <h4 className="text-2xl font-semibold tracking-tight">{title}</h4>
          <p className={`text-sm leading-7 ${descriptionClass}`}>{description}</p>
        </div>
      </div>

      <div>{children}</div>
    </div>
  )

  return (
    <motion.div
      ref={wrapperRef}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={reducedMotion ? undefined : { x: springX, y: springY }}
      className={`${fullWidth ? "sm:col-span-2" : ""} relative overflow-hidden rounded-[1.75rem] border shadow-[0_14px_35px_rgba(0,0,0,0.05)] ${accentStyles}`}
    >
      <motion.div
        aria-hidden="true"
        style={reducedMotion ? undefined : { left: glowX, top: glowY }}
        className="pointer-events-none absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
      >
        <div className="h-full w-full rounded-full" style={{ backgroundImage: glowColor }} />
      </motion.div>

      {href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          {content}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className="block h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          {content}
        </button>
      )}
    </motion.div>
  )
}

function RadarOrb() {
  const reducedMotion = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="relative flex h-[280px] w-full max-w-[320px] items-center justify-center overflow-hidden rounded-[2rem] border border-black/8 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,1),_rgba(242,242,243,0.98)_48%,_rgba(232,232,235,1)_100%)]"
    >
      <motion.div
        animate={
          reducedMotion
            ? { opacity: 0.8, scale: 1 }
            : { opacity: [0.55, 0.85, 0.55], scale: [0.96, 1.02, 0.96] }
        }
        transition={{ duration: 4.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(120,120,130,0.14),_rgba(120,120,130,0.03)_55%,_transparent_72%)] blur-xl"
      />

      {[0, 1, 2].map((ring) => (
        <motion.div
          key={ring}
          animate={
            reducedMotion
              ? { opacity: 0.32, scale: 1 }
              : { opacity: [0.18, 0.42, 0.18], scale: [0.94, 1.03, 0.94] }
          }
          transition={{
            duration: 4.2,
            delay: ring * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className={`absolute rounded-full border border-black/10 ${
            ring === 0 ? "h-36 w-36" : ring === 1 ? "h-52 w-52" : "h-64 w-64"
          }`}
        />
      ))}

      <motion.div
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={
          reducedMotion
            ? undefined
            : { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }
        }
        className="absolute h-64 w-64 rounded-full"
        style={{
          background:
            "conic-gradient(from 180deg, rgba(255,255,255,0) 0deg, rgba(160,160,165,0.24) 54deg, rgba(255,255,255,0) 104deg)",
          maskImage:
            "radial-gradient(circle at center, transparent 0 39%, black 40% 67%, transparent 68% 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, transparent 0 39%, black 40% 67%, transparent 68% 100%)",
        }}
      />

      <div className="absolute h-4 w-4 rounded-full bg-neutral-900 shadow-[0_0_20px_rgba(17,17,17,0.18)]" />

      {[
        { className: "left-[22%] top-[28%]", duration: 2.2, delay: 0.2 },
        { className: "right-[24%] top-[34%]", duration: 2.7, delay: 0.5 },
        { className: "bottom-[24%] left-[30%]", duration: 2.4, delay: 0.9 },
      ].map((dot) => (
        <motion.div
          key={dot.className}
          animate={reducedMotion ? { opacity: 0.55 } : { opacity: [0.35, 0.95, 0.35], scale: [1, 1.25, 1] }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className={`absolute h-2.5 w-2.5 rounded-full bg-neutral-500 ${dot.className}`}
        />
      ))}
    </div>
  )
}
