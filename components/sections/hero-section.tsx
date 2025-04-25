"use client"

import { motion, useSpring } from "framer-motion"
import { useEffect, useState } from "react"
import { CodeDisplay } from "@/components/code-display"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const springX = useSpring(0, { stiffness: 100, damping: 30 })
  const springY = useSpring(0, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2

      // Calculate distance from center (normalized)
      const distanceX = (clientX - centerX) / centerX
      const distanceY = (clientY - centerY) / centerY

      // Update spring values
      springX.set(distanceX * 50)
      springY.set(distanceY * 50)

      // Update mouse position for other effects
      setMousePosition({ x: clientX, y: clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [springX, springY])

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] opacity-10">
        {Array.from({ length: 400 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-white border-opacity-20" />
        ))}
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 px-6 items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-xl"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            HARSHIT
            <br />
            RUSTAGI
          </motion.h1>

          <motion.div
            className="h-0.5 w-0 bg-white mb-6"
            initial={{ width: 0 }}
            animate={{ width: "150px" }}
            transition={{ duration: 1, delay: 0.8 }}
          />

          <motion.p
            className="text-xl md:text-2xl max-w-md mb-8 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            CSE Student at SRM University
            <br />
            Exploring the intersection of code and creativity
          </motion.p>

          <motion.div
            className="flex flex-col gap-2 mb-8 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">+91-7206096651</span>
              <span className="mx-1">•</span>
              <span className="text-sm">harshitrustagi96@gmail.com</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <button
              onClick={() => {
                const element = document.getElementById("about")
                if (element) {
                  window.scrollTo({
                    top: element.offsetTop,
                    behavior: "smooth",
                  })
                }
              }}
              className="group relative overflow-hidden border border-white px-6 py-3 transition-all duration-300 hover:bg-white hover:text-black"
              aria-label="Discover more about Harshit Rustagi"
            >
              <span className="relative z-10">DISCOVER MORE</span>
              <span className="absolute inset-0 bg-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
            </button>
          </motion.div>
        </motion.div>

        {/* Code Display - Right Side */}
        <motion.div
          className="relative hidden md:flex items-center justify-center h-[500px]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <CodeDisplay className="w-full h-full" />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  )
}
