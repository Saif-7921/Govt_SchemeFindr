"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

interface AnimatedCounterProps {
  target: number
  duration?: number
}

function AnimatedNumber({ target, duration = 2 }: AnimatedCounterProps) {
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 })
  const display = useTransform(spring, (current) =>
    Math.floor(current).toLocaleString()
  )

  useEffect(() => {
    spring.set(target)
  }, [spring, target])

  return <motion.span>{display}</motion.span>
}

export function AnimatedCounter() {
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.p
      className="text-lg text-white/60 md:text-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      Discovering <span className="font-semibold text-[#FF9933]"><AnimatedNumber target={1247} /></span> schemes across{" "}
      <span className="font-semibold text-[#138808]">36</span> states...
      <span
        className={`ml-1 inline-block h-5 w-0.5 bg-white/60 align-middle transition-opacity ${
          showCursor ? "opacity-100" : "opacity-0"
        }`}
      />
    </motion.p>
  )
}
