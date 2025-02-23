"use client"
import { useState } from "react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Section */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-primary">
            SB
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              HOME
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
              ABOUT
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Bar (Hidden on Small Screens) */}
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-64 pl-8 border rounded-md focus:ring-2 focus:ring-primary" />
          </div>

          <ModeToggle />

          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Styled JOIN Button (Only on Desktop) */}
          <div className="hidden md:block">
            <Button 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform"
              asChild
            >
              <Link href="/auth/signup">JOIN</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 right-0 top-16 bg-background shadow-lg border-b p-6 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-sm font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
                HOME
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
                ABOUT
              </Link>

              {/* Search Input in Mobile Menu */}
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="w-full pl-8 border rounded-md focus:ring-2 focus:ring-primary" />
              </div>

              {/* JOIN Button in Mobile Menu */}
              <Button 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform"
                asChild
              >
                <Link href="/auth/signup" onClick={() => setIsOpen(false)}>JOIN</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
