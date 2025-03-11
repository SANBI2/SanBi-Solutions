"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { Shield, Award, Target, Users, CheckCircle, Calendar, MapPin, Mail, Phone, Lock } from "lucide-react"
import { useCallback, useState, useEffect } from "react"
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import type { Container, Engine } from "tsparticles-engine"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TypewriterEffect } from "@/components/typewriter-effect"
import { CountUp } from "@/components/count-up"

// Team members data
const teamMembers = [
  {
    name: "Sarah Johnson",
    position: "Chief Executive Officer",
    bio: "With over 15 years in cybersecurity, Sarah leads our strategic vision and operations.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Michael Chen",
    position: "Chief Technology Officer",
    bio: "Michael brings 12+ years of experience in developing cutting-edge security solutions.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Aisha Patel",
    position: "Security Research Director",
    bio: "Leading our research team, Aisha specializes in threat intelligence and vulnerability assessment.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "David Rodriguez",
    position: "Client Solutions Manager",
    bio: "David ensures our clients receive tailored security solutions that meet their specific needs.",
    image: "/placeholder.svg?height=300&width=300",
  },
]

// Company values
const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We uphold the highest ethical standards in all our operations and client relationships.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in every security solution we deliver.",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "We continuously innovate to stay ahead of evolving cyber threats.",
  },
  {
    icon: CheckCircle,
    title: "Reliability",
    description: "Our clients can depend on us for consistent, reliable security services.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work closely with our clients to develop customized security strategies.",
  },
]

// Timeline milestones
const milestones = [
  {
    year: "2015",
    title: "Company Founded",
    description: "SanBi Solutions was established with a mission to provide advanced cybersecurity services.",
  },
  {
    year: "2017",
    title: "First Major Client",
    description: "Secured our first enterprise client and expanded our team to 15 security professionals.",
  },
  {
    year: "2019",
    title: "Research Division Launch",
    description: "Established our dedicated cybersecurity research division to stay ahead of emerging threats.",
  },
  {
    year: "2021",
    title: "International Expansion",
    description: "Opened offices in three new countries to serve our growing international client base.",
  },
  {
    year: "2023",
    title: "Industry Recognition",
    description: "Received multiple industry awards for our innovative security solutions and services.",
  },
]

// Stats
const stats = [
  { value: 500, label: "Clients Protected" },
  { value: 99.9, label: "Uptime Percentage", suffix: "%" },
  { value: 15000, label: "Threats Blocked Monthly" },
  { value: 24, label: "Countries Served" },
]

export default function AboutPage() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Optional: Add any initialization after particles are loaded
  }, [])

  // For section animations
  const [isVisible, setIsVisible] = useState({
    values: false,
    team: false,
    journey: false,
    stats: false,
    contact: false,
  })

  useEffect(() => {
    const handleScroll = () => {
      const valuesSection = document.getElementById("values-section")
      const teamSection = document.getElementById("team-section")
      const journeySection = document.getElementById("journey-section")
      const statsSection = document.getElementById("stats-section")
      const contactSection = document.getElementById("contact-section")

      if (valuesSection) {
        const rect = valuesSection.getBoundingClientRect()
        setIsVisible((prev) => ({ ...prev, values: rect.top < window.innerHeight * 0.75 }))
      }

      if (teamSection) {
        const rect = teamSection.getBoundingClientRect()
        setIsVisible((prev) => ({ ...prev, team: rect.top < window.innerHeight * 0.75 }))
      }

      if (journeySection) {
        const rect = journeySection.getBoundingClientRect()
        setIsVisible((prev) => ({ ...prev, journey: rect.top < window.innerHeight * 0.75 }))
      }

      if (statsSection) {
        const rect = statsSection.getBoundingClientRect()
        setIsVisible((prev) => ({ ...prev, stats: rect.top < window.innerHeight * 0.75 }))
      }

      if (contactSection) {
        const rect = contactSection.getBoundingClientRect()
        setIsVisible((prev) => ({ ...prev, contact: rect.top < window.innerHeight * 0.75 }))
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Trigger once on mount
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Typewriter words
  const words = [
    {
      text: "Our",
    },
    {
      text: "Story",
    },
    {
      text: "&",
    },
    {
      text: "Mission",
      className: "text-blue-500 dark:text-[#00a8ff]",
    },
  ]

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Particles
        className="particles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 120,
          particles: {
            color: { value: "#1e3a8a" },
            links: {
              color: "#1e3a8a",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: false,
              straight: false,
              outModes: { default: "bounce" },
            },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
          interactivity: {
            events: { onHover: { enable: true, mode: "grab" } },
            modes: { grab: { distance: 140, links: { opacity: 0.5 } } },
          },
          background: { color: { value: "transparent" } },
        }}
      />

      {/* Hero Section */}
      <section className="container relative mx-auto py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="flex flex-col justify-center space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 max-w-2xl"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center rounded-full border border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-white/5 px-3 py-1 text-sm text-gray-800 dark:text-white backdrop-blur-xl"
              >
                <Shield className="mr-2 h-4 w-4" />
                About SanBi Solutions
              </motion.div>

              {/* Hero Heading with Typewriter */}
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold">
                <TypewriterEffect words={words} />
              </div>

              {/* Hero Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-lg md:text-xl text-gray-700 dark:text-gray-400"
              >
                Founded in 2015, SanBi Solutions has grown to become a trusted leader in cybersecurity. Our mission is
                to protect organizations from evolving digital threats through innovative security solutions and expert
                guidance.
              </motion.p>
            </motion.div>

            {/* Animated button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Button
                size="lg"
                className="bg-blue-500 dark:bg-[#00a8ff] hover:bg-blue-600 dark:hover:bg-[#0097e6] text-white rounded-full px-8 relative overflow-hidden group"
                asChild
              >
                <Link href="/contact">
                  <span className="relative z-10">Get in Touch</span>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Image with animation */}
          <div className="relative">
            <div className="absolute inset-0">
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#00a8ff] rounded-full mix-blend-multiply filter blur-xl opacity-20"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 7,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 7,
                  delay: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative w-[400px] h-[400px] mx-auto"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-64 h-64 rounded-full border-4 border-blue-500/30 dark:border-[#00a8ff]/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-48 h-48 rounded-full border-4 border-purple-500/20 dark:border-purple-400/20"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              </div>
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="About SanBi Solutions"
                width={400}
                height={400}
                className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section id="values-section" className="py-16 bg-background/50 backdrop-blur-sm">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center text-3xl font-bold"
          >
            Our Core Values
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible.values ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}>
                  <value.icon className="mb-4 h-12 w-12 text-primary" />
                </motion.div>
                <h3 className="mb-2 font-semibold">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" className="py-16">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center text-3xl font-bold"
          >
            Our Impact
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible.stats ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {isVisible.stats && <CountUp end={stat.value} suffix={stat.suffix} />}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section id="team-section" className="py-16 bg-background/50 backdrop-blur-sm">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center text-3xl font-bold"
          >
            Meet Our Leadership Team
          </motion.h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible.team ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="p-4 text-white">
                      <p className="text-sm">{member.bio}</p>
                    </div>
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary font-medium">{member.position}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section id="journey-section" className="py-16">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center text-3xl font-bold"
          >
            Our Journey
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isVisible.journey ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.5 }}
              style={{ transformOrigin: "top" }}
              className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform -translate-x-1/2"
            />

            {/* Timeline items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isVisible.journey ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                    <h3 className="text-xl font-bold">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{milestone.description}</p>
                  </div>

                  {/* Year bubble */}
                  <motion.div
                    className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center"
                    whileHover={{ scale: 1.2 }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold z-10"
                      initial={{ scale: 0 }}
                      animate={isVisible.journey ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: index * 0.2 + 0.3, duration: 0.3 }}
                    >
                      <Calendar className="h-5 w-5" />
                    </motion.div>
                  </motion.div>

                  {/* Year */}
                  <div className={`w-5/12 ${index % 2 === 0 ? "text-left pl-8" : "text-right pr-8"}`}>
                    <motion.span
                      className="text-xl font-bold text-primary"
                      initial={{ opacity: 0 }}
                      animate={isVisible.journey ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: index * 0.2 + 0.2, duration: 0.5 }}
                    >
                      {milestone.year}
                    </motion.span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information
      <section id="contact-section" className="py-16 bg-background/50 backdrop-blur-sm">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center text-3xl font-bold"
          >
            Get In Touch
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Our Location",
                content: "123 Security Avenue<br />Tech District<br />San Francisco, CA 94105",
              },
              { icon: Mail, title: "Email Us", content: "info@sanbisolutions.com<br />support@sanbisolutions.com" },
              { icon: Phone, title: "Call Us", content: "+1 (555) 123-4567<br />Mon-Fri: 9am - 5pm PST" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible.contact ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg"
              >
                <motion.div
                  className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon className="h-6 w-6 text-primary" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.content }} />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible.contact ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button
              size="lg"
              className="bg-blue-500 dark:bg-[#00a8ff] hover:bg-blue-600 dark:hover:bg-[#0097e6] text-white rounded-full px-8 relative overflow-hidden group"
              asChild
            >
              <Link href="/contact">
                <span className="relative z-10">Contact Us</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section> */}

      {/* Floating security icons */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        {[Lock, Shield, CheckCircle].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-primary/10 dark:text-primary/5"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + index * 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 2,
            }}
          >
            <Icon size={30 + index * 10} />
          </motion.div>
        ))}
      </div>
    </main>
  )
}

