"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { BookOpen, Download, Eye, Search, Filter } from "lucide-react"
import { useCallback, useState, useEffect } from "react"
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import type { Container, Engine } from "tsparticles-engine"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { TypewriterEffect } from "@/components/typewriter-effect"

// Sample ebooks data
const ebooks = [
  {
    id: 1,
    title: "The Complete Guide to Zero Trust Security",
    description:
      "A comprehensive guide to implementing Zero Trust architecture in your organization, with practical steps and real-world examples.",
    pages: 48,
    level: "Intermediate",
    category: "Security Architecture",
    image: "/placeholder.svg?height=300&width=200",
    popular: true,
  },
  {
    id: 2,
    title: "Ransomware Defense Playbook",
    description:
      "Essential strategies to prevent, detect, and recover from ransomware attacks with detailed response procedures.",
    pages: 36,
    level: "All Levels",
    category: "Threat Defense",
    image: "/placeholder.svg?height=300&width=200",
    popular: true,
  },
  {
    id: 3,
    title: "Cloud Security Best Practices",
    description:
      "Learn how to secure your cloud infrastructure across AWS, Azure, and Google Cloud with this comprehensive guide.",
    pages: 52,
    level: "Advanced",
    category: "Cloud Security",
    image: "/placeholder.svg?height=300&width=200",
    popular: false,
  },
  {
    id: 4,
    title: "Security Awareness Training Guide",
    description:
      "Build an effective security awareness program that transforms employees from vulnerabilities into your first line of defense.",
    pages: 32,
    level: "Beginner",
    category: "Security Awareness",
    image: "/placeholder.svg?height=300&width=200",
    popular: false,
  },
  {
    id: 5,
    title: "CISO's Guide to Board Communication",
    description:
      "Learn how to effectively communicate security risks, needs, and wins to executive leadership and board members.",
    pages: 28,
    level: "Advanced",
    category: "Leadership",
    image: "/placeholder.svg?height=300&width=200",
    popular: true,
  },
  {
    id: 6,
    title: "Compliance Framework Simplified",
    description:
      "Navigate complex compliance requirements with this simplified guide to GDPR, CCPA, HIPAA, PCI DSS, and more.",
    pages: 64,
    level: "Intermediate",
    category: "Compliance",
    image: "/placeholder.svg?height=300&width=200",
    popular: false,
  },
]

// Categories for filtering
const categories = [
  "All Categories",
  "Security Architecture",
  "Threat Defense",
  "Cloud Security",
  "Security Awareness",
  "Leadership",
  "Compliance",
]

// Levels for filtering
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"]

export default function EbooksPage() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Optional: Add any initialization after particles are loaded
  }, [])

  // For section animations
  const [isVisible, setIsVisible] = useState({
    ebooks: false,
    featured: false,
  })

  useEffect(() => {
    const handleScroll = () => {
      const ebooksSection = document.getElementById("ebooks-section")
      const featuredSection = document.getElementById("featured-section")

      if (ebooksSection) {
        const rect = ebooksSection.getBoundingClientRect()
        setIsVisible((prev) => ({ ...prev, ebooks: rect.top < window.innerHeight * 0.75 }))
      }

      if (featuredSection) {
        const rect = featuredSection.getBoundingClientRect()
        setIsVisible((prev) => ({ ...prev, featured: rect.top < window.innerHeight * 0.75 }))
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Trigger once on mount
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedLevel, setSelectedLevel] = useState("All Levels")

  // Filter ebooks based on search and filters
  const filteredEbooks = ebooks.filter((ebook) => {
    const matchesSearch =
      ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ebook.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || ebook.category === selectedCategory
    const matchesLevel = selectedLevel === "All Levels" || ebook.level === selectedLevel
    return matchesSearch && matchesCategory && matchesLevel
  })

  // Featured ebooks (popular ones)
  const featuredEbooks = ebooks.filter((ebook) => ebook.popular)

  // Typewriter words
  const words = [
    {
      text: "Cybersecurity",
    },
    {
      text: "E-Books",
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
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-white/5 px-3 py-1 text-sm text-gray-800 dark:text-white backdrop-blur-xl"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              SanBi Media Center
            </motion.div>

            {/* Hero Heading with Typewriter */}
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight flex justify-center">
              <TypewriterEffect words={words} />
            </div>

            {/* Hero Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-lg md:text-xl text-gray-700 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Comprehensive guides and educational resources to help you navigate the complex world of cybersecurity.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured E-Books Section */}
      <section id="featured-section" className="container mx-auto mb-16">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold mb-8">
          Featured E-Books
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredEbooks.map((ebook, index) => (
            <motion.div
              key={ebook.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible.featured ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="relative"
            >
              <div className="absolute top-0 right-0 z-10">
                <Badge className="bg-yellow-500 text-white">Popular</Badge>
              </div>
              <Card className="h-full overflow-hidden hover:shadow-lg transition-all">
                <div className="flex flex-col md:flex-row p-6 gap-4">
                  <div className="flex-shrink-0 mx-auto md:mx-0">
                    <Image
                      src={ebook.image || "/placeholder.svg"}
                      alt={ebook.title}
                      width={100}
                      height={150}
                      className="w-24 h-36 object-cover rounded-md shadow-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold mb-2">{ebook.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{ebook.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="text-xs">
                        {ebook.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {ebook.level}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {ebook.pages} pages
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="group" asChild>
                        <Link href={`/ebooks/${ebook.id}`}>
                          <Eye className="mr-1 h-4 w-4" />
                          Preview
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" className="group">
                        <Download className="mr-1 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="container mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search e-books..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                className="pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <select
                className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
      </section>

      {/* All E-Books Section */}
      <section id="ebooks-section" className="container mx-auto pb-20">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold mb-8">
          All E-Books
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEbooks.map((ebook, index) => (
            <motion.div
              key={ebook.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible.ebooks ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-all">
                <div className="p-6 flex flex-col items-center">
                  <div className="mb-4 relative">
                    <Image
                      src={ebook.image || "/placeholder.svg"}
                      alt={ebook.title}
                      width={120}
                      height={180}
                      className="w-32 h-48 object-cover rounded-md shadow-md transition-transform duration-500 hover:scale-105"
                    />
                    {ebook.popular && (
                      <div className="absolute top-0 right-0">
                        <Badge className="bg-yellow-500 text-white">Popular</Badge>
                      </div>
                    )}
                  </div>
                  <CardHeader className="p-0 text-center">
                    <CardTitle className="text-lg">{ebook.title}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">{ebook.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 mt-4 text-center">
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      <Badge variant="outline" className="text-xs">
                        {ebook.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {ebook.level}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {ebook.pages} pages
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-0 mt-4">
                    <div className="flex gap-2">
                      <Button size="sm" className="group" asChild>
                        <Link href={`/ebooks/${ebook.id}`}>
                          <Eye className="mr-1 h-4 w-4" />
                          Preview
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" className="group">
                        <Download className="mr-1 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardFooter>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No results message */}
        {filteredEbooks.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-lg text-muted-foreground">No e-books found matching your search criteria.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All Categories")
                setSelectedLevel("All Levels")
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </section>

      {/* Floating book icons */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        {[BookOpen].map((Icon, index) => (
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

