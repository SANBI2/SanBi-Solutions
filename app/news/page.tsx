"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { Newspaper, Calendar, ArrowRight, Search, Filter, Clock } from "lucide-react"
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

// Sample news data
const newsItems = [
  {
    id: 1,
    title: "Major Ransomware Group Dismantled in International Operation",
    summary:
      "A coordinated effort by law enforcement agencies across 10 countries has led to the takedown of one of the most prolific ransomware groups responsible for attacks on critical infrastructure.",
    date: "March 10, 2025",
    source: "Cybersecurity Today",
    category: "Threat Actors",
    image: "/placeholder.svg?height=200&width=400",
    breaking: true,
  },
  {
    id: 2,
    title: "Critical Vulnerability Discovered in Widely-Used IoT Protocol",
    summary:
      "Security researchers have identified a severe vulnerability in a protocol used by millions of IoT devices, potentially allowing remote code execution. Patches are being developed.",
    date: "March 8, 2025",
    source: "Security Weekly",
    category: "Vulnerabilities",
    image: "/placeholder.svg?height=200&width=400",
    breaking: true,
  },
  {
    id: 3,
    title: "New Data Privacy Regulation to Take Effect Next Quarter",
    summary:
      "The International Data Protection Board has announced a new global framework for data privacy that will impact how companies collect, store, and process personal information.",
    date: "March 5, 2025",
    source: "Privacy Gazette",
    category: "Regulations",
    image: "/placeholder.svg?height=200&width=400",
    breaking: false,
  },
  {
    id: 4,
    title: "SanBi Solutions Releases Advanced Threat Detection Platform",
    summary:
      "Our company has launched a next-generation threat detection platform that leverages AI to identify and respond to sophisticated cyber attacks in real-time.",
    date: "March 3, 2025",
    source: "Tech Innovators",
    category: "Product News",
    image: "/placeholder.svg?height=200&width=400",
    breaking: false,
  },
  {
    id: 5,
    title: "Healthcare Sector Targeted in Wave of Sophisticated Phishing Campaigns",
    summary:
      "Cybersecurity agencies are warning healthcare providers about a series of highly targeted phishing campaigns designed to steal patient data and deploy ransomware.",
    date: "February 28, 2025",
    source: "Health Security News",
    category: "Threat Intelligence",
    image: "/placeholder.svg?height=200&width=400",
    breaking: false,
  },
  {
    id: 6,
    title: "Annual Cybersecurity Risk Report Shows Increase in Supply Chain Attacks",
    summary:
      "The Global Cybersecurity Alliance's annual report reveals a 43% increase in supply chain attacks, highlighting the need for enhanced vendor security assessments.",
    date: "February 25, 2025",
    source: "Security Trends",
    category: "Industry Reports",
    image: "/placeholder.svg?height=200&width=400",
    breaking: false,
  },
]

// Categories for filtering
const categories = [
  "All Categories",
  "Threat Actors",
  "Vulnerabilities",
  "Regulations",
  "Product News",
  "Threat Intelligence",
  "Industry Reports",
]

export default function NewsPage() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Optional: Add any initialization after particles are loaded
  }, [])

  // For section animations
  const [isVisible, setIsVisible] = useState({
    news: false,
    breaking: false,
  })

  useEffect(() => {
    const handleScroll = () => {
      const newsSection = document.getElementById("news-section")
      const breakingSection = document.getElementById("breaking-section")

      if (newsSection) {
        const rect = newsSection.getBoundingClientRect()
        setIsVisible((prev) => ({ ...prev, news: rect.top < window.innerHeight * 0.75 }))
      }

      if (breakingSection) {
        const rect = breakingSection.getBoundingClientRect()
        setIsVisible((prev) => ({ ...prev, breaking: rect.top < window.innerHeight * 0.75 }))
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

  // Filter news based on search and category
  const filteredNews = newsItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Breaking news
  const breakingNews = newsItems.filter((item) => item.breaking)

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Typewriter words
  const words = [
    {
      text: "Security",
    },
    {
      text: "News",
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
              <Newspaper className="mr-2 h-4 w-4" />
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
              Stay informed with the latest updates, trends, and breaking news from the cybersecurity world.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Breaking News Section */}
      <section id="breaking-section" className="container mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-red-500 text-white">Breaking News</Badge>
            <h2 className="text-2xl font-bold">Latest Security Alerts</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {breakingNews.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible.breaking ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={400}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4 md:w-2/3">
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.summary}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(item.date)}
                      </div>
                      <Button size="sm" variant="ghost" className="group" asChild>
                        <Link href={`/news/${item.id}`}>
                          Read More
                          <motion.div
                            className="inline-block ml-2"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </motion.div>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
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
                placeholder="Search news..."
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

      {/* All News Section */}
      <section id="news-section" className="container mx-auto pb-20">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold mb-8">
          All News
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible.news ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-all">
                <div className="relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  {item.breaking && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-red-500 text-white">Breaking</Badge>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{item.category}</Badge>
                    <div className="flex items-center text-muted-foreground text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(item.date)}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">{item.summary}</CardDescription>
                  <div className="text-sm text-muted-foreground mt-4">Source: {item.source}</div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="group" asChild>
                    <Link href={`/news/${item.id}`}>
                      Read Full Story
                      <motion.div className="inline-block ml-2" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No results message */}
        {filteredNews.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-lg text-muted-foreground">No news items found matching your search criteria.</p>
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

      {/* Floating newspaper icons */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        {[Newspaper].map((Icon, index) => (
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

