'use client'

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export type SlideTabItem = {
  label: string
  targetId: string
}

type CursorPosition = {
  left: number
  width: number
  opacity: number
}

type SlideTabsProps = {
  tabs?: SlideTabItem[]
  sticky?: boolean
  onTabChange?: (index: number) => void
}

type TabProps = {
  children: React.ReactNode
  setPosition: React.Dispatch<React.SetStateAction<CursorPosition>>
  onClick: () => void
}

const DEFAULT_TABS: SlideTabItem[] = [
  { label: "Home", targetId: "home" },
  { label: "About", targetId: "about" },
  { label: "Projects", targetId: "projects" },
  { label: "Contact", targetId: "contact" },
]

export const SlideTabs = ({ tabs = DEFAULT_TABS, sticky = false, onTabChange }: SlideTabsProps) => {
  const [position, setPosition] = useState<CursorPosition>({
    left: 0,
    width: 0,
    opacity: 0,
  })
  const [selected, setSelected] = useState(0)
  const tabsRef = useRef<Array<HTMLLIElement | null>>([])

  useEffect(() => {
    const selectedTab = tabsRef.current[selected]
    if (selectedTab) {
      const { width } = selectedTab.getBoundingClientRect()
      setPosition({
        left: selectedTab.offsetLeft,
        width,
        opacity: 1,
      })
    }
  }, [selected, tabs])

  const wrapperClassName = sticky
    ? "fixed left-1/2 top-4 z-50 w-fit -translate-x-1/2 rounded-full border border-black/10 bg-white/85 p-1 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md"
    : ""

  const handleTabClick = (index: number) => {
    setSelected(index)
    onTabChange?.(index)

    const tab = tabs[index]
    if (!tab) return

    const target = document.getElementById(tab.targetId)
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className={wrapperClassName}>
      <ul
        onMouseLeave={() => {
          const selectedTab = tabsRef.current[selected]
          if (selectedTab) {
            const { width } = selectedTab.getBoundingClientRect()
            setPosition({
              left: selectedTab.offsetLeft,
              width,
              opacity: 1,
            })
          }
        }}
        className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1 dark:border-white dark:bg-neutral-800"
      >
        {tabs.map((tab, i) => (
          <Tab
            key={tab.label}
            ref={(el) => {
              tabsRef.current[i] = el
            }}
            setPosition={setPosition}
            onClick={() => handleTabClick(i)}
          >
            {tab.label}
          </Tab>
        ))}
        <Cursor position={position} />
      </ul>
    </div>
  )
}

const Tab = React.forwardRef<HTMLLIElement, TabProps>(({ children, setPosition, onClick }, ref) => {
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
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  )
})
Tab.displayName = "Tab"

const Cursor = ({ position }: { position: CursorPosition }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-black dark:bg-white md:h-12"
    />
  )
}
