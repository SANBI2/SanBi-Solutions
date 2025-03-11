"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { Shield, Calendar, User, Clock, ArrowRight, Search, Filter } from "lucide-react"
import { useCallback, useState, useEffect } from "react"
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import type { Container, Engine } from "tsparticles-engine"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { TypewriterEffect } from "@/components/typewriter-effect"

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "The Rising Threat of Ransomware: How to Protect Your Business",
    excerpt:
      "Ransomware attacks have increased by 150% in the last year. Learn the essential steps to protect your organization from this growing threat.",
    author: "Sarah Johnson",
    date: "March 8, 2025",
    readTime: "8 min read",
    category: "Threat Intelligence",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Zero Trust Architecture: Implementation Guide for 2025",
    excerpt:
      "Zero Trust is no longer optional. Discover how to implement this security model effectively in your organization with our step-by-step guide.",
    author: "Michael Chen",
    date: "March 5, 2025",
    readTime: "12 min read",
    category: "Security Architecture",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "AI-Powered Security: Benefits and Risks",
    excerpt:
      "Artificial intelligence is transforming cybersecurity. Explore how AI can strengthen your defenses while understanding the potential risks.",
    author: "Aisha Patel",
    date: "February 28, 2025",
    readTime: "10 min read",
    category: "Emerging Technologies",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "Cloud Security Best Practices for Multi-Cloud Environments",
    excerpt:
      "Managing security across multiple cloud providers? Learn the essential practices to maintain consistent security posture across your entire cloud infrastructure.",
    author: "David Rodriguez",
    date: "February 22, 2025",
    readTime: "9 min read",
    category: "Cloud Security",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "The Human Factor: Building a Security-Aware Culture",
    excerpt:
      "Your employees are both your greatest vulnerability and your first line of defense. Discover strategies to build a strong security culture.",
    author: "Emma Wilson",
    date: "February 15, 2025",
    readTime: "7 min read",
    category: "Security Awareness",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 6,
    title: "GDPR and CCPA: Navigating Global Privacy Regulations",
    excerpt:
      "Stay compliant with evolving privacy regulations. This guide breaks down what you need to know about GDPR, CCPA, and emerging privacy laws.",
    author: "Thomas Weber",
    date: "February 10, 2025",
    readTime: "11 min read",
    category: "Compliance",
    image: "/placeholder.svg?height=200&width=400",
  },
]

// Categories for filtering
const categories = [
  "All Categories",
  "Threat Intelligence",
  "Security Architecture",
  "Emerging Technologies",
  "Cloud Security",
  "Security Awareness",
  "Compliance",
]

export default function BlogPage() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Optional: Add any initialization after particles are loaded
  }, [])

  // For section animations
  const [isVisible, setIsVisible] = useState({
    posts: false,
  })

  useEffect(() => {
    const handleScroll = () => {
      const postsSection = document.getElementById("posts-section")

      if (postsSection) {
        const rect = postsSection.getBoundingClientRect()
        setIsVisible((prev) => ({ ...prev, posts: rect.top < window.innerHeight * 0.75 }))
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

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Typewriter words
  const words = [
    {
      text: "Security",
    },
    {
      text: "Insights",
    },
    {
      text: "Blog",
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
              <Shield className="mr-2 h-4 w-4" />
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
              Stay sharp with expert cybersecurity insights, trends, and best practices to protect your organization in
              an evolving threat landscape.
            </motion.p>
          </motion.div>
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
                placeholder="Search articles..."
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

      {/* Blog Posts Section */}
      <section id="posts-section" className="container mx-auto pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible.posts ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-all">
                <div className="overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {post.category}
                    </span>
                    <div className="flex items-center text-muted-foreground text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                    <span className="mx-2">•</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="group" asChild>
                    <Link href={`/blog/${post.id}`}>
                      Read More
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
        {filteredPosts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-lg text-muted-foreground">No articles found matching your search criteria.</p>
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

        {/* Pagination */}
        {filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex justify-center mt-12"
          >
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </motion.div>
        )}
      </section>

      {/* Floating security icons */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        {[Shield].map((Icon, index) => (
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

