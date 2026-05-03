"use client"

import { motion } from "framer-motion"

const schemes = [
  "PM Kisan Samman",
  "Ayushman Bharat",
  "Ujjwala Yojana",
  "Mudra Loan",
  "Sukanya Samriddhi",
  "Jan Dhan Yojana",
  "Atal Pension",
  "PM Awas Yojana",
]

export function FloatingCards() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {schemes.map((scheme, index) => {
          const angle = (index / schemes.length) * 360
          const radius = 350
          const x = Math.cos((angle * Math.PI) / 180) * radius
          const z = Math.sin((angle * Math.PI) / 180) * radius

          return (
            <motion.div
              key={scheme}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/40 backdrop-blur-sm"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
              initial={{
                x,
                z,
                rotateY: -angle,
                opacity: 0,
              }}
              animate={{
                x,
                z,
                rotateY: [-angle, -angle + 360],
                opacity: 0.4,
              }}
              transition={{
                rotateY: {
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                },
                opacity: {
                  duration: 1,
                  delay: index * 0.1,
                },
              }}
            >
              {scheme}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
