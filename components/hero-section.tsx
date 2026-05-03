"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface HeroSectionProps {
  onCTAClick: () => void
}

export function HeroSection({ onCTAClick }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 pt-20">
      {/* Animated gradient mesh background */}
      <div 
        className="absolute inset-0 animate-gradient-mesh"
        style={{
          background: "linear-gradient(135deg, #0B1120 0%, #0F2027 25%, #0B1120 50%, #1E3A5F 75%, #0B1120 100%)",
          backgroundSize: "200% 200%",
        }}
      />
      
      {/* Additional ambient gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-[#10B981]/5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-[#F97316]/5 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        {/* Hashtag-style heading */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
          className="flex flex-col items-center gap-2"
          style={{ 
            perspective: "1000px",
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <motion.h1 
            className="text-4xl font-black tracking-tight text-[#F9FAFB] sm:text-5xl md:text-6xl lg:text-7xl"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="bg-gradient-to-r from-[#F97316] to-[#F97316] bg-clip-text text-transparent">#</span>
            GOVERNMENT
            <span className="text-[#F97316]">SCHEMES</span>
          </motion.h1>
          <motion.h2 
            className="text-3xl font-black tracking-tight text-[#F9FAFB] sm:text-4xl md:text-5xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-[#10B981] to-[#10B981] bg-clip-text text-transparent">#</span>
            SCHEMES
            <span className="text-[#10B981]">FORYOU</span>
          </motion.h2>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl text-lg text-[#9CA3AF] md:text-xl"
        >
          Discover <span className="font-semibold text-[#F97316]">4,660+</span> government schemes tailored just for you
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={onCTAClick}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="group mt-4 flex items-center gap-2 rounded-xl bg-[#10B981] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
          style={{ willChange: "transform" }}
        >
          Find Schemes For You
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </motion.button>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-[#9CA3AF]"
        >
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#10B981]" />
            100% Free
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#F97316]" />
            No Registration Required
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#3B82F6]" />
            Updated Daily
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.6 },
          y: { delay: 1.5, duration: 1.5, repeat: Infinity },
        }}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-[#1E2D45] p-2">
          <motion.div
            className="h-2 w-1 rounded-full bg-[#F97316]"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
