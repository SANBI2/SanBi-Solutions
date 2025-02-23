"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"
import { Facebook, Github, Linkedin, Lock, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react"
import Link from "next/link"
import { Shield, Menu } from "lucide-react"

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Contact Us", href: "/contact" },
]

export function Footer() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    // <footer
    //   className={`${
    //     isDark ? "bg-zinc-950 text-zinc-100" : "bg-zinc-100 text-zinc-900"
    //   } backdrop-blur-sm bg-opacity-10`} // Add the backdrop-blur and opacity properties here
    // >
    //   <div className="container grid gap-8 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
    //     {/* About Us */}
    //     <div>
    //       <h3 className={`mb-4 text-lg font-semibold ${isDark ? "text-lime-400" : "text-lime-600"}`}>About Us</h3>
    //       <p className={`mb-6 text-sm ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
    //         We are dedicated to providing top-notch security solutions to protect your digital assets.
    //       </p>
    //       <div className="flex gap-4">
    //         {socialLinks.map((social) => (
    //           <Link
    //             key={social.label}
    //             href={social.href}
    //             className={`${
    //               isDark ? "text-red-500 hover:text-red-400" : "text-red-600 hover:text-red-500"
    //             }`}
    //             aria-label={social.label}
    //           >
    //             <social.icon className="h-5 w-5" />
    //           </Link>
    //         ))}
    //       </div>
    //     </div>

    //     {/* Useful Links */}
    //     <div>
    //       <h3 className={`mb-4 text-lg font-semibold ${isDark ? "text-lime-400" : "text-lime-600"}`}>Useful links</h3>
    //       <ul className="space-y-2 text-sm">
    //         {navLinks.map((link) => (
    //           <li key={link.name}>
    //             <Link href={link.href} className={`hover:${isDark ? "text-lime-400" : "text-lime-600"}`}>
    //               {link.name}
    //             </Link>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>

    //     {/* Address */}
    //     <div>
    //       <h3 className={`mb-4 text-lg font-semibold ${isDark ? "text-lime-400" : "text-lime-600"}`}>Address</h3>
    //       <ul className="space-y-4 text-sm">
    //         <li className="flex items-center gap-2">
    //           <Mail className={isDark ? "text-lime-400" : "text-lime-600"} />
    //           <a
    //             href="mailto:sanbi.solutions@gmail.com"
    //             className={`hover:${isDark ? "text-lime-400" : "text-lime-600"}`}
    //           >
    //             sanbi.solutions@gmail.com
    //           </a>
    //         </li>
    //         <li className="flex items-center gap-2">
    //           <MapPin className={isDark ? "text-lime-400" : "text-lime-600"} />
    //           <span>Janakpurdham, Nepal</span>
    //         </li>
    //         <li className="flex items-center gap-2">
    //           <Phone className={isDark ? "text-lime-400" : "text-lime-600"} />
    //           <a href="tel:+977-9814853977" className={`hover:${isDark ? "text-lime-400" : "text-lime-600"}`}>
    //             +977-9814853977
    //           </a>
    //         </li>
    //       </ul>
    //     </div>

    //     {/* Contact Form */}
    //     <div>
    //       <h3 className={`mb-4 text-lg font-semibold ${isDark ? "text-lime-400" : "text-lime-600"}`}>Contact Us</h3>
    //       <form className="space-y-4">
    //         <Input
    //           type="email"
    //           placeholder="Enter an Email"
    //           className={`${
    //             isDark ? "border-zinc-700 bg-zinc-900 text-zinc-100" : "border-zinc-300 bg-white text-zinc-900"
    //           }`}
    //         />
    //         <Textarea
    //           placeholder="Write Message...."
    //           className={`min-h-[100px] ${
    //             isDark ? "border-zinc-700 bg-zinc-900 text-zinc-100" : "border-zinc-300 bg-white text-zinc-900"
    //           }`}
    //         />
    //         <Button type="submit" className="w-full bg-red-500 text-white hover:bg-red-600">
    //           Send
    //         </Button>
    //       </form>
    //     </div>
    //   </div>

    //   {/* Copyright */}
    //   <div
    //     className={`border-t ${
    //       isDark ? "border-zinc-800 bg-zinc-950" : "border-zinc-200 bg-zinc-100"
    //     } py-4 text-center text-sm ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
    //   >
    //     All rights reservered by{" "}
    //     <span className="inline-flex items-center gap-1">
    //       <Lock className="h-4 w-4" /> SANBI Solutions Co.
    //     </span>{" "}
    //     © {new Date().getFullYear()}.
    //   </div>
    // </footer>
    <footer className="bg-[#5e83f328] dark:bg-[#0d0c1b3f] text-black dark:text-white backdrop-blur-sm">
            <div className="container mx-auto px-4 py-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-8 h-8 text-[#00a8ff]" />
                    <span className="text-2xl font-bold">SanBi</span>
                  </div>
                  <p className="text-black dark:text-white">
                    Securing your digital future with advanced cybersecurity solutions.
                  </p>
                  <div className="flex gap-4">
               {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className={`${
                  isDark ? "text-white-500 hover:text-[#00a8ff]" : "text-white-600 hover:text-[#00a8ff]"
                }`}
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Resources</h3>
                  <nav className="flex flex-col gap-2">
                    <Link
                      href="/blog"
                      className="text-black dark:text-white hover:text-blue-500 transition-colors"
                    >
                      Blog
                    </Link>
                    <Link
                      href="/projects"
                      className="text-black dark:text-white hover:text-blue-500 transition-colors"
                    >
                      Projects
                    </Link>
                    <Link
                      href="/ebooks"
                      className="text-black dark:text-white hover:text-blue-500 transition-colors"
                    >
                      eBooks
                    </Link>
                  </nav>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Company</h3>
                  <nav className="flex flex-col gap-2">
                    <Link
                      href="/about"
                      className="text-black dark:text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      About Us
                    </Link>
                    <Link
                      href="/contact"
                      className="text-black dark:text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      Contact
                    </Link>
                    <Link
                      href="/privacy"
                      className="text-black dark:text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </nav>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Contact</h3>
                  <div className="space-y-2 text-black dark:text-gray-400">
                    <p>Email: contact@sanbi.com</p>
                    <p>Phone: (555) 123-4567</p>
                    <p>Address: 123 Security St, Cyber City</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10">
              <div className="container mx-auto px-4 py-6 text-center">
              <p className="text-black dark:text-gray-500 text-sm">All rights reservered by{" "}
              <span className="inline-flex items-center gap-1">
              <Lock className="h-4 w-4" /> SANBI Solutions Co.
              </span>{" "}
              © {new Date().getFullYear()}.</p>
              </div>
            </div>
          </footer>
  )
}
