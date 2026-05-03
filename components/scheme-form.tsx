"use client"

import { useState, useRef, useEffect, TouchEvent } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Check, ChevronLeft, ChevronRight, Pencil, GraduationCap, Tractor, HardHat, Briefcase, Building2, UserX, Search, Sparkles } from "lucide-react"
import { ParticleExplosion } from "./particle-explosion"
import { useLanguage } from "@/contexts/language-context"

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
]

const OCCUPATIONS = [
  { id: "student", label: "Student", labelHi: "छात्र", icon: GraduationCap },
  { id: "farmer", label: "Farmer", labelHi: "किसान", icon: Tractor },
  { id: "daily-wage", label: "Daily Wage", labelHi: "दैनिक मजदूरी", icon: HardHat },
  { id: "business", label: "Business", labelHi: "व्यापार", icon: Briefcase },
  { id: "salaried", label: "Salaried", labelHi: "वेतनभोगी", icon: Building2 },
  { id: "unemployed", label: "Unemployed", labelHi: "बेरोजगार", icon: UserX },
]

const CATEGORIES = [
  { id: "general", label: "General", labelHi: "सामान्य" },
  { id: "obc", label: "OBC", labelHi: "OBC" },
  { id: "sc", label: "SC", labelHi: "SC" },
  { id: "st", label: "ST", labelHi: "ST" },
]

const GENDERS = [
  { id: "Male", label: "Male", labelHi: "पुरुष" },
  { id: "Female", label: "Female", labelHi: "महिला" },
  { id: "Other", label: "Other", labelHi: "अन्य" },
]

interface FormData {
  age: number
  gender: string
  state: string
  income: number
  category: string
  occupation: string
}

interface SchemeFormProps {
  onComplete: (data: FormData) => void
}

export function SchemeForm({ onComplete }: SchemeFormProps) {
  const { language, t } = useLanguage()
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [stateSearch, setStateSearch] = useState("")
  const [showStateDropdown, setShowStateDropdown] = useState(false)
  const [isExploding, setIsExploding] = useState(false)
  const [explosionOrigin, setExplosionOrigin] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  // 3D tilt effect based on cursor position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), { stiffness: 100, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), { stiffness: 100, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth) - 0.5
      const y = (e.clientY / innerHeight) - 0.5
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])
  
  const [formData, setFormData] = useState<FormData>({
    age: 25,
    gender: "",
    state: "",
    income: 300000,
    category: "",
    occupation: "",
  })

  const filteredStates = INDIAN_STATES.filter(state =>
    state.toLowerCase().includes(stateSearch.toLowerCase())
  )

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.gender && formData.state
      case 2:
        return formData.category
      case 3:
        return formData.occupation
      case 4:
        return true
      default:
        return false
    }
  }

  const nextStep = () => {
    if (step < 4) {
      setDirection(1)
      setStep(step + 1)
    } else {
      // Trigger particle explosion
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        setExplosionOrigin({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        })
        setIsExploding(true)
      }
    }
  }

  const handleExplosionComplete = () => {
    setIsExploding(false)
    onComplete(formData)
  }

  const prevStep = () => {
    if (step > 1) {
      setDirection(-1)
      setStep(step - 1)
    }
  }

  // Touch swipe handlers for mobile
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    const threshold = 50

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && isStepValid() && step < 4) {
        // Swipe left - next step
        nextStep()
      } else if (diff < 0 && step > 1) {
        // Swipe right - previous step
        prevStep()
      }
    }
  }

  const getIncomeColor = () => {
    if (formData.income < 200000) return "#ef4444"
    if (formData.income < 500000) return "#f59e0b"
    return "#22c55e"
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            {/* Age Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-white/60">{t("age")}</label>
                <span className="rounded-full bg-[#F97316]/20 px-3 py-1 text-sm font-semibold text-[#F97316]">
                  {formData.age} {t("years")}
                </span>
              </div>
              <input
                type="range"
                min="18"
                max="100"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#F97316]"
                style={{
                  background: `linear-gradient(to right, #F97316 0%, #F97316 ${((formData.age - 18) / 82) * 100}%, rgba(255,255,255,0.1) ${((formData.age - 18) / 82) * 100}%, rgba(255,255,255,0.1) 100%)`,
                }}
              />
            </div>

            {/* Gender Pills */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-white/60">{t("gender")}</label>
              <div className="flex gap-4">
                {GENDERS.map((gender) => (
                  <motion.button
                    key={gender.id}
                    onClick={() => setFormData({ ...formData, gender: gender.id })}
                    className={`relative flex-1 rounded-full px-6 py-3 text-sm font-medium transition-all ${
                      formData.gender === gender.id
                        ? "bg-[#F97316] text-[#0B1120]"
                        : "border border-white/10 bg-white/5 text-white hover:border-[#F97316]/50"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {formData.gender === gender.id && (
                      <motion.span
                        className="absolute inset-0 rounded-full"
                        layoutId="gender-glow"
                        style={{ boxShadow: "0 0 20px rgba(255, 153, 51, 0.5)" }}
                      />
                    )}
                    <span className="relative">{language === "hi" ? gender.labelHi : gender.label}</span>
                  </motion.button>
                ))}
              </div>
              {formData.gender && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2 text-sm text-[#10B981]"
                >
                  <Check className="h-4 w-4" />
                  <span>{t("selected")}</span>
                </motion.div>
              )}
            </div>

            {/* State Dropdown */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-white/60">{t("state")}</label>
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    value={formData.state || stateSearch}
                    onChange={(e) => {
                      setStateSearch(e.target.value)
                      setShowStateDropdown(true)
                      if (!e.target.value) setFormData({ ...formData, state: "" })
                    }}
                    onFocus={() => setShowStateDropdown(true)}
                    placeholder={t("search_state")}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-white/40 outline-none transition-all focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20"
                  />
                </div>
                <AnimatePresence>
                  {showStateDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-50 mt-2 max-h-48 w-full overflow-auto rounded-xl border border-white/10 bg-[#0B1120]/95 backdrop-blur-xl"
                    >
                      {filteredStates.map((state) => (
                        <button
                          key={state}
                          onClick={() => {
                            setFormData({ ...formData, state })
                            setStateSearch("")
                            setShowStateDropdown(false)
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-white/80 transition-colors hover:bg-[#F97316]/20 hover:text-white"
                        >
                          {state}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {formData.state && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2 text-sm text-[#10B981]"
                >
                  <Check className="h-4 w-4" />
                  <span>{formData.state}</span>
                </motion.div>
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            {/* Income Range */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-white/60">{t("annual_income")}</label>
                <span
                  className="rounded-full px-3 py-1 text-sm font-semibold"
                  style={{
                    backgroundColor: `${getIncomeColor()}20`,
                    color: getIncomeColor(),
                  }}
                >
                  ₹{formData.income.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1000000"
                step="10000"
                value={formData.income}
                onChange={(e) => setFormData({ ...formData, income: parseInt(e.target.value) })}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10"
                style={{
                  background: `linear-gradient(to right, ${getIncomeColor()} 0%, ${getIncomeColor()} ${(formData.income / 1000000) * 100}%, rgba(255,255,255,0.1) ${(formData.income / 1000000) * 100}%, rgba(255,255,255,0.1) 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-white/40">
                <span>₹0</span>
                <span>₹10L+</span>
              </div>
            </div>

            {/* Category Cards */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-white/60">{t("category")}</label>
              <div className="grid grid-cols-2 gap-4">
                {CATEGORIES.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setFormData({ ...formData, category: category.id })}
                    className={`relative rounded-xl border p-4 text-center transition-all ${
                      formData.category === category.id
                        ? "border-[#F97316] bg-[#F97316]/10"
                        : "border-white/10 bg-white/5 hover:border-[#F97316]/50"
                    }`}
                    whileHover={{ scale: 1.02, rotateY: 5 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <span className="font-medium text-white">
                      {language === "hi" ? category.labelHi : category.label}
                    </span>
                    {formData.category === category.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#10B981]"
                      >
                        <Check className="h-3 w-3 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <label className="text-sm font-medium text-white/60">{t("occupation")}</label>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {OCCUPATIONS.map((occupation) => {
                const Icon = occupation.icon
                const isSelected = formData.occupation === occupation.id
                return (
                  <motion.button
                    key={occupation.id}
                    onClick={() => setFormData({ ...formData, occupation: occupation.id })}
                    className={`relative flex flex-col items-center gap-3 rounded-xl border p-6 transition-all ${
                      isSelected
                        ? "border-[#10B981] bg-[#10B981]/10"
                        : "border-white/10 bg-white/5 hover:border-[#F97316]/50"
                    }`}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    animate={isSelected ? { y: -5 } : { y: 0 }}
                    style={{
                      boxShadow: isSelected ? "0 10px 30px rgba(19, 136, 8, 0.3)" : "none",
                    }}
                  >
                    <Icon className={`h-8 w-8 ${isSelected ? "text-[#10B981]" : "text-white/60"}`} />
                    <span className={`text-sm font-medium ${isSelected ? "text-white" : "text-white/80"}`}>
                      {language === "hi" ? occupation.labelHi : occupation.label}
                    </span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#10B981]"
                      >
                        <Check className="h-3 w-3 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">{t("confirm_details")}</h3>
            <div className="space-y-4">
              {[
                { label: t("age"), value: `${formData.age} ${t("years")}`, step: 1 },
                { label: t("gender"), value: GENDERS.find(g => g.id === formData.gender)?.[language === "hi" ? "labelHi" : "label"] || "", step: 1 },
                { label: t("state"), value: formData.state, step: 1 },
                { label: t("annual_income"), value: `₹${formData.income.toLocaleString()}`, step: 2 },
                { label: t("category"), value: CATEGORIES.find(c => c.id === formData.category)?.[language === "hi" ? "labelHi" : "label"] || "", step: 2 },
                { label: t("occupation"), value: OCCUPATIONS.find(o => o.id === formData.occupation)?.[language === "hi" ? "labelHi" : "label"] || "", step: 3 },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div>
                    <p className="text-sm text-white/60">{item.label}</p>
                    <p className="font-medium text-white">{item.value}</p>
                  </div>
                  <button
                    onClick={() => {
                      setDirection(-1)
                      setStep(item.step)
                    }}
                    className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      <ParticleExplosion
        isActive={isExploding}
        originX={explosionOrigin.x}
        originY={explosionOrigin.y}
        onComplete={handleExplosionComplete}
      />
      
      <div 
        className="relative mx-auto w-full max-w-lg"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Glassmorphism Card with 3D tilt */}
        <motion.div
          ref={cardRef}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{
            boxShadow: "0 0 40px rgba(255, 153, 51, 0.1), inset 0 0 40px rgba(255, 255, 255, 0.05)",
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {/* Inner glow */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent" />

          {/* Progress Bar with liquid pour animation */}
          <div className="mb-8">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-white/60">{t("step")} {step} {t("of")} 4</span>
              <span className="text-[#F97316]">{Math.round((step / 4) * 100)}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#F97316] to-[#10B981]"
                initial={{ width: 0 }}
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ 
                  type: "spring", 
                  stiffness: 50, 
                  damping: 10,
                  mass: 0.5,
                }}
              />
            </div>
            <div className="mt-2 flex justify-between">
              {[t("personal"), t("financial"), t("profile"), t("confirm")].map((label, index) => (
                <span
                  key={label}
                  className={`text-xs transition-colors duration-300 ${
                    index + 1 <= step ? "text-[#F97316]" : "text-white/40"
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Mobile swipe hint */}
          <div className="mb-4 flex items-center justify-center gap-2 text-xs text-white/30 md:hidden">
            <ChevronLeft className="h-3 w-3" />
            <span>{language === "hi" ? "स्वाइप करें" : "Swipe to navigate"}</span>
            <ChevronRight className="h-3 w-3" />
          </div>

          {/* Form Steps */}
          <div className="relative min-h-[320px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex gap-4">
            {step > 1 && (
              <motion.button
                onClick={prevStep}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-white transition-colors hover:bg-white/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ChevronLeft className="h-4 w-4" />
                {t("back")}
              </motion.button>
            )}
            <motion.button
              ref={buttonRef}
              onClick={nextStep}
              disabled={!isStepValid()}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all ${
                isStepValid()
                  ? "bg-[#F97316] text-[#0B1120] hover:bg-[#F97316]/90"
                  : "cursor-not-allowed bg-white/10 text-white/40"
              }`}
              whileHover={isStepValid() ? { scale: 1.02 } : {}}
              whileTap={isStepValid() ? { scale: 0.98 } : {}}
              style={
                isStepValid()
                  ? { boxShadow: "0 0 20px rgba(255, 153, 51, 0.3)" }
                  : {}
              }
            >
              {step === 4 ? (
                <>
                  <Sparkles className="h-4 w-4" />
                  {t("find_my_schemes")}
                </>
              ) : (
                <>
                  {t("continue")}
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  )
}
