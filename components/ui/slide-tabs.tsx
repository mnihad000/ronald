'use client'

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export type SlideTabItem = {
  label: string
  targetId: string
}

type IndicatorPosition = {
  left: number
  width: number
  opacity: number
}

type AimBoxPosition = {
  x: number
  y: number
  opacity: number
}

type SlideTabsProps = {
  tabs?: SlideTabItem[]
  sticky?: boolean
  onTabChange?: (index: number) => void
}

type TabProps = {
  children: React.ReactNode
  isSelected: boolean
  setPosition: React.Dispatch<React.SetStateAction<IndicatorPosition>>
  onClick: () => void
}

const DEFAULT_TABS: SlideTabItem[] = [
  { label: "Home", targetId: "home" },
  { label: "About", targetId: "about" },
  { label: "Projects", targetId: "projects" },
  { label: "Contact", targetId: "contact" },
]

export const SlideTabs = ({ tabs = DEFAULT_TABS, sticky = false, onTabChange }: SlideTabsProps) => {
  const [position, setPosition] = useState<IndicatorPosition>({
    left: 0,
    width: 0,
    opacity: 0,
  })
  const [aimBox, setAimBox] = useState<AimBoxPosition>({
    x: 0,
    y: 0,
    opacity: 0,
  })
  const [showTabIndicator, setShowTabIndicator] = useState(true)
  const [selected, setSelected] = useState(0)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLUListElement | null>(null)
  const tabsRef = useRef<Array<HTMLLIElement | null>>([])

  useEffect(() => {
    const syncSelectedIndicator = () => {
      const selectedTab = tabsRef.current[selected]
      if (!selectedTab) return

      const { width } = selectedTab.getBoundingClientRect()
      setPosition({
        left: selectedTab.offsetLeft,
        width,
        opacity: 1,
      })
    }

    syncSelectedIndicator()
  }, [selected, tabs])

  useEffect(() => {
    const proximityPadding = 44

    const handlePointerMove = (event: MouseEvent) => {
      const wrapper = wrapperRef.current
      const list = listRef.current
      if (!wrapper || !list) return

      const wrapperRect = wrapper.getBoundingClientRect()
      const listRect = list.getBoundingClientRect()

      const insideList =
        event.clientX >= listRect.left &&
        event.clientX <= listRect.right &&
        event.clientY >= listRect.top &&
        event.clientY <= listRect.bottom

      if (insideList) {
        setAimBox((current) => (current.opacity === 0 ? current : { ...current, opacity: 0 }))
        setShowTabIndicator(true)
        return
      }

      const nearList =
        event.clientX >= listRect.left - proximityPadding &&
        event.clientX <= listRect.right + proximityPadding &&
        event.clientY >= listRect.top - proximityPadding &&
        event.clientY <= listRect.bottom + proximityPadding

      if (nearList) {
        setShowTabIndicator(false)
        setAimBox({
          x: event.clientX - wrapperRect.left,
          y: event.clientY - wrapperRect.top,
          opacity: 1,
        })
        return
      }

      setAimBox((current) => (current.opacity === 0 ? current : { ...current, opacity: 0 }))
      setShowTabIndicator(true)

      const selectedTab = tabsRef.current[selected]
      if (!selectedTab) return

      const { width } = selectedTab.getBoundingClientRect()
      setPosition({
        left: selectedTab.offsetLeft,
        width,
        opacity: 1,
      })
    }

    window.addEventListener("mousemove", handlePointerMove)

    return () => {
      window.removeEventListener("mousemove", handlePointerMove)
    }
  }, [selected])

  const wrapperClassName = sticky
    ? "fixed left-1/2 top-4 z-50 w-fit -translate-x-1/2 rounded-full border border-white/70 bg-white/28 p-1.5 shadow-[0_14px_40px_rgba(15,23,42,0.12)] ring-1 ring-black/6 backdrop-blur-xl supports-[backdrop-filter]:bg-white/22"
    : "relative w-fit"

  const handleTabClick = (index: number) => {
    setSelected(index)
    setShowTabIndicator(true)
    setAimBox((current) => ({ ...current, opacity: 0 }))
    onTabChange?.(index)

    const tab = tabs[index]
    if (!tab) return

    const target = document.getElementById(tab.targetId)
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div ref={wrapperRef} className={wrapperClassName}>
      <ul
        ref={listRef}
        className="relative mx-auto flex w-fit items-center gap-1 overflow-hidden rounded-full border border-white/65 bg-white/14 px-1 py-1 text-neutral-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-xl"
      >
        {tabs.map((tab, i) => (
          <Tab
            key={tab.label}
            ref={(el) => {
              tabsRef.current[i] = el
            }}
            isSelected={selected === i}
            setPosition={setPosition}
            onClick={() => handleTabClick(i)}
          >
            {tab.label}
          </Tab>
        ))}
        <BracketIndicator position={position} opacity={showTabIndicator ? position.opacity : 0} />
      </ul>
      <RotatingAimBox position={aimBox} />
    </div>
  )
}

const Tab = React.forwardRef<HTMLLIElement, TabProps>(
  ({ children, isSelected, setPosition, onClick }, ref) => {
    return (
      <li
        ref={ref}
        onClick={onClick}
        onMouseEnter={(event) => {
          const target = event.currentTarget
          const { width } = target.getBoundingClientRect()

          setPosition({
            left: target.offsetLeft,
            width,
            opacity: 1,
          })
        }}
        className={[
          "relative z-10 block cursor-pointer rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em] transition-colors duration-200",
          "md:px-6 md:py-3 md:text-sm",
          isSelected ? "text-neutral-950" : "text-neutral-500 hover:text-neutral-800",
        ].join(" ")}
      >
        {children}
      </li>
    )
  },
)
Tab.displayName = "Tab"

const BracketIndicator = ({
  position,
  opacity,
}: {
  position: IndicatorPosition
  opacity: number
}) => {
  return (
    <motion.li
      animate={{
        left: position.left,
        width: position.width,
        opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 34,
      }}
      className="pointer-events-none absolute bottom-1 top-1 z-0"
    >
      <span className="absolute left-0 top-0 h-4 w-4 border-l-[3px] border-t-[3px] border-neutral-950 md:h-5 md:w-5" />
      <span className="absolute right-0 top-0 h-4 w-4 border-r-[3px] border-t-[3px] border-neutral-950 md:h-5 md:w-5" />
      <span className="absolute bottom-0 left-0 h-4 w-4 border-b-[3px] border-l-[3px] border-neutral-950 md:h-5 md:w-5" />
      <span className="absolute bottom-0 right-0 h-4 w-4 border-b-[3px] border-r-[3px] border-neutral-950 md:h-5 md:w-5" />
    </motion.li>
  )
}

const RotatingAimBox = ({ position }: { position: AimBoxPosition }) => {
  return (
    <motion.div
      animate={{
        x: position.x,
        y: position.y,
        opacity: position.opacity,
        rotate: position.opacity > 0 ? 360 : 0,
      }}
      transition={{
        x: { type: "spring", stiffness: 360, damping: 28 },
        y: { type: "spring", stiffness: 360, damping: 28 },
        opacity: { duration: 0.18 },
        rotate: { duration: 3.4, ease: "linear", repeat: Number.POSITIVE_INFINITY },
      }}
      className="pointer-events-none absolute left-0 top-0 z-10 h-7 w-7 -translate-x-1/2 -translate-y-1/2 md:h-8 md:w-8"
    >
      <span className="absolute left-0 top-0 h-3.5 w-3.5 border-l-[3px] border-t-[3px] border-neutral-950 md:h-4 md:w-4" />
      <span className="absolute right-0 top-0 h-3.5 w-3.5 border-r-[3px] border-t-[3px] border-neutral-950 md:h-4 md:w-4" />
      <span className="absolute bottom-0 left-0 h-3.5 w-3.5 border-b-[3px] border-l-[3px] border-neutral-950 md:h-4 md:w-4" />
      <span className="absolute bottom-0 right-0 h-3.5 w-3.5 border-b-[3px] border-r-[3px] border-neutral-950 md:h-4 md:w-4" />
    </motion.div>
  )
}
