"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { type ReactNode, useRef } from "react"

interface UnzipRevealProps {
  children: ReactNode
  direction?: "left" | "right"
  delay?: number
}

export function UnzipReveal({ children, direction = "left", delay = 0 }: UnzipRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const zipProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1])

  const contentY = useTransform(scrollYProgress, [0.3, 0.6], [30, 0])

  const zipperX = useTransform(zipProgress, [0, 1], direction === "left" ? ["0%", "100%"] : ["100%", "0%"])

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Zipper animation */}
      <motion.div className="absolute inset-0 flex items-center pointer-events-none" style={{ zIndex: 10 }}>
        <motion.div className="relative w-full h-[2px] bg-white bg-opacity-20">
          <motion.div className="absolute top-1/2 -translate-y-1/2 w-3 h-6 bg-white" style={{ x: zipperX }} />
        </motion.div>
      </motion.div>

      {/* Content reveal */}
      <motion.div
        style={{
          opacity: contentOpacity,
          y: contentY,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
