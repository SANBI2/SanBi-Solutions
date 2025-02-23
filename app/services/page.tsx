"use client"

import { motion } from "framer-motion"
import { Globe, Laptop2, Lock, ShieldAlert, Users } from "lucide-react"

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

export default function ServicesPage() {
  return (
    <section className="py-16">
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
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

