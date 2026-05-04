import { CircleUserRound } from "lucide-react"
import { AnimatedName } from "@/components/ui/animated-name"
import { HeroContactSection } from "@/components/ui/hero-contact-section"
import { HeroProjectsSection } from "@/components/ui/hero-projects-section"

const EXPERIENCE_ITEMS = Array.from({ length: 4 }, () => ({
  date: "Janurar 2024- March 2024",
  title: "Placeholder",
  body: "Placeholder",
}))

export function ProfileSection() {
  return (
    <section
      id="about"
      className="profile-dots relative mt-10 scroll-mt-28 rounded-3xl border border-black/5 bg-white px-4 py-10 md:px-8 md:py-12"
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
        <div className="relative isolate space-y-6">
          <div className="floating-accent-dots" aria-hidden="true" />
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Hi, my name is</p>
            <AnimatedName
              text="Ronald Beltran"
              className="mt-2 text-4xl font-bold tracking-tight text-[#d65a12] drop-shadow-[0_4px_18px_rgba(214,90,18,0.2)] md:text-6xl"
            />
            <p className="mt-3 text-xl font-medium text-neutral-700">
              Mechanical Engineering Major at CCNY
            </p>
          </div>

          <p className="max-w-xl text-base leading-relaxed text-neutral-700 md:text-lg">
            I&apos;m Ronald Beltran, a Mechanical Engineering student at The City College of New York focused on practical design, problem-solving, and building systems that connect engineering principles with real-world impact.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-neutral-100"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-neutral-900 bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="flex h-72 w-72 items-center justify-center rounded-full border-8 border-white bg-neutral-100 text-neutral-500 shadow-[0_25px_60px_rgba(0,0,0,0.15)] md:h-96 md:w-96">
            <div className="flex flex-col items-center gap-3">
              <CircleUserRound className="h-20 w-20 md:h-24 md:w-24" strokeWidth={1.5} />
              <span className="text-sm font-medium uppercase tracking-[0.2em]">Image Placeholder</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl">
        <div className="max-w-3xl">
          <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
            Experiences
          </h3>
        </div>

        <div className="relative mt-8 pl-8 md:pl-10">
          <div
            className="absolute bottom-3 left-[7px] top-3 w-px bg-neutral-200 md:left-[9px]"
            aria-hidden="true"
          />

          <div className="space-y-8 md:space-y-10">
            {EXPERIENCE_ITEMS.map((item, index) => (
              <article key={`${item.title}-${index}`} className="relative">
                <div
                  className="absolute left-[-25px] top-1 h-4 w-4 rounded-full border border-neutral-300 bg-neutral-900 md:left-[-31px]"
                  aria-hidden="true"
                />

                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
                    {item.date}
                  </p>
                  <h4 className="text-lg font-semibold text-neutral-900 md:text-xl">{item.title}</h4>
                  <p className="max-w-2xl text-sm leading-7 text-neutral-600 md:text-base">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <HeroProjectsSection />
      <HeroContactSection />
    </section>
  )
}
