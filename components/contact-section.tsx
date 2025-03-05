"use client"

import { Mail, MapPin, Phone } from "lucide-react"
import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import Link from "next/link"
import { useState } from "react"

export function ContactSection() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto p-[2rem] relative z-10">
        <ScrollAnimation>
          <div className="flex flex-col items-center text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Get In Touch
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Me</h2>
            <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
              {`Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you.`}
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid gap-8 md:grid-cols-2">
          <ScrollAnimation
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
              <motion.form
                className="grid gap-4"
                variants={formVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div className="grid gap-2" variants={formItemVariants}>
                  <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" className="focus:ring-2 ring-primary/20 transition-all duration-300" />
                </motion.div>
                <motion.div className="grid gap-2" variants={formItemVariants}>
                  <Textarea
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    placeholder="Your Message"
                    className="min-h-[150px] focus:ring-2 ring-primary/20 transition-all duration-300"
                  />
                </motion.div>
                <motion.div variants={formItemVariants}>
                  <Link href={`mailto:useyor@gmail.com?subject${subject}&body=${message}`} rel="noopener noreferrer" target="_blank" className="relative overflow-hidden group bg-primary p-4 mt-10" >
                    {/* <Button onClick={(e) => e.defaultPrevented()} size="lg" className=""> */}
                      <span className="relative z-10">Send Message</span>
                      {/* <span className="absolute inset-0 bg-primary/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span> */}
                    {/* </Button> */}
                  </Link>
                </motion.div>
              </motion.form>
            </div>
          </ScrollAnimation>

          <ScrollAnimation
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <motion.div
                className="grid gap-4"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2,
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { icon: <Mail className="h-6 w-6 text-primary" />, title: "Email", content: "useyor@gmail.com" },
                  { icon: <Phone className="h-6 w-6 text-primary" />, title: "Phone", content: "+62 851 7333 7559" },
                  {
                    icon: <MapPin className="h-6 w-6 text-primary" />,
                    title: "Location",
                    content: "Bekasi, Jawa Barat, Indonesia",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5 },
                      },
                    }}
                  >
                    <Card className="group hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6 flex items-center gap-4">
                        <motion.div
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "rgba(59, 130, 246, 0.2)",
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.icon}
                        </motion.div>
                        <div>
                          <h4 className="text-lg font-semibold">{item.title}</h4>
                          <p className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
                            {item.content}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4">Follow Me</h3>
                <motion.div
                  className="flex gap-4"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    { icon: "github", label: "GitHub", value: 'https://github.com/kepsgurih' },
                    { icon: "linkedin", label: "LinkedIn", value: 'https://id.linkedin.com/in/kepsgurih' },
                    { icon: "instagram", label: "Instagram", value: 'https://instagram.com/selotob' },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: {
                          opacity: 1,
                          scale: 1,
                          transition: { duration: 0.3 },
                        },
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link href={item.value} rel="noopener noreferrer" target="_blank">
                        <Button variant="outline" size="icon" className="rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`lucide lucide-${item.icon}`}
                          >
                            {item.icon === "github" && (
                              <>
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                                <path d="M9 18c-4.51 2-5-2-7-2"></path>
                              </>
                            )}
                            {item.icon === "linkedin" && (
                              <>
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect width="4" height="12" x="2" y="9"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                              </>
                            )}
                            {item.icon === "twitter" && (
                              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                            )}
                            {item.icon === "instagram" && (
                              <>
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                              </>
                            )}
                          </svg>
                          <span className="sr-only">{item.label}</span>
                        </Button>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(50px)",
            }}
            animate={{
              x: [Math.random() * 100, Math.random() * -100],
              y: [Math.random() * 100, Math.random() * -100],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </section>
  )
}

