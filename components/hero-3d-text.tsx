"use client"

import { motion } from "framer-motion"

export function Hero3DText() {
  return (
    <div
      className="relative"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.h1
        className="text-balance text-center text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        initial={{
          rotateX: 25,
          opacity: 0,
          y: 50,
        }}
        animate={{
          rotateX: 0,
          opacity: 1,
          y: [0, -10, 0], // Float animation keyframes
        }}
        transition={{
          rotateX: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 1,
          },
          opacity: {
            duration: 0.8,
          },
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1],
          },
        }}
      >
        <span className="block">Find Your</span>
        <motion.span 
          className="mt-2 block bg-gradient-to-r from-[#FF9933] via-white to-[#138808] bg-clip-text text-transparent"
          style={{ willChange: "transform" }}
        >
          Government Benefits
        </motion.span>
      </motion.h1>
    </div>
  )
}
