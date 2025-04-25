"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Award, Briefcase, GraduationCap, Star } from "lucide-react"
import { useRef } from "react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const experiences = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Samsung R&D Internship",
      period: "Jul 2024 - Jan 2025",
      description:
        "Contributed to the Samsung PRISM project focused on developing a Photo Filter Recommendation System using deep learning.",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Data Science Internship",
      company: "Evoastra Ventures Pvt. Ltd.",
      period: "Jun 2024 - Aug 2024",
      description:
        "Collected, cleaned, and preprocessed data from multiple sources to ensure data integrity and usability.",
    },
  ]

  const education = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "B.Tech in Computer Science",
      institution: "SRM Institute of Science and Technology",
      grade: "CGPA: 9.45",
      period: "2022 - 2026",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "12th CBSE",
      institution: "Cambridge School",
      grade: "90.6%",
      period: "2022",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "10th CBSE",
      institution: "Cambridge School",
      grade: "95.6%",
      period: "2020",
    },
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
    <section id="about" ref={ref} className="min-h-screen flex flex-col justify-center py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6 relative inline-block">
            ABOUT ME
            <motion.span
              className="absolute -bottom-2 left-0 h-0.5 bg-white"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
          <p className="text-lg mb-6 text-gray-300">
            Motivated and detail-oriented B.Tech Computer Science Engineering student with proven experience in
            internships, research, and team projects. Strong ability to adapt, learn quickly, and contribute to
            goal-driven environments.
          </p>
          <p className="text-lg mb-6 text-gray-300">
            Recognized in national hackathons and trusted with responsibilities in real-world industry settings. Looking
            to bring dedication and problem-solving skills to a dynamic organization.
          </p>
          <p className="text-lg text-gray-300">
            My goal is to contribute to projects that make a meaningful impact and to continue growing as a developer
            and problem solver in this ever-evolving field.
          </p>
        </motion.div>

        <div className="space-y-8">
          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Experience
            </motion.h3>
            <div className="space-y-4">
              {experiences.map((item, index) => (
                <motion.div key={index} variants={itemVariants} className="border border-white border-opacity-20 p-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <h4 className="text-xl font-semibold">{item.title}</h4>
                      {item.company && <p className="text-gray-300">{item.company}</p>}
                      <p className="text-gray-400">{item.period}</p>
                      <p className="text-gray-300 mt-2">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5" />
              Education
            </motion.h3>
            <div className="space-y-4">
              {education.map((item, index) => (
                <motion.div key={index} variants={itemVariants} className="border border-white border-opacity-20 p-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <h4 className="text-xl font-semibold">{item.title}</h4>
                      {item.institution && <p className="text-gray-300">{item.institution}</p>}
                      <div className="flex flex-wrap gap-2 items-center">
                        <p className="text-gray-400">{item.period}</p>
                        <span className="text-gray-500">•</span>
                        <p className="text-white font-medium">{item.grade}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
