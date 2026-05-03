"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface GlowButtonProps {
  onClick: () => void
  children: React.ReactNode
  className?: string
}

export function GlowButton({ onClick, children, className = "" }: GlowButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#FF9933] px-8 py-4 text-lg font-semibold text-[#0a0a0f] shadow-lg transition-all ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        boxShadow: "0 0 30px rgba(255, 153, 51, 0.4), 0 0 60px rgba(255, 153, 51, 0.2)",
        willChange: "transform",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Pulsing glow effect */}
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-full bg-[#FF9933]"
        animate={{
          boxShadow: [
            "0 0 20px rgba(255, 153, 51, 0.4)",
            "0 0 40px rgba(255, 153, 51, 0.6)",
            "0 0 20px rgba(255, 153, 51, 0.4)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </span>
    </motion.button>
  )
}
