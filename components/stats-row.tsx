"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface StatCardProps {
  value: number
  label: string
  gradient: string
  delay: number
}

function StatCard({ value, label, gradient, delay }: StatCardProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth count-up
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      current = Math.floor(value * easeOutQuart)
      
      setCount(current)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    const timeout = setTimeout(() => {
      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timeout)
  }, [isVisible, value, delay])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay / 1000, type: "spring", stiffness: 100 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl p-6 backdrop-blur-sm"
      style={{
        background: gradient,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        willChange: "transform",
      }}
    >
      {/* Glow overlay on hover */}
      <div className="absolute inset-0 bg-white/0 transition-all duration-300 group-hover:bg-white/5" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="text-4xl font-bold text-white md:text-5xl">
          {count.toLocaleString()}+
        </span>
        <div className="mt-2 flex items-center gap-1 text-white/80">
          <span className="text-sm font-medium">{label}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>

      {/* Decorative circle */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/5" />
      <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-white/5" />
    </motion.div>
  )
}

export function StatsRow() {
  const stats = [
    {
      value: 4660,
      label: "Total Schemes",
      gradient: "linear-gradient(135deg, #064E3B 0%, #065F46 100%)",
      delay: 0,
    },
    {
      value: 650,
      label: "Central Schemes",
      gradient: "linear-gradient(135deg, #1E3A5F 0%, #1E40AF 100%)",
      delay: 100,
    },
    {
      value: 4010,
      label: "States/UTs Schemes",
      gradient: "linear-gradient(135deg, #3B0764 0%, #4C1D95 100%)",
      delay: 200,
    },
  ]

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 px-4 sm:grid-cols-3 sm:gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  )
}
