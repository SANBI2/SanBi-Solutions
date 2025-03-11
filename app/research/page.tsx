"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { FileText, Download, ArrowRight, Search, Filter, Calendar, User } from "lucide-react"
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

// Sample research papers data
const researchPapers = [
  {
    id: 1,
    title: "Advanced Persistent Threats: Detection and Mitigation Strategies",
    abstract:
      "This paper presents a comprehensive analysis of Advanced Persistent Threats (APTs) and proposes novel detection and mitigation strategies based on machine learning algorithms.",
    authors: ["Dr. Sarah Johnson", "Dr. Michael Chen"],
    date: "February 2025",
    category: "Threat Intelligence",
    tags: ["APT", "Machine Learning", "Threat Detection"],
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 2,
    title: "Quantum-Resistant Cryptographic Algorithms: A Comparative Analysis",
    abstract:
      "As quantum computing advances, this research evaluates the effectiveness of post-quantum cryptographic algorithms and their implementation challenges in existing security infrastructures.",
    authors: ["Dr. Aisha Patel", "Dr. Thomas Weber"],
    date: "January 2025",
    category: "Cryptography",
    tags: ["Quantum Computing", "Cryptography", "Post-Quantum"],
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 3,
    title: "Zero-Day Vulnerability Discovery Using Automated Fuzzing Techniques",
    abstract:
      "This paper introduces a novel fuzzing framework that significantly improves the efficiency of zero-day vulnerability discovery in complex software systems.",
    authors: ["Dr. David Rodriguez", "Emma Wilson"],
    date: "December 2024",
    category: "Vulnerability Research",
    tags: ["Fuzzing", "Zero-Day", "Vulnerability Discovery"],
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
  },
  {
    id: 4,
    title: "Blockchain Security: Vulnerabilities and Countermeasures in Smart Contracts",
    abstract:
      "A detailed examination of security vulnerabilities in smart contracts and blockchain implementations, with proposed countermeasures and best practices.",
    authors: ["Dr. James Wilson", "Dr. Lisa Chen"],
    date: "November 2024",
    category: "Blockchain",
    tags: ["Blockchain", "Smart Contracts", "DeFi Security"],
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
  },
  {
    id: 5,
    title: "AI-Driven Security Operations: Automating Incident Response",
    abstract:
      "This research demonstrates how artificial intelligence can be leveraged to automate and enhance security incident response processes, reducing response times by 60%.",
    authors: ["Dr. Robert Kim", "Dr. Elena Petrova"],
    date: "October 2024",
    category: "Security Operations",
    tags: ["AI", "Automation", "Incident Response"],
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 6,
    title: "Supply Chain Security: Detecting Compromises in the Software Development Lifecycle",
    abstract:
      "In light of recent supply chain attacks, this paper presents methodologies for detecting compromises throughout the software development lifecycle.",
    authors: ["Dr. Carlos Mendez", "Dr. Sophia Lee"],
    date: "September 2024",
    category: "Supply Chain Security",
    tags: ["Supply Chain", "SDLC", "Software Security"],
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
  },
]

// Categories for filtering
const categories = [
  "All Categories",
  "Threat Intelligence",
  "Cryptography",
  "Vulnerability Research",
  "Blockchain",
  "Security Operations",
  "Supply Chain Security",
]

export default function ResearchPage() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Optional: Add any initialization after particles are loaded
  }, [])

  // For section animations
  const [isVisible, setIsVisible] = useState({
    papers: false,
    featured: false,
  })

  useEffect(() => {
    const handleScroll = () => {
      const papersSection = document.getElementById("papers-section")
      const featuredSection = document.getElementById("featured-section")

      if (papersSection) {
        const rect = papersSection.getBoundingClientRect()
        setIsVisible((prev) => ({ ...prev, papers: rect.top < window.innerHeight * 0.75 }))
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

  // Filter papers based on search and category
  const filteredPapers = researchPapers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.some((author) => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      paper.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "All Categories" || paper.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Featured papers
  const featuredPapers = researchPapers.filter((paper) => paper.featured)

  // Typewriter words
  const words = [
    {
      text: "Research",
    },
    {
      text: "Papers",
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
              <FileText className="mr-2 h-4 w-4" />
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
              In-depth analysis and technical publications from our cybersecurity research team, advancing the field
              through innovation and discovery.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured Research Papers Section */}
      <section id="featured-section" className="container mx-auto mb-16">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold mb-8">
          Featured Research
        </motion.h2>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredPapers.slice(0, 2).map((paper, index) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible.featured ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-all">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <Image
                      src={paper.image || "/placeholder.svg"}
                      alt={paper.title}
                      width={400}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue-500 text-white">Featured</Badge>
                      <Badge variant="outline">{paper.category}</Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{paper.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{paper.abstract}</p>
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <User className="h-4 w-4 mr-1" />
                      {paper.authors.join(", ")}
                      <span className="mx-2">•</span>
                      <Calendar className="h-4 w-4 mr-1" />
                      {paper.date}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {paper.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="group" asChild>
                        <Link href={`/research/${paper.id}`}>
                          Read Full Paper
                          <motion.div
                            className="inline-block ml-2"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </motion.div>
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" className="group">
                        <Download className="mr-1 h-4 w-4" />
                        Download PDF
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
                placeholder="Search research papers..."
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
          </div>
        </motion.div>
      </section>

      {/* All Research Papers Section */}
      <section id="papers-section" className="container mx-auto pb-20">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold mb-8">
          All Research Papers
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {filteredPapers.map((paper, index) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible.papers ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {paper.featured && <Badge className="bg-blue-500 text-white">Featured</Badge>}
                    <Badge variant="outline">{paper.category}</Badge>
                  </div>
                  <CardTitle className="line-clamp-2">{paper.title}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <User className="h-4 w-4 mr-1" />
                    {paper.authors.join(", ")}
                    <span className="mx-2">•</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    {paper.date}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">{paper.abstract}</CardDescription>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {paper.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2">
                    <Button size="sm" className="group" asChild>
                      <Link href={`/research/${paper.id}`}>
                        Read Full Paper
                        <motion.div className="inline-block ml-2" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" className="group">
                      <Download className="mr-1 h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No results message */}
        {filteredPapers.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-lg text-muted-foreground">No research papers found matching your search criteria.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All Categories")
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </section>

      {/* Floating document icons */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        {[FileText].map((Icon, index) => (
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

