"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import Link from "next/link"
import { useState } from "react"
import HeaderDiv from "./header-div"
import { DynamicIcon, IconName } from "lucide-react/dynamic"
import { Config } from "@prisma/client"

export function ContactSection({ config }: { config: Config }) {
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

  const socialMedia = config?.socialMedia as { url: string; icon: string }[] ?? []
  const contactInfo = config?.contactInfo as { label: string; icon: string; value: string }[] ?? []


  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto p-[2rem] relative z-10">
        <HeaderDiv tag="Get In Touch" title="Contact Me" description={`Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you.`} />

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
                <motion.div variants={formItemVariants} className="flex justify-start mt-5">
                  <Link href={`mailto:useyor@gmail.com?subject${subject}&body=${message}`} rel="noopener noreferrer" target="_blank" className="relative overflow-hidden group bg-primary p-4 mt-10" >
                    <span className="relative z-10">Send Message</span>
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
                {contactInfo.length > 0 ? contactInfo.map((item, index) => (
                  <div
                    key={index}
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
                          <DynamicIcon name={item.icon as IconName} className="" />
                        </motion.div>
                        <div>
                          <h4 className="text-lg font-semibold">{item.label}</h4>
                          <p className="text-muted-foreground group-hover: transition-colors duration-300">
                            {item.value}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )) : null}
              </motion.div>

              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4">Follow Me</h3>
                <motion.div
                  className="flex gap-4"
                >
                  {socialMedia?.length > 0 ? socialMedia.map((item, index) => (
                    <div key={index}>
                      <Link href={item.url} rel="noopener noreferrer" target="_blank">
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
                            <DynamicIcon name={item.icon as IconName} className="" />
                          </svg>
                          <span className="sr-only">{item.url}</span>
                        </Button>
                      </Link>
                    </div>
                  )) : <p>No contact info available</p>}
                </motion.div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}

