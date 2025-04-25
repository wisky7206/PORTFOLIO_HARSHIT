"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import { useRef } from "react"

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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
    <section id="contact" ref={ref} className="min-h-screen flex flex-col justify-center py-20">
      <div className="px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-6 relative inline-block">
            CONTACT
            <motion.span
              className="absolute -bottom-2 left-0 h-0.5 bg-white"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl">
            Interested in working together or have a question? Feel free to reach out through any of the channels below
            or by filling out the contact form.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <div className="space-y-8">
              <motion.div variants={itemVariants} className="flex items-start gap-4">
                <div className="p-3 border border-white border-opacity-20">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Email</h3>
                  <p className="text-gray-300">harshitrustagi96@gmail.com</p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-start gap-4">
                <div className="p-3 border border-white border-opacity-20">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Phone</h3>
                  <p className="text-gray-300">+91 7206096651</p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-start gap-4">
                <div className="p-3 border border-white border-opacity-20">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Location</h3>
                  <p className="text-gray-300">Chennai, Tamil Nadu, India</p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Connect</h3>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/wisky7206"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-white border-opacity-20 hover:bg-white hover:text-black transition-all duration-300"
                    aria-label="GitHub"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/harshit-rustagi-84879a266"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-white border-opacity-20 hover:bg-white hover:text-black transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="https://twitter.com/harshit_rustagi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-white border-opacity-20 hover:bg-white hover:text-black transition-all duration-300"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 bg-transparent border border-white border-opacity-20 focus:border-opacity-100 outline-none transition-all duration-300"
                    required
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 bg-transparent border border-white border-opacity-20 focus:border-opacity-100 outline-none transition-all duration-300"
                    required
                  />
                </motion.div>
              </div>
              <motion.div variants={itemVariants}>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full p-3 bg-transparent border border-white border-opacity-20 focus:border-opacity-100 outline-none transition-all duration-300"
                  required
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block mb-2 text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full p-3 bg-transparent border border-white border-opacity-20 focus:border-opacity-100 outline-none transition-all duration-300 resize-none"
                  required
                ></textarea>
              </motion.div>
              <motion.button
                variants={itemVariants}
                type="submit"
                className="w-full py-3 px-6 bg-transparent border border-white hover:bg-white hover:text-black transition-all duration-300 font-medium"
              >
                SEND MESSAGE
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          className="mt-20 text-center text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p>© {new Date().getFullYear()} Harshit Rustagi. All rights reserved.</p>
        </motion.div>
      </div>
    </section>
  )
}
