"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "certifications", label: "Certifications" },
    { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" },
  ]

  const toggleMenu = () => setIsOpen(!isOpen)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      })
    }
    setIsOpen(false)
  }

  return (
    <>
      <motion.button
        className="fixed top-6 right-6 z-50 w-12 h-12 flex flex-col justify-center items-center gap-1.5 bg-transparent"
        onClick={toggleMenu}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <motion.span
          className="w-8 h-0.5 bg-white"
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="w-8 h-0.5 bg-white"
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="w-8 h-0.5 bg-white"
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      <motion.nav
        className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-95"
        initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
        animate={
          isOpen
            ? { clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }
            : { clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }
        }
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <ul className="flex flex-col items-center gap-6 text-2xl">
          {sections.map((section, index) => (
            <motion.li
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: isOpen ? 0.1 + index * 0.1 : 0 }}
            >
              <button
                onClick={() => scrollToSection(section.id)}
                className="text-white hover:text-gray-300 transition-colors relative group"
              >
                {section.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </button>
            </motion.li>
          ))}
        </ul>
      </motion.nav>

      <motion.div
        className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <ul className="flex flex-col gap-6">
          {sections.map((section) => (
            <li key={section.id} className="relative group">
              <button
                onClick={() => scrollToSection(section.id)}
                className="w-3 h-3 rounded-full bg-white bg-opacity-50 group-hover:bg-opacity-100 transition-all"
                aria-label={section.label}
              />
              <span className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm">
                {section.label}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  )
}
