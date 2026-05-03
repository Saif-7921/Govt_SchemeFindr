"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HelpCircle, Bell, Headphones } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed left-0 right-0 top-0 z-50 border-b border-[#1E2D45] transition-all duration-300 ${
        isScrolled ? "bg-[#0B1120]/90 backdrop-blur-xl" : "bg-[#0B1120]"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo Area */}
        <div className="flex items-center gap-4">
          {/* Ashoka Chakra Icon */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative flex h-10 w-10 items-center justify-center">
              {/* Ashoka Chakra SVG */}
              <svg viewBox="0 0 100 100" className="h-10 w-10">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#F97316" strokeWidth="3" />
                <circle cx="50" cy="50" r="10" fill="#10B981" />
                {/* 24 spokes */}
                {Array.from({ length: 24 }).map((_, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={50 + 35 * Math.cos((i * 15 * Math.PI) / 180)}
                    y2={50 + 35 * Math.sin((i * 15 * Math.PI) / 180)}
                    stroke="#10B981"
                    strokeWidth="2"
                  />
                ))}
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-[#F9FAFB]">SchemeFindr</span>
              <span className="hidden text-xs text-[#9CA3AF] sm:block">National Scheme Discovery Portal</span>
            </div>
          </motion.div>

          {/* Year Badge */}
          <div className="hidden rounded-full border border-[#1E2D45] bg-[#111827] px-3 py-1 md:block">
            <span className="text-xs font-medium text-[#F97316]">FY 2025-26</span>
          </div>
        </div>

        {/* Right Side Links */}
        <div className="flex items-center gap-1 md:gap-4">
          <motion.button
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#9CA3AF] transition-colors hover:bg-[#111827] hover:text-[#F9FAFB]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <HelpCircle className="h-4 w-4" />
            <span className="hidden sm:inline">FAQs</span>
          </motion.button>
          
          <motion.button
            className="relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#9CA3AF] transition-colors hover:bg-[#111827] hover:text-[#F9FAFB]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Announcements</span>
            {/* Notification dot */}
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#F97316]" />
          </motion.button>
          
          <motion.button
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#9CA3AF] transition-colors hover:bg-[#111827] hover:text-[#F9FAFB]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Headphones className="h-4 w-4" />
            <span className="hidden sm:inline">Helpdesk</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
