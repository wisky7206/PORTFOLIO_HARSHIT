"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Download } from "lucide-react"
import { useRef } from "react"

export function ResumeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const education = [
    {
      degree: "B.Tech in Computer Science Engineering",
      institution: "SRM Institute of Science and Technology",
      period: "2022 - 2026",
      description:
        "Focusing on advanced algorithms, machine learning, and software engineering principles. Maintaining a CGPA of 9.45/10.",
    },
    {
      degree: "Higher Secondary Education (12th CBSE)",
      institution: "Cambridge School",
      period: "2022",
      description:
        "Completed with 90.6% in Mathematics, Physics, and Computer Science. Participated in various coding competitions.",
    },
    {
      degree: "Secondary Education (10th CBSE)",
      institution: "Cambridge School",
      period: "2020",
      description:
        "Achieved 95.6% with distinction in Mathematics and Science. Active participant in school tech clubs.",
    },
  ]

  const experience = [
    {
      position: "R&D Intern",
      company: "Samsung R&D",
      period: "Jul 2024 - Jan 2025",
      description:
        "Contributed to the Samsung PRISM project focused on developing a Photo Filter Recommendation System using deep learning. Led dataset preparation by collecting and annotating a custom dataset of 30,000+ images across various categories.",
    },
    {
      position: "Data Science Intern",
      company: "Evoastra Ventures Pvt. Ltd.",
      period: "Jun 2024 - Aug 2024",
      description:
        "Collected, cleaned, and preprocessed data from multiple sources to ensure data integrity and usability. Conducted exploratory data analysis to uncover trends and provide actionable insights.",
    },
  ]

  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="resume" ref={ref} className="min-h-screen flex flex-col justify-center py-20">
      <div className="px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between"
        >
          <div>
            <h2 className="text-4xl font-bold mb-6 relative inline-block">
              RESUME
              <motion.span
                className="absolute -bottom-2 left-0 h-0.5 bg-white"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl">
              My academic and professional journey, highlighting my education, work experience, and achievements in the
              field of computer science.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 md:mt-0"
          >
            <button
              onClick={() => window.open("https://drive.google.com/file/d/11ksOCmHE4BrsjkoCOHCyPqJHnYBi0SCk/view?usp=sharing", "_blank")}
              className="flex items-center gap-2 border border-white px-6 py-3 hover:bg-white hover:text-black transition-all duration-300"
              aria-label="Download CV"
            >
              <Download className="w-4 h-4" />
              Download CV
            </button>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div variants={timelineVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <h3 className="text-2xl font-bold mb-6 pb-2 border-b border-white border-opacity-20">Education</h3>
            <div className="space-y-8">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative pl-6 border-l border-white border-opacity-20"
                >
                  <div className="absolute w-3 h-3 bg-white rounded-full -left-[7px] top-1" />
                  <h4 className="text-xl font-semibold">{item.degree}</h4>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-2">
                    <span className="text-gray-300">{item.institution}</span>
                    <span className="hidden sm:inline text-gray-500">•</span>
                    <span className="text-gray-400">{item.period}</span>
                  </div>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={timelineVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <h3 className="text-2xl font-bold mb-6 pb-2 border-b border-white border-opacity-20">Experience</h3>
            <div className="space-y-8">
              {experience.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative pl-6 border-l border-white border-opacity-20"
                >
                  <div className="absolute w-3 h-3 bg-white rounded-full -left-[7px] top-1" />
                  <h4 className="text-xl font-semibold">{item.position}</h4>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-2">
                    <span className="text-gray-300">{item.company}</span>
                    <span className="hidden sm:inline text-gray-500">•</span>
                    <span className="text-gray-400">{item.period}</span>
                  </div>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
