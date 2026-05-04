'use client'

import { motion } from "framer-motion"

import { WavyWhatIfText } from "@/components/ui/wavy-what-if-text"

const PROJECT_CARDS = Array.from({ length: 4 }, (_, index) => ({
  title: `Placeholder ${index + 1}`,
  subtitle: "Placeholder text",
  points: ["Placeholder text", "Placeholder text", "Placeholder text"],
  actions: ["View Project", "Live Demo"],
}))

export function HeroProjectsSection() {
  return (
    <section id="projects" className="mx-auto mt-24 max-w-6xl scroll-mt-28">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h3
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl font-semibold tracking-tight text-neutral-900 md:text-6xl"
        >
          My Projects
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-4 max-w-2xl text-base leading-8 text-neutral-500 md:text-2xl md:leading-10"
        >
          things i build, most of these started with a
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4"
      >
        <WavyWhatIfText text="what if" />
      </motion.div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
        {PROJECT_CARDS.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.55,
              delay: 0.08 * index,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-[0_18px_45px_rgba(0,0,0,0.05)] md:p-6"
          >
            <div className="overflow-hidden rounded-[1.5rem] border border-black/8 bg-neutral-100 p-3">
              <div className="flex aspect-[16/10] items-center justify-center rounded-[1.15rem] border border-black/8 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.8),_rgba(231,231,231,0.95)_40%,_rgba(212,212,212,1)_100%)]">
                <span className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
                  Placeholder Image
                </span>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div className="space-y-1.5">
                <h4 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  {project.title}
                </h4>
                <p className="text-base leading-7 text-neutral-500">{project.subtitle}</p>
              </div>

              <ul className="space-y-2.5 pl-5 text-sm leading-7 text-neutral-600 md:text-[15px]">
                {project.points.map((point, pointIndex) => (
                  <li key={`${project.title}-${pointIndex}`} className="list-disc marker:text-neutral-400">
                    {point}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 pt-1">
                {project.actions.map((action) => (
                  <a
                    key={action}
                    href="#"
                    className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-neutral-700 shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition hover:bg-neutral-50"
                  >
                    {action}
                  </a>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
