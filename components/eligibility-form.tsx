"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Pencil, 
  GraduationCap, 
  Tractor, 
  HardHat, 
  Briefcase, 
  Building2, 
  UserX, 
  Search,
  BadgeCheck,
  IndianRupee,
  Wheat,
  Heart,
  Home,
  Users,
  Baby,
  TrendingUp
} from "lucide-react"
import { ParticleExplosion } from "./particle-explosion"

const INDIAN_STATES = [
  { name: "Andhra Pradesh", type: "state" },
  { name: "Arunachal Pradesh", type: "state" },
  { name: "Assam", type: "state" },
  { name: "Bihar", type: "state" },
  { name: "Chhattisgarh", type: "state" },
  { name: "Goa", type: "state" },
  { name: "Gujarat", type: "state" },
  { name: "Haryana", type: "state" },
  { name: "Himachal Pradesh", type: "state" },
  { name: "Jharkhand", type: "state" },
  { name: "Karnataka", type: "state" },
  { name: "Kerala", type: "state" },
  { name: "Madhya Pradesh", type: "state" },
  { name: "Maharashtra", type: "state" },
  { name: "Manipur", type: "state" },
  { name: "Meghalaya", type: "state" },
  { name: "Mizoram", type: "state" },
  { name: "Nagaland", type: "state" },
  { name: "Odisha", type: "state" },
  { name: "Punjab", type: "state" },
  { name: "Rajasthan", type: "state" },
  { name: "Sikkim", type: "state" },
  { name: "Tamil Nadu", type: "state" },
  { name: "Telangana", type: "state" },
  { name: "Tripura", type: "state" },
  { name: "Uttar Pradesh", type: "state" },
  { name: "Uttarakhand", type: "state" },
  { name: "West Bengal", type: "state" },
  { name: "Andaman and Nicobar", type: "ut" },
  { name: "Chandigarh", type: "ut" },
  { name: "Dadra and Nagar Haveli and Daman and Diu", type: "ut" },
  { name: "Delhi", type: "ut" },
  { name: "Jammu and Kashmir", type: "ut" },
  { name: "Ladakh", type: "ut" },
  { name: "Lakshadweep", type: "ut" },
  { name: "Puducherry", type: "ut" },
]

const OCCUPATIONS = [
  { id: "student", label: "Student", icon: GraduationCap },
  { id: "farmer", label: "Farmer", icon: Tractor },
  { id: "daily-wage", label: "Daily Wage Worker", icon: HardHat },
  { id: "business", label: "Small Business", icon: Briefcase },
  { id: "salaried", label: "Salaried", icon: Building2 },
  { id: "unemployed", label: "Unemployed", icon: UserX },
]

const CASTE_CATEGORIES = [
  { id: "general", label: "General" },
  { id: "obc", label: "OBC" },
  { id: "sc", label: "SC" },
  { id: "st", label: "ST" },
]

const GENDERS = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
  { id: "other", label: "Other" },
]

const INCOME_RANGES = [
  { id: "below-1l", label: "Below ₹1L", max: 100000 },
  { id: "1l-3l", label: "₹1L–3L", max: 300000 },
  { id: "3l-8l", label: "₹3L–8L", max: 800000 },
  { id: "8l-15l", label: "₹8L–15L", max: 1500000 },
  { id: "above-15l", label: "Above ₹15L", max: 10000000 },
]

const SCHEME_CATEGORIES = [
  { id: "agriculture", label: "Agriculture", icon: Wheat, color: "#10B981" },
  { id: "education", label: "Education", icon: GraduationCap, color: "#8B5CF6" },
  { id: "health", label: "Health", icon: Heart, color: "#EF4444" },
  { id: "housing", label: "Housing", icon: Home, color: "#EC4899" },
  { id: "women", label: "Women", icon: Baby, color: "#F97316" },
  { id: "employment", label: "Employment", icon: TrendingUp, color: "#F59E0B" },
  { id: "business", label: "Business", icon: Briefcase, color: "#3B82F6" },
  { id: "social", label: "Social Welfare", icon: Users, color: "#14B8A6" },
]

const STEPS = [
  { id: 1, label: "Personal" },
  { id: 2, label: "Financial" },
  { id: 3, label: "Profile" },
  { id: 4, label: "Find" },
]

export interface EligibilityFormData {
  age: string
  gender: string
  state: string
  incomeRange: string
  casteCategory: string
  occupation: string
  schemeCategories: string[]
}

interface EligibilityFormProps {
  onComplete: (data: EligibilityFormData) => void
  preSelectedCategory?: string | null
}

export function EligibilityForm({ onComplete, preSelectedCategory }: EligibilityFormProps) {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [stateSearch, setStateSearch] = useState("")
  const [showStateDropdown, setShowStateDropdown] = useState(false)
  const [isExploding, setIsExploding] = useState(false)
  const [explosionOrigin, setExplosionOrigin] = useState({ x: 0, y: 0 })
  const [shakeField, setShakeField] = useState<string | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const ageInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<EligibilityFormData>({
    age: "",
    gender: "",
    state: "",
    incomeRange: "",
    casteCategory: "",
    occupation: "",
    schemeCategories: preSelectedCategory ? [preSelectedCategory] : [],
  })

  // Pre-select category if passed from homepage
  useEffect(() => {
    if (preSelectedCategory && !formData.schemeCategories.includes(preSelectedCategory)) {
      setFormData(prev => ({
        ...prev,
        schemeCategories: [...prev.schemeCategories, preSelectedCategory]
      }))
    }
  }, [preSelectedCategory, formData.schemeCategories])

  const states = INDIAN_STATES.filter(s =>
    s.name.toLowerCase().includes(stateSearch.toLowerCase())
  )
  const groupedStates = {
    states: states.filter(s => s.type === "state"),
    uts: states.filter(s => s.type === "ut"),
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.age && parseInt(formData.age) >= 1 && parseInt(formData.age) <= 100 && formData.gender && formData.state
      case 2:
        return formData.incomeRange && formData.casteCategory
      case 3:
        return formData.occupation
      case 4:
        return true
      default:
        return false
    }
  }

  const shakeInvalidFields = () => {
    switch (step) {
      case 1:
        if (!formData.age || parseInt(formData.age) < 1 || parseInt(formData.age) > 100) {
          setShakeField("age")
        } else if (!formData.gender) {
          setShakeField("gender")
        } else if (!formData.state) {
          setShakeField("state")
        }
        break
      case 2:
        if (!formData.incomeRange) {
          setShakeField("income")
        } else if (!formData.casteCategory) {
          setShakeField("caste")
        }
        break
      case 3:
        if (!formData.occupation) {
          setShakeField("occupation")
        }
        break
    }
    setTimeout(() => setShakeField(null), 500)
  }

  const nextStep = () => {
    if (!isStepValid()) {
      shakeInvalidFields()
      return
    }
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
      onComplete(formData)
    }
  }

  const handleExplosionComplete = () => {
    setIsExploding(false)
  }

  const prevStep = () => {
    if (step > 1) {
      setDirection(-1)
      setStep(step - 1)
    }
  }

  const toggleSchemeCategory = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      schemeCategories: prev.schemeCategories.includes(categoryId)
        ? prev.schemeCategories.filter(c => c !== categoryId)
        : [...prev.schemeCategories, categoryId]
    }))
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

  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            {/* Age Input */}
            <motion.div 
              className="space-y-3"
              animate={shakeField === "age" ? shakeAnimation : {}}
            >
              <label className="block text-sm font-medium text-[#9CA3AF]">Age</label>
              <div className="relative">
                <input
                  ref={ageInputRef}
                  type="number"
                  min={1}
                  max={100}
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="Enter your age"
                  className="w-full rounded-xl border border-[#1E2D45] bg-[#1F2937] px-4 py-4 text-[#F9FAFB] placeholder-[#6B7280] outline-none transition-all focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                {formData.age && parseInt(formData.age) >= 1 && parseInt(formData.age) <= 100 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <Check className="h-5 w-5 text-[#10B981]" />
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Gender Pills */}
            <motion.div 
              className="space-y-3"
              animate={shakeField === "gender" ? shakeAnimation : {}}
            >
              <label className="block text-sm font-medium text-[#9CA3AF]">Gender</label>
              <div className="flex gap-3">
                {GENDERS.map((gender) => (
                  <motion.button
                    key={gender.id}
                    onClick={() => setFormData({ ...formData, gender: gender.id })}
                    className={`relative flex-1 rounded-full px-6 py-3 text-sm font-medium transition-all ${
                      formData.gender === gender.id
                        ? "bg-[#F97316] text-white"
                        : "border border-[#1E2D45] bg-[#1F2937] text-[#9CA3AF] hover:border-[#F97316]/50 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      boxShadow: formData.gender === gender.id 
                        ? "0 0 20px rgba(249, 115, 22, 0.4)" 
                        : "none"
                    }}
                  >
                    {gender.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* State Dropdown */}
            <motion.div 
              className="space-y-3"
              animate={shakeField === "state" ? shakeAnimation : {}}
            >
              <label className="block text-sm font-medium text-[#9CA3AF]">State / UT</label>
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
                  <input
                    type="text"
                    value={formData.state || stateSearch}
                    onChange={(e) => {
                      setStateSearch(e.target.value)
                      setShowStateDropdown(true)
                      if (!e.target.value) setFormData({ ...formData, state: "" })
                    }}
                    onFocus={() => setShowStateDropdown(true)}
                    placeholder="Search your state..."
                    className="w-full rounded-xl border border-[#1E2D45] bg-[#1F2937] py-4 pl-12 pr-4 text-[#F9FAFB] placeholder-[#6B7280] outline-none transition-all focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20"
                  />
                  {formData.state && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <Check className="h-5 w-5 text-[#10B981]" />
                    </motion.div>
                  )}
                </div>
                <AnimatePresence>
                  {showStateDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-50 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-[#1E2D45] bg-[#111827]/98 backdrop-blur-xl"
                    >
                      {groupedStates.states.length > 0 && (
                        <>
                          <div className="sticky top-0 bg-[#111827] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#F97316]">
                            States
                          </div>
                          {groupedStates.states.map((state) => (
                            <button
                              key={state.name}
                              onClick={() => {
                                setFormData({ ...formData, state: state.name })
                                setStateSearch("")
                                setShowStateDropdown(false)
                              }}
                              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[#E5E7EB] transition-colors hover:bg-[#F97316]/10 hover:text-white"
                            >
                              <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                              {state.name}
                            </button>
                          ))}
                        </>
                      )}
                      {groupedStates.uts.length > 0 && (
                        <>
                          <div className="sticky top-0 bg-[#111827] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#3B82F6]">
                            Union Territories
                          </div>
                          {groupedStates.uts.map((state) => (
                            <button
                              key={state.name}
                              onClick={() => {
                                setFormData({ ...formData, state: state.name })
                                setStateSearch("")
                                setShowStateDropdown(false)
                              }}
                              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[#E5E7EB] transition-colors hover:bg-[#F97316]/10 hover:text-white"
                            >
                              <span className="h-2 w-2 rounded-full bg-[#3B82F6]" />
                              {state.name}
                            </button>
                          ))}
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            {/* Income Range Cards */}
            <motion.div 
              className="space-y-3"
              animate={shakeField === "income" ? shakeAnimation : {}}
            >
              <label className="block text-sm font-medium text-[#9CA3AF]">Annual Income</label>
              <div className="flex flex-wrap gap-3">
                {INCOME_RANGES.map((range) => (
                  <motion.button
                    key={range.id}
                    onClick={() => setFormData({ ...formData, incomeRange: range.id })}
                    className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                      formData.incomeRange === range.id
                        ? "border-[#10B981] bg-[#10B981]/10 text-[#10B981]"
                        : "border-[#1E2D45] bg-[#1F2937] text-[#9CA3AF] hover:border-[#10B981]/50"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <IndianRupee className="h-4 w-4" />
                    {range.label}
                    {formData.incomeRange === range.id && (
                      <Check className="h-4 w-4" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Caste Category Pills */}
            <motion.div 
              className="space-y-3"
              animate={shakeField === "caste" ? shakeAnimation : {}}
            >
              <label className="block text-sm font-medium text-[#9CA3AF]">Caste Category</label>
              <div className="flex gap-3">
                {CASTE_CATEGORIES.map((caste) => (
                  <motion.button
                    key={caste.id}
                    onClick={() => setFormData({ ...formData, casteCategory: caste.id })}
                    className={`relative flex-1 rounded-full px-4 py-3 text-sm font-medium transition-all ${
                      formData.casteCategory === caste.id
                        ? "bg-[#F97316] text-white"
                        : "border border-[#1E2D45] bg-[#1F2937] text-[#9CA3AF] hover:border-[#F97316]/50 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      boxShadow: formData.casteCategory === caste.id 
                        ? "0 0 20px rgba(249, 115, 22, 0.4)" 
                        : "none"
                    }}
                  >
                    {caste.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            {/* Occupation Cards */}
            <motion.div 
              className="space-y-3"
              animate={shakeField === "occupation" ? shakeAnimation : {}}
            >
              <label className="block text-sm font-medium text-[#9CA3AF]">Occupation</label>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {OCCUPATIONS.map((occupation) => {
                  const Icon = occupation.icon
                  const isSelected = formData.occupation === occupation.id
                  return (
                    <motion.button
                      key={occupation.id}
                      onClick={() => setFormData({ ...formData, occupation: occupation.id })}
                      className={`relative flex flex-col items-center gap-3 rounded-xl border p-5 transition-all ${
                        isSelected
                          ? "border-[#10B981] bg-[#10B981]/10"
                          : "border-[#1E2D45] bg-[#1F2937] hover:border-[#10B981]/50"
                      }`}
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      animate={isSelected ? { y: -4 } : { y: 0 }}
                      style={{
                        boxShadow: isSelected ? "0 8px 25px rgba(16, 185, 129, 0.3)" : "none",
                      }}
                    >
                      <Icon className={`h-7 w-7 ${isSelected ? "text-[#10B981]" : "text-[#9CA3AF]"}`} />
                      <span className={`text-sm font-medium ${isSelected ? "text-white" : "text-[#E5E7EB]"}`}>
                        {occupation.label}
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
            </motion.div>

            {/* Scheme Category Multi-Select */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-[#9CA3AF]">
                Interested Categories <span className="text-[#6B7280]">(optional)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {SCHEME_CATEGORIES.map((category) => {
                  const Icon = category.icon
                  const isSelected = formData.schemeCategories.includes(category.id)
                  return (
                    <motion.button
                      key={category.id}
                      onClick={() => toggleSchemeCategory(category.id)}
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        isSelected
                          ? "text-white"
                          : "border border-[#1E2D45] bg-[#1F2937] text-[#9CA3AF] hover:border-[#10B981]/50"
                      }`}
                      style={{
                        backgroundColor: isSelected ? category.color : undefined,
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="h-4 w-4" />
                      {category.label}
                      {isSelected && <Check className="h-3 w-3" />}
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Review Your Details</h3>
            <div className="space-y-3">
              {[
                { label: "Age", value: `${formData.age} years`, step: 1 },
                { label: "Gender", value: GENDERS.find(g => g.id === formData.gender)?.label || "", step: 1 },
                { label: "State", value: formData.state, step: 1 },
                { label: "Annual Income", value: INCOME_RANGES.find(i => i.id === formData.incomeRange)?.label || "", step: 2 },
                { label: "Caste Category", value: CASTE_CATEGORIES.find(c => c.id === formData.casteCategory)?.label || "", step: 2 },
                { label: "Occupation", value: OCCUPATIONS.find(o => o.id === formData.occupation)?.label || "", step: 3 },
                ...(formData.schemeCategories.length > 0 ? [{
                  label: "Categories",
                  value: formData.schemeCategories.map(c => SCHEME_CATEGORIES.find(sc => sc.id === c)?.label).join(", "),
                  step: 3
                }] : []),
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl border border-[#1E2D45] bg-[#1F2937]/50 p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div>
                    <p className="text-sm text-[#9CA3AF]">{item.label}</p>
                    <p className="font-medium text-white">{item.value}</p>
                  </div>
                  <button
                    onClick={() => {
                      setDirection(-1)
                      setStep(item.step)
                    }}
                    className="rounded-lg p-2 text-[#9CA3AF] transition-colors hover:bg-[#1E2D45] hover:text-white"
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
      
      <section id="eligibility-form" className="relative py-20">
        {/* Emerald radial glow background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#10B981]/10 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-2xl px-4">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-4 py-2">
              <BadgeCheck className="h-5 w-5 text-[#10B981]" />
              <span className="text-sm font-medium text-[#10B981]">Eligibility Check</span>
            </div>
            <h2 className="mb-3 text-3xl font-bold text-[#F9FAFB] md:text-4xl">
              Check Your Eligibility
            </h2>
            <p className="text-[#9CA3AF]">
              Answer a few questions to discover schemes you qualify for
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-[#1E2D45] p-6 sm:p-8"
            style={{
              background: "rgba(17, 24, 39, 0.95)",
              boxShadow: "0 0 60px rgba(16, 185, 129, 0.1)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {STEPS.map((s, index) => (
                  <div key={s.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <motion.div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all ${
                          step > s.id
                            ? "border-[#10B981] bg-[#10B981] text-white"
                            : step === s.id
                            ? "border-[#F97316] bg-[#F97316] text-white"
                            : "border-[#1E2D45] bg-[#1F2937] text-[#6B7280]"
                        }`}
                        animate={step === s.id ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {step > s.id ? <Check className="h-5 w-5" /> : s.id}
                      </motion.div>
                      <span className={`mt-2 text-xs font-medium ${
                        step >= s.id ? "text-[#F9FAFB]" : "text-[#6B7280]"
                      }`}>
                        {s.label}
                      </span>
                    </div>
                    {index < STEPS.length - 1 && (
                      <div className="mx-2 h-0.5 w-12 sm:w-20">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: step > s.id ? "#10B981" : "#1E2D45",
                          }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: step > s.id ? 1 : 0 }}
                          transition={{ duration: 0.3, type: "spring" }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
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

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between">
              <motion.button
                onClick={prevStep}
                className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all ${
                  step === 1
                    ? "cursor-not-allowed text-[#6B7280]"
                    : "text-[#9CA3AF] hover:bg-[#1E2D45] hover:text-white"
                }`}
                disabled={step === 1}
                whileHover={step > 1 ? { x: -4 } : {}}
                whileTap={step > 1 ? { scale: 0.98 } : {}}
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </motion.button>

              {step < 4 ? (
                <motion.button
                  onClick={nextStep}
                  className="flex items-center gap-2 rounded-xl bg-[#F97316] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#EA580C]"
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              ) : (
                <motion.button
                  ref={buttonRef}
                  onClick={nextStep}
                  className="flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white transition-all"
                  style={{
                    background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                    boxShadow: "0 4px 20px rgba(249, 115, 22, 0.4)",
                  }}
                  whileHover={{ scale: 1.02, boxShadow: "0 6px 30px rgba(249, 115, 22, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Find My Schemes
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
