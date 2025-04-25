"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { ArrowUpRight, Github, LinkIcon } from "lucide-react"
import { useRef } from "react"
import Image from "next/image"

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const projects = [
    {
      title: "MedX - Blockchain-Powered Medicine Supply Chain",
      description:
        "A blockchain-based supply chain solution for medicine tracking and verification, ensuring authenticity and reducing counterfeit drugs in the market.",
      tags: ["Next.js", "MongoDB", "Solidity", "Web3.js", "Tailwind CSS"],
      image: "/medx-project.jpg",
      problem:
        "Counterfeit medicines pose a serious threat to public health. Traditional supply chains lack transparency and traceability.",
      solution:
        "Designed a decentralized supply chain solution for pharmaceuticals using Ethereum smart contracts to enable real-time tracking of medicine batches from manufacturers to retailers.",
      experience:
        "Built a modern, responsive dashboard with real-time tracking, authentication system, and blockchain integration for secure medicine verification.",
      github: "https://github.com/yourusername/medx",
      demo: "https://medx-demo.vercel.app",
    },
    {
      title: "Samsung PRISM - AI Photo Filter Recommendation",
      description:
        "An AI-powered system developed in collaboration with Samsung R&D that analyzes images and recommends optimal filters and enhancements based on content, lighting, and composition.",
      tags: ["Python", "PyTorch", "Vision Transformers", "GANs", "Deep Learning"],
      image: "/samsung-prism.jpg",
      problem: "Finding the right filter for photos is time-consuming and often requires trial and error. Users struggle to achieve consistent, professional-looking results.",
      solution:
        "Created a custom dataset of 30,000 images across categories like food, nature, and people. Trained a hybrid Vision Transformer and GAN model to analyze image content and suggest optimal filters.",
      experience: "Achieved 88% classification accuracy and significantly improved visual output quality through automated filter enhancement. Reduced average editing time by 60%.",
      github: "https://github.com/yourusername/samsung-prism",
      demo: "https://samsung-prism-demo.vercel.app",
    },
    {
      title: "Walletway - Smart Expense Tracker & Splitter",
      description: "A modern full-stack web application that simplifies group expense management with real-time synchronization, smart categorization, and intuitive bill splitting.",
      tags: ["React", "MongoDB", "Node.js", "Express", "Socket.io", "TailwindCSS"],
      image: "/walletway-project.jpg",
      problem: "Managing shared expenses in groups is often complicated and leads to confusion. Traditional methods lack real-time updates and clear expense visualization.",
      solution: "Implemented secure user authentication, real-time transaction tracking, and smart categorization. Built an intuitive interface for easy bill splitting and expense management.",
      experience: "Integrated interactive charts and analytics for financial insights. Reduced payment settlement time by 75% and improved group expense tracking accuracy.",
      github: "https://github.com/yourusername/walletway",
      demo: "https://walletway-demo.vercel.app",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section id="projects" ref={ref} className="min-h-screen flex flex-col justify-center py-12 md:py-20">
      <div className="px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 relative inline-block">
            PROJECTS
            <motion.span
              className="absolute -bottom-2 left-0 h-0.5 bg-white"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl">
            A selection of my recent work, showcasing my skills in various technologies and problem domains. Each
            project represents a unique challenge and solution.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8 md:space-y-16"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 border border-white border-opacity-10 p-4 md:p-8"
            >
              <div className="relative aspect-[16/9] overflow-hidden group flex items-center justify-center my-auto">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
                        aria-label="View GitHub repository"
                      >
                        <Github className="w-4 h-4 md:w-5 md:h-5" />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
                        aria-label="View live demo"
                      >
                        <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{project.title}</h3>
                <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4 text-justify">{project.description}</p>

                <div className="mb-4 md:mb-6">
                  <h4 className="text-base md:text-lg font-semibold mb-1 md:mb-2">Problem</h4>
                  <p className="text-sm md:text-base text-gray-400 text-justify">{project.problem}</p>
                </div>

                <div className="mb-4 md:mb-6">
                  <h4 className="text-base md:text-lg font-semibold mb-1 md:mb-2">Solution</h4>
                  <p className="text-sm md:text-base text-gray-400 text-justify">{project.solution}</p>
                </div>

                <div className="mb-4 md:mb-6">
                  <h4 className="text-base md:text-lg font-semibold mb-1 md:mb-2">User Experience</h4>
                  <p className="text-sm md:text-base text-gray-400 text-justify">{project.experience}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs px-2 py-1 border border-white border-opacity-20">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 md:mt-6 flex flex-wrap gap-3 md:gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs md:text-sm border border-white px-3 md:px-4 py-1.5 md:py-2 hover:bg-white hover:text-black transition-all duration-300"
                      aria-label="View code on GitHub"
                    >
                      <Github className="w-3 h-3 md:w-4 md:h-4" />
                      View Code
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs md:text-sm border border-white px-3 md:px-4 py-1.5 md:py-2 hover:bg-white hover:text-black transition-all duration-300"
                      aria-label="View live demo"
                    >
                      <LinkIcon className="w-3 h-3 md:w-4 md:h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
