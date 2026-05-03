"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ParticleCanvas } from "@/components/particle-canvas"
import { HeroSection } from "@/components/hero-section"
import { StatsRow } from "@/components/stats-row"
import { CategoriesGrid } from "@/components/categories-grid"
import { EligibilityForm, EligibilityFormData } from "@/components/eligibility-form"
import { ResultsSection } from "@/components/results-section"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"
import { MouseSpotlight } from "@/components/mouse-spotlight"

type View = "home" | "results"

export default function Home() {
  const [view, setView] = useState<View>("home")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [formData, setFormData] = useState<EligibilityFormData | null>(null)

  const handleCTAClick = () => {
    // Scroll to eligibility form
    const formSection = document.getElementById("eligibility-form")
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    // Scroll to eligibility form
    setTimeout(() => {
      const formSection = document.getElementById("eligibility-form")
      if (formSection) {
        formSection.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  const handleFormComplete = (data: EligibilityFormData) => {
    setFormData(data)
    setView("results")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBack = () => {
    setView("home")
    setSelectedCategory(null)
    setFormData(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <LanguageProvider>
      <div 
        className="relative min-h-screen bg-[#0B1120]"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Navbar */}
        <Navbar />
        
        {/* Mouse Spotlight */}
        <MouseSpotlight />
        
        {/* Particle Background */}
        <ParticleCanvas />

        <AnimatePresence mode="wait">
          {view === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero Section */}
              <HeroSection onCTAClick={handleCTAClick} />
              
              {/* Stats Row */}
              <section className="relative z-10 -mt-8 pb-16">
                <StatsRow />
              </section>

              {/* Categories Grid */}
              <section className="relative z-10 bg-gradient-to-b from-transparent via-[#0B1120] to-[#0B1120]">
                <CategoriesGrid onCategorySelect={handleCategorySelect} />
              </section>

              {/* Eligibility Form - Below Categories */}
              <section className="relative z-10 bg-[#0B1120]">
                <EligibilityForm 
                  onComplete={handleFormComplete} 
                  preSelectedCategory={selectedCategory}
                />
              </section>
            </motion.div>
          )}

          {view === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ResultsSection onBack={handleBack} formData={formData} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  )
}
