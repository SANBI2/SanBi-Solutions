"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Shield,
  Globe,
  Laptop2,
  Lock,
  ShieldAlert,
  Users,
  ArrowRight,
  BookOpen,
  FileText,
  Newspaper,
} from "lucide-react"
import { useCallback, useState, useEffect } from "react"
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import type { Container, Engine } from "tsparticles-engine"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ContactUs } from "@/components/contactUs"
import { TypewriterEffect } from "@/components/typewriter-effect"
import { CountUp } from "@/components/count-up"

const services = [
  {
    icon: Globe,
    title: "Network Security",
    description: "Protect your network infrastructure",
  },
  {
    icon: Laptop2,
    title: "Endpoint Security",
    description: "Secure all your devices",
  },
  {
    icon: Lock,
    title: "Data Protection",
    description: "Keep your data safe and private",
  },
  {
    icon: ShieldAlert,
    title: "Incident Response",
    description: "Quick response to security incidents",
  },
  {
    icon: Users,
    title: "Awareness Training",
    description: "Train your team in security best practices",
  },
]

const mediaSections = [
  {
    title: "Security Insights Blog",
    description: "Stay sharp with expert cybersecurity blogs and insights.",
    icon: Lock,
    link: "/blog",
  },
  {
    title: "E-Books",
    description: "Comprehensive guides and educational resources.",
    icon: BookOpen,
    link: "/ebooks",
  },
  {
    title: "Research Papers",
    description: "In-depth analysis and technical publications.",
    icon: FileText,
    link: "/research",
  },
  {
    title: "Security News",
    description: "Latest updates from the cybersecurity world.",
    icon: Newspaper,
    link: "/news",
  },
]

// Stats for the new stats section
const stats = [
  { value: 500, label: "Clients Protected" },
  { value: 99.9, label: "Uptime Percentage", suffix: "%" },
  { value: 15000, label: "Threats Blocked Monthly" },
  { value: 24, label: "Countries Served" },
]

export default function Home() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Optional: Add any initialization after particles are loaded
  }, [])

  const [showContactForm, setShowContactForm] = useState(false)

  // For section animations
  const [isVisible, setIsVisible] = useState({
    services: false,
    stats: false,
    media: false,
  })

  useEffect(() => {
    const handleScroll = () => {
      const servicesSection = document.getElementById("services-section")
      const statsSection = document.getElementById("stats-section")
      const mediaSection = document.getElementById("media-section")

      if (servicesSection) {
        const rect = servicesSection.getBoundingClientRect()
        setIsVisible((prev) => ({ ...prev, services: rect.top < window.innerHeight * 0.75 }))
      }

      if (statsSection) {
        const rect = statsSection.getBoundingClientRect()
        setIsVisible((prev) => ({ ...prev, stats: rect.top < window.innerHeight * 0.75 }))
      }

      if (mediaSection) {
        const rect = mediaSection.getBoundingClientRect()
        setIsVisible((prev) => ({ ...prev, media: rect.top < window.innerHeight * 0.75 }))
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
      text: "Securing",
    },
    {
      text: "Your",
    },
    {
      text: "Digital",
    },
    {
      text: "Future",
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

      {/* Content */}
      <div className="container relative mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 min-h-screen items-center">
          {/* Left Column */}
          <div className="flex flex-col justify-center space-y-8 pt-20 lg:pt-0">
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
                Advanced Security Solutions
              </motion.div>

              {/* Hero Heading with Typewriter */}
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <TypewriterEffect words={words} />
              </div>

              {/* Hero Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-lg md:text-xl text-gray-700 dark:text-gray-400"
              >
                Advanced cybersecurity solutions to protect your business from evolving threats. Trust SanBi to
                safeguard your digital assets.
              </motion.p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-blue-500 dark:bg-[#00a8ff] hover:bg-blue-600 dark:hover:bg-[#0097e6] text-white rounded-full px-8 relative overflow-hidden group"
              >
                <span className="relative z-10">Explore Our Services</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-gray-900 dark:text-white border-gray-300 dark:border-white/20 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full px-8 backdrop-blur-sm"
                onClick={() => setShowContactForm(true)}
              >
                <motion.span whileHover={{ scale: 1.05 }}>Contact Us</motion.span>
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Floating Elements */}
          <div className="relative hidden lg:block">
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
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 7,
                  delay: 4,
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
                src="/hero1.png"
                alt="Cybersecurity Illustration"
                width={400}
                height={400}
                className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>

      {showContactForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <ContactUs />
            <Button className="mt-4" onClick={() => setShowContactForm(false)}>
              Close
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Stats Section - New */}
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

      {/* Services Section */}
      <section id="services-section" className="py-16 bg-background/50 backdrop-blur-sm">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center text-3xl font-bold"
          >
            Our Services
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible.services ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-6 shadow-lg transition-all hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}>
                  <service.icon className="mb-4 h-12 w-12 text-primary" />
                </motion.div>
                <h3 className="mb-2 font-semibold">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section id="media-section" className="py-16">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white"
          >
            Media Center
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-2">
            {mediaSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible.media ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="h-full transition-all hover:shadow-lg">
                  <CardHeader>
                    <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}>
                      <section.icon className="mb-2 h-8 w-8 text-primary" />
                    </motion.div>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="group" asChild>
                      <Link href={section.link}>
                        Explore
                        <motion.div className="inline-block ml-2" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating security icons */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        {[Lock, Shield, ShieldAlert].map((Icon, index) => (
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

