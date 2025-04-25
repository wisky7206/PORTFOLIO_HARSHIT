"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Award } from "lucide-react"
import { useRef } from "react"

export function CertificationsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const certifications = [
    "Oracle Cloud Infrastructure 2024 Certified Foundations Associate",
    "Oracle Cloud Infrastructure 2024 Certified AI Foundations Associate",
    "Fortinet Certified Associate Cybersecurity",
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section ref={ref} className="py-16">
      <div className="px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-6 relative inline-block">
            CERTIFICATIONS
            <motion.span
              className="absolute -bottom-2 left-0 h-0.5 bg-white"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl">
            Professional certifications that validate my technical knowledge and expertise in various domains.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {certifications.map((certification, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="border border-white border-opacity-20 p-6 flex items-start gap-4"
            >
              <Award className="w-6 h-6 mt-1 flex-shrink-0" />
              <p className="text-gray-200">{certification}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
