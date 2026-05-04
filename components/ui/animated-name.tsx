'use client'

import { motion, useReducedMotion } from "framer-motion"
import type { Variants } from "framer-motion"

type AnimatedNameProps = {
  text: string
  className?: string
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.08,
    },
  },
}

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
    rotateX: -80,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.52,
      ease: "easeOut",
    },
  },
}

export function AnimatedName({ text, className }: AnimatedNameProps) {
  const reducedMotion = useReducedMotion()
  const letters = Array.from(text)

  if (reducedMotion) {
    return <h2 className={className}>{text}</h2>
  }

  return (
    <motion.h2
      aria-label={text}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
      style={{ perspective: 1000 }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          variants={letterVariants}
          className="inline-block will-change-transform"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h2>
  )
}
