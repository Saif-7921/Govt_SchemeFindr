"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Wheat, 
  Building2, 
  Handshake, 
  GraduationCap, 
  Heart, 
  Home, 
  Scale, 
  Microscope, 
  TrendingUp, 
  Users, 
  Palette, 
  Bus, 
  Plane, 
  Wrench,
  Baby
} from "lucide-react"

interface Category {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  count: number
  color: string
  bgColor: string
}

const categories: Category[] = [
  { id: "agriculture", name: "Agriculture, Rural & Environment", icon: Wheat, count: 840, color: "#10B981", bgColor: "rgba(16, 185, 129, 0.15)" },
  { id: "banking", name: "Banking, Financial Services & Insurance", icon: Building2, count: 329, color: "#3B82F6", bgColor: "rgba(59, 130, 246, 0.15)" },
  { id: "business", name: "Business & Entrepreneurship", icon: Handshake, count: 747, color: "#F97316", bgColor: "rgba(249, 115, 22, 0.15)" },
  { id: "education", name: "Education & Learning", icon: GraduationCap, count: 1086, color: "#8B5CF6", bgColor: "rgba(139, 92, 246, 0.15)" },
  { id: "health", name: "Health & Wellness", icon: Heart, count: 287, color: "#EF4444", bgColor: "rgba(239, 68, 68, 0.15)" },
  { id: "housing", name: "Housing & Shelter", icon: Home, count: 134, color: "#EC4899", bgColor: "rgba(236, 72, 153, 0.15)" },
  { id: "law", name: "Public Safety, Law & Justice", icon: Scale, count: 33, color: "#6366F1", bgColor: "rgba(99, 102, 241, 0.15)" },
  { id: "science", name: "Science, IT & Communications", icon: Microscope, count: 109, color: "#14B8A6", bgColor: "rgba(20, 184, 166, 0.15)" },
  { id: "skills", name: "Skills & Employment", icon: TrendingUp, count: 399, color: "#F59E0B", bgColor: "rgba(245, 158, 11, 0.15)" },
  { id: "social", name: "Social Welfare & Empowerment", icon: Users, count: 1438, color: "#10B981", bgColor: "rgba(16, 185, 129, 0.15)" },
  { id: "sports", name: "Sports & Culture", icon: Palette, count: 261, color: "#F97316", bgColor: "rgba(249, 115, 22, 0.15)" },
  { id: "transport", name: "Transport & Infrastructure", icon: Bus, count: 101, color: "#3B82F6", bgColor: "rgba(59, 130, 246, 0.15)" },
  { id: "travel", name: "Travel & Tourism", icon: Plane, count: 97, color: "#06B6D4", bgColor: "rgba(6, 182, 212, 0.15)" },
  { id: "utility", name: "Utility & Sanitation", icon: Wrench, count: 58, color: "#78716C", bgColor: "rgba(120, 113, 108, 0.15)" },
  { id: "women", name: "Women and Child", icon: Baby, count: 466, color: "#EC4899", bgColor: "rgba(236, 72, 153, 0.15)" },
]

type TabType = "categories" | "states" | "ministries"

interface CategoriesGridProps {
  onCategorySelect: (categoryId: string) => void
}

export function CategoriesGrid({ onCategorySelect }: CategoriesGridProps) {
  const [activeTab, setActiveTab] = useState<TabType>("categories")

  const tabs: { id: TabType; label: string }[] = [
    { id: "categories", label: "Categories" },
    { id: "states", label: "States/UTs" },
    { id: "ministries", label: "Central Ministries" },
  ]

  return (
    <section className="py-16">
      {/* Tabs */}
      <div className="mx-auto mb-8 flex max-w-md justify-center gap-2 px-4">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-white"
                : "text-[#9CA3AF] hover:text-white"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-full bg-[#10B981]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center text-2xl font-bold text-[#F9FAFB] md:text-3xl"
      >
        Find schemes based on categories
      </motion.h2>

      {/* Categories Grid */}
      <AnimatePresence mode="wait">
        {activeTab === "categories" && (
          <motion.div
            key="categories"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
                onClick={() => onCategorySelect(category.id)}
                className="group relative overflow-hidden rounded-2xl border border-[#1E2D45] bg-[#111827] p-5 text-left transition-all duration-300 hover:border-transparent"
                style={{
                  willChange: "transform",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                }}
              >
                {/* Hover glow border */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow: `inset 0 0 0 2px ${category.color}, 0 0 20px ${category.color}30`,
                  }}
                />

                {/* Icon */}
                <motion.div 
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: category.bgColor }}
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <category.icon 
                    className="h-7 w-7"
                    style={{ color: category.color }}
                  />
                </motion.div>

                {/* Scheme count */}
                <p 
                  className="mb-1 text-sm font-semibold"
                  style={{ color: category.color }}
                >
                  {category.count.toLocaleString()} Schemes
                </p>

                {/* Category name */}
                <h3 className="text-sm font-medium leading-tight text-[#F9FAFB]">
                  {category.name}
                </h3>

                {/* Decorative element */}
                <div 
                  className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                  style={{ backgroundColor: category.color }}
                />
              </motion.button>
            ))}
          </motion.div>
        )}

        {activeTab === "states" && (
          <motion.div
            key="states"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-auto max-w-4xl px-4 text-center"
          >
            <p className="text-[#9CA3AF]">Browse schemes by States and Union Territories</p>
            <p className="mt-2 text-sm text-[#9CA3AF]/60">Coming soon...</p>
          </motion.div>
        )}

        {activeTab === "ministries" && (
          <motion.div
            key="ministries"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-auto max-w-4xl px-4 text-center"
          >
            <p className="text-[#9CA3AF]">Browse schemes by Central Government Ministries</p>
            <p className="mt-2 text-sm text-[#9CA3AF]/60">Coming soon...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
