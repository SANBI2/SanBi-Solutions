"use client";
import Image from "next/image";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { useCallback } from "react";
import Particles from "react-particles";
import { Footer } from "@/components/footer";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

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
];

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
];

export default function Home() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      // Optional: Add any initialization after particles are loaded
    },
    []
  );

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
      {/* <section className="container relative mx-auto flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="mb-2 text-xl font-medium">Hi, Welcome to</h2>
          <motion.h1
            className="mb-8 text-6xl font-bold text-primary"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            SANBI SOLUTIONS
          </motion.h1>
        </motion.div>
        <motion.div className="relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <div className="absolute -inset-1 rounded-full bg-blue-500/20 blur-xl" />
          <Shield className="relative h-32 w-32 text-blue-500" strokeWidth={1} />
        </motion.div>
      </section> */}

      {/* Content */}
      <div className="container relative mx-auto">
  <div className="grid lg:grid-cols-2 gap-12 min-h-screen items-center">
    {/* Left Column */}
    <div className="flex flex-col justify-center space-y-8 pt-20 lg:pt-0">
      <div className="space-y-6 max-w-2xl">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-white/5 px-3 py-1 text-sm text-gray-800 dark:text-white backdrop-blur-xl">
          <Shield className="mr-2 h-4 w-4" />
          Advanced Security Solutions
        </div>
        
        {/* Hero Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/70">
          Securing Your Digital Future
        </h1>
        
        {/* Hero Description */}
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-400">
          Advanced cybersecurity solutions to protect your business from
          evolving threats. Trust SanBi to safeguard your digital assets.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button
          size="lg"
          className="bg-blue-500 dark:bg-[#00a8ff] hover:bg-blue-600 dark:hover:bg-[#0097e6] text-white rounded-full px-8 relative overflow-hidden group"
        >
          <span className="relative z-10">Explore Our Services</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0" />
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="text-gray-900 dark:text-white border-gray-300 dark:border-white/20 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full px-8 backdrop-blur-sm"
        >
          Contact Us
        </Button>
      </div>
    </div>



          {/* Right Column - Floating Elements */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#00a8ff] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
            </div>

            <div className="relative w-[400px] h-[400px] mx-auto">
              <Image
                src="/hero1.png"
                alt="Cybersecurity Illustration"
                width={400}
                height={400}
                className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16 bg-background/50 backdrop-blur-sm">
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
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <service.icon className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 font-semibold">{service.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section className="py-16">
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
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <section.icon className="mb-2 h-8 w-8 text-primary" />
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="group" asChild>
                      <Link href={section.link}>
                        Explore
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
