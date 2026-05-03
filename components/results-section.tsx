"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ExternalLink, 
  ArrowLeft, 
  Download, 
  Info,
  CheckCircle2,
  Share2,
  Filter,
  FileQuestion,
  FileText
} from "lucide-react"
import { useSuccessChime, useConfetti, useRipple } from "@/hooks/use-effects"
import { useLanguage } from "@/contexts/language-context"

type Category = "all" | "agriculture" | "education" | "health" | "housing" | "women" | "business" | "social"

interface Scheme {
  id: string
  name: string
  ministry: string
  ministryIcon: string
  benefit: string
  benefitAmount: number
  eligibility: string
  category: Category
  level: "central" | "state"
  matchReasons: string[]
  requiredDocuments: string[]
  link: string
}

// Comprehensive schemes database with direct myscheme.gov.in URLs
const SAMPLE_SCHEMES: Scheme[] = [
  // AGRICULTURE SCHEMES
  {
    id: "1",
    name: "PM Kisan Samman Nidhi",
    ministry: "Ministry of Agriculture",
    ministryIcon: "🌾",
    benefit: "₹6,000/year",
    benefitAmount: 6000,
    eligibility: "Small and marginal farmers with cultivable land",
    category: "agriculture",
    level: "central",
    matchReasons: ["Farmer", "Income below ₹2L", "Owns farmland"],
    requiredDocuments: ["Aadhaar Card", "Land holding papers", "Bank Passbook"],
    link: "https://www.myscheme.gov.in/schemes/pm-kisan",
  },
  {
    id: "2",
    name: "PM Fasal Bima Yojana",
    ministry: "Ministry of Agriculture",
    ministryIcon: "🌱",
    benefit: "Crop insurance coverage",
    benefitAmount: 200000,
    eligibility: "All farmers growing notified crops",
    category: "agriculture",
    level: "central",
    matchReasons: ["Farmer", "Crop cultivation", "Land owner/tenant"],
    requiredDocuments: ["Aadhaar Card", "Bank Account Details", "Land records"],
    link: "https://www.myscheme.gov.in/schemes/pmfby",
  },
  {
    id: "3",
    name: "Kisan Credit Card Scheme",
    ministry: "Ministry of Agriculture",
    ministryIcon: "💳",
    benefit: "Up to ₹3 Lakh credit",
    benefitAmount: 300000,
    eligibility: "Farmers, fishermen, and animal husbandry farmers",
    category: "agriculture",
    level: "central",
    matchReasons: ["Farmer", "Agricultural activity", "Credit need"],
    requiredDocuments: ["Aadhaar Card", "PAN Card", "Land ownership records", "Passport size photo"],
    link: "https://www.myscheme.gov.in/schemes/kcc",
  },
  {
    id: "4",
    name: "PM Krishi Sinchai Yojana",
    ministry: "Ministry of Agriculture",
    ministryIcon: "💧",
    benefit: "Irrigation subsidy up to 55%",
    benefitAmount: 50000,
    eligibility: "Farmers requiring irrigation facilities",
    category: "agriculture",
    level: "central",
    matchReasons: ["Farmer", "Irrigation need", "Land owner"],
    requiredDocuments: ["Aadhaar Card", "Bank Details", "Land Certificate"],
    link: "https://www.myscheme.gov.in/schemes/pmksy",
  },
  
  // EDUCATION SCHEMES
  {
    id: "5",
    name: "National Scholarship Portal",
    ministry: "Ministry of Education",
    ministryIcon: "📚",
    benefit: "₹50,000/year",
    benefitAmount: 50000,
    eligibility: "Students from economically weaker sections",
    category: "education",
    level: "central",
    matchReasons: ["Student", "Income below ₹2.5L", "Enrolled in institution"],
    requiredDocuments: ["Aadhaar Card", "Income Certificate", "Caste Certificate", "Bank Passbook"],
    link: "https://www.myscheme.gov.in/schemes/nsp",
  },
  {
    id: "6",
    name: "PM Kaushal Vikas Yojana",
    ministry: "Ministry of Skill Development",
    ministryIcon: "🎓",
    benefit: "Free skill training",
    benefitAmount: 15000,
    eligibility: "Youth aged 15-45 seeking employment skills",
    category: "education",
    level: "central",
    matchReasons: ["Youth", "Seeking employment", "Skill training needed"],
    requiredDocuments: ["Aadhaar Card", "Identity Proof", "Bank Details"],
    link: "https://www.myscheme.gov.in/schemes/pmkvy",
  },
  {
    id: "7",
    name: "Post Matric Scholarship for SC Students",
    ministry: "Ministry of Social Justice",
    ministryIcon: "🎒",
    benefit: "Full tuition + maintenance",
    benefitAmount: 100000,
    eligibility: "SC students pursuing post-matric education",
    category: "education",
    level: "central",
    matchReasons: ["SC Category", "Post-matric student", "Income below ₹2.5L"],
    requiredDocuments: ["Aadhaar Card", "Caste Certificate", "Income Certificate", "Fee Receipt"],
    link: "https://www.myscheme.gov.in/schemes/pms-sc",
  },
  {
    id: "8",
    name: "Central Sector Scholarship Scheme",
    ministry: "Ministry of Education",
    ministryIcon: "📖",
    benefit: "₹20,000/year",
    benefitAmount: 20000,
    eligibility: "Class 12 passed students above 80 percentile",
    category: "education",
    level: "central",
    matchReasons: ["Merit student", "Family income below ₹8L", "Pursuing graduation"],
    requiredDocuments: ["Aadhaar Card", "Class 12 Marksheet", "Income Certificate", "Bank Details"],
    link: "https://www.myscheme.gov.in/schemes/csss",
  },
  
  // HEALTH SCHEMES
  {
    id: "9",
    name: "Ayushman Bharat PM-JAY",
    ministry: "Ministry of Health",
    ministryIcon: "🏥",
    benefit: "₹5 Lakh cover",
    benefitAmount: 500000,
    eligibility: "Families under BPL and deprived households",
    category: "health",
    level: "central",
    matchReasons: ["BPL Category", "Deprived household", "No health insurance"],
    requiredDocuments: ["Aadhaar Card", "Ration Card", "Mobile Number"],
    link: "https://www.myscheme.gov.in/schemes/ab-pmjay",
  },
  {
    id: "10",
    name: "Janani Suraksha Yojana",
    ministry: "Ministry of Health",
    ministryIcon: "👶",
    benefit: "₹1,400 cash assistance",
    benefitAmount: 1400,
    eligibility: "Pregnant women from BPL families",
    category: "health",
    level: "central",
    matchReasons: ["Pregnant woman", "BPL family", "Institutional delivery"],
    requiredDocuments: ["Aadhaar Card", "BPL Ration Card", "Bank Passbook", "MCP Card"],
    link: "https://www.myscheme.gov.in/schemes/jsy",
  },
  {
    id: "11",
    name: "PM Surakshit Matritva Abhiyan",
    ministry: "Ministry of Health",
    ministryIcon: "🤰",
    benefit: "Free prenatal checkups",
    benefitAmount: 5000,
    eligibility: "All pregnant women on 9th of every month",
    category: "health",
    level: "central",
    matchReasons: ["Pregnant woman", "Seeking prenatal care"],
    requiredDocuments: ["Aadhaar Card", "Pregnancy Registration/MCP Card"],
    link: "https://www.myscheme.gov.in/schemes/pmsma",
  },
  
  // HOUSING SCHEMES
  {
    id: "12",
    name: "PM Awas Yojana (Urban)",
    ministry: "Ministry of Housing",
    ministryIcon: "🏠",
    benefit: "₹2.67 Lakh subsidy",
    benefitAmount: 267000,
    eligibility: "EWS/LIG families without pucca house in urban areas",
    category: "housing",
    level: "central",
    matchReasons: ["Urban resident", "No pucca house", "EWS/LIG category"],
    requiredDocuments: ["Aadhaar Card", "Income Certificate", "Affidavit stating no pucca house", "Bank Details"],
    link: "https://www.myscheme.gov.in/schemes/pmay-u",
  },
  {
    id: "13",
    name: "PM Awas Yojana (Gramin)",
    ministry: "Ministry of Rural Development",
    ministryIcon: "🏡",
    benefit: "₹1.20 Lakh assistance",
    benefitAmount: 120000,
    eligibility: "Houseless rural families or living in kutcha houses",
    category: "housing",
    level: "central",
    matchReasons: ["Rural resident", "No pucca house", "BPL household"],
    requiredDocuments: ["Aadhaar Card", "Job Card (MGNREGA)", "Bank Account Details", "Swachh Bharat Mission (SBM) number"],
    link: "https://www.myscheme.gov.in/schemes/pmayg",
  },
  {
    id: "14",
    name: "Pradhan Mantri Ujjwala Yojana",
    ministry: "Ministry of Petroleum",
    ministryIcon: "🔥",
    benefit: "Free LPG connection",
    benefitAmount: 1600,
    eligibility: "BPL households without LPG connection",
    category: "housing",
    level: "central",
    matchReasons: ["BPL family", "No LPG connection", "Adult woman in household"],
    requiredDocuments: ["Aadhaar Card", "BPL Ration Card", "Passport Size Photo", "Bank Passbook"],
    link: "https://www.myscheme.gov.in/schemes/pmuy",
  },
  
  // BUSINESS SCHEMES
  {
    id: "15",
    name: "PM Mudra Yojana",
    ministry: "Ministry of Finance",
    ministryIcon: "💼",
    benefit: "Up to ₹10 Lakh loan",
    benefitAmount: 1000000,
    eligibility: "Non-corporate, non-farm small/micro enterprises",
    category: "business",
    level: "central",
    matchReasons: ["Self-employed", "Business owner", "Micro enterprise"],
    requiredDocuments: ["Aadhaar Card", "PAN Card", "Business Proof", "Bank Statement"],
    link: "https://www.myscheme.gov.in/schemes/pmmy",
  },
  {
    id: "16",
    name: "PM SVANidhi",
    ministry: "Ministry of Housing & Urban Affairs",
    ministryIcon: "🛒",
    benefit: "₹10,000 working capital loan",
    benefitAmount: 10000,
    eligibility: "Street vendors in urban areas",
    category: "business",
    level: "central",
    matchReasons: ["Street vendor", "Urban area", "Self-employed"],
    requiredDocuments: ["Aadhaar Card", "Vending Certificate/ID Card", "Bank Account Details"],
    link: "https://www.myscheme.gov.in/schemes/pm-svanidhi",
  },
  {
    id: "17",
    name: "Stand Up India",
    ministry: "Ministry of Finance",
    ministryIcon: "🚀",
    benefit: "₹10L - ₹1Cr loan",
    benefitAmount: 10000000,
    eligibility: "SC/ST or women entrepreneurs for greenfield enterprise",
    category: "business",
    level: "central",
    matchReasons: ["SC/ST/Woman", "New enterprise", "Business plan ready"],
    requiredDocuments: ["Aadhaar Card", "Caste Certificate (if applicable)", "Business Plan", "Bank Details"],
    link: "https://www.myscheme.gov.in/schemes/sui",
  },
  {
    id: "18",
    name: "PM Employment Generation Programme",
    ministry: "Ministry of MSME",
    ministryIcon: "🏭",
    benefit: "Up to ₹50 Lakh project cost",
    benefitAmount: 5000000,
    eligibility: "Individuals above 18 for setting up new enterprises",
    category: "business",
    level: "central",
    matchReasons: ["Adult citizen", "New business idea", "Manufacturing/Service sector"],
    requiredDocuments: ["Aadhaar Card", "Project Report", "Education/Skill Certificate", "Caste/Special Category Certificate (if applicable)"],
    link: "https://www.myscheme.gov.in/schemes/pmegp",
  },
  
  // SOCIAL WELFARE SCHEMES
  {
    id: "19",
    name: "PM Jan Dhan Yojana",
    ministry: "Ministry of Finance",
    ministryIcon: "🏦",
    benefit: "Zero balance account + ₹2L insurance",
    benefitAmount: 200000,
    eligibility: "Any Indian citizen without a bank account",
    category: "social",
    level: "central",
    matchReasons: ["No bank account", "Indian citizen", "Adult"],
    requiredDocuments: ["Aadhaar Card", "Passport Size Photo"],
    link: "https://www.myscheme.gov.in/schemes/pmjdy",
  },
  {
    id: "20",
    name: "Atal Pension Yojana",
    ministry: "Ministry of Finance",
    ministryIcon: "👴",
    benefit: "₹1,000-5,000/month pension",
    benefitAmount: 60000,
    eligibility: "Workers aged 18-40 in unorganized sector",
    category: "social",
    level: "central",
    matchReasons: ["Age 18-40", "Unorganized sector", "No pension coverage"],
    requiredDocuments: ["Aadhaar Card", "Savings Bank Account"],
    link: "https://www.myscheme.gov.in/schemes/apy",
  },
  {
    id: "21",
    name: "PM Jeevan Jyoti Bima Yojana",
    ministry: "Ministry of Finance",
    ministryIcon: "🛡️",
    benefit: "₹2 Lakh life cover",
    benefitAmount: 200000,
    eligibility: "Bank account holders aged 18-50",
    category: "social",
    level: "central",
    matchReasons: ["Age 18-50", "Bank account holder", "Low premium ₹436/year"],
    requiredDocuments: ["Aadhaar Card", "Bank Account Details", "Nominee Details"],
    link: "https://www.myscheme.gov.in/schemes/pmjjby",
  },
  {
    id: "22",
    name: "MGNREGA",
    ministry: "Ministry of Rural Development",
    ministryIcon: "👷",
    benefit: "100 days employment guarantee",
    benefitAmount: 20000,
    eligibility: "Adult members of rural households seeking unskilled work",
    category: "social",
    level: "central",
    matchReasons: ["Rural household", "Adult member", "Willing to do unskilled work"],
    requiredDocuments: ["Aadhaar Card", "Bank Passbook", "Passport Size Photo"],
    link: "https://www.myscheme.gov.in/schemes/mgnrega",
  },
  
  // WOMEN WELFARE SCHEMES
  {
    id: "23",
    name: "Sukanya Samriddhi Yojana",
    ministry: "Ministry of Finance",
    ministryIcon: "👧",
    benefit: "8.2% interest p.a.",
    benefitAmount: 82000,
    eligibility: "Parents/guardians of girl child below 10 years",
    category: "women",
    level: "central",
    matchReasons: ["Daughter under 10", "Parent/Guardian", "Savings for education/marriage"],
    requiredDocuments: ["Birth Certificate of Girl Child", "Aadhaar Card of Parent", "Address Proof"],
    link: "https://www.myscheme.gov.in/schemes/ssy",
  },
  {
    id: "24",
    name: "Beti Bachao Beti Padhao",
    ministry: "Ministry of Women & Child Development",
    ministryIcon: "👩‍🎓",
    benefit: "Various education benefits",
    benefitAmount: 25000,
    eligibility: "Girl children across India",
    category: "women",
    level: "central",
    matchReasons: ["Girl child", "School-going age", "Need educational support"],
    requiredDocuments: ["Birth Certificate", "Aadhaar Card", "School Admission Proof"],
    link: "https://www.myscheme.gov.in/schemes/bbbp",
  },
  {
    id: "25",
    name: "PM Matru Vandana Yojana",
    ministry: "Ministry of Women & Child Development",
    ministryIcon: "🤱",
    benefit: "₹5,000 cash incentive",
    benefitAmount: 5000,
    eligibility: "Pregnant women and lactating mothers for first live birth",
    category: "women",
    level: "central",
    matchReasons: ["First pregnancy", "Age 19+", "Registered at Anganwadi"],
    requiredDocuments: ["Aadhaar Card", "MCP Card", "Bank Passbook", "Proof of Identity"],
    link: "https://www.myscheme.gov.in/schemes/pmmvy",
  },
  {
    id: "26",
    name: "Free Sewing Machine Scheme",
    ministry: "Ministry of Textiles",
    ministryIcon: "🧵",
    benefit: "Free sewing machine",
    benefitAmount: 15000,
    eligibility: "Women from low-income families aged 20-40",
    category: "women",
    level: "central",
    matchReasons: ["Woman", "Age 20-40", "Low income family"],
    requiredDocuments: ["Aadhaar Card", "Income Certificate", "Age Proof", "Passport Size Photo"],
    link: "https://www.myscheme.gov.in/schemes/fsms",
  },
]

interface EligibilityFormData {
  age: string
  gender: string
  state: string
  incomeRange: string
  casteCategory: string
  occupation: string
  schemeCategories: string[]
}

interface ResultsSectionProps {
  onBack: () => void
  formData?: EligibilityFormData | null
}

// Fixed-height scheme card component
function SchemeCard({ scheme, index }: { scheme: Scheme; index: number }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [showDocsTooltip, setShowDocsTooltip] = useState(false)
  const createRipple = useRipple()

  const categoryColors: Record<Category, string> = {
    all: "#F97316",
    agriculture: "#22c55e",
    education: "#3b82f6",
    health: "#ef4444",
    housing: "#f59e0b",
    women: "#ec4899",
    business: "#8b5cf6",
    social: "#06b6d4",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 100, damping: 20 }}
      className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-[#1E2D45] bg-[#111827] p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#10B981] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
      style={{ willChange: "transform" }}
    >
      {/* Top bar - fixed height */}
      <div className="mb-3 flex h-12 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{scheme.ministryIcon}</span>
          <span 
            className="rounded-full px-2.5 py-1 text-xs font-medium"
            style={{ 
              backgroundColor: `${categoryColors[scheme.category]}20`,
              color: categoryColors[scheme.category]
            }}
          >
            {scheme.category.charAt(0).toUpperCase() + scheme.category.slice(1)}
          </span>
        </div>
        
        {/* Icons section */}
        <div className="flex items-center gap-2">
          {/* Required Documents badge */}
          <div 
            className="relative"
            onMouseEnter={() => setShowDocsTooltip(true)}
            onMouseLeave={() => setShowDocsTooltip(false)}
          >
            <div className="flex h-7 w-7 cursor-help items-center justify-center rounded-full bg-[#1E2D45] text-[#9CA3AF] transition-colors hover:bg-[#2D3F5F] hover:text-white">
              <FileText className="h-3.5 w-3.5" />
            </div>
            
            <AnimatePresence>
              {showDocsTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-[#1E2D45] bg-[#0B1120] p-3 shadow-xl"
                >
                  <p className="mb-2 text-xs font-medium text-[#3B82F6]">Required Documents:</p>
                  <ul className="list-inside list-disc space-y-1.5">
                    {scheme.requiredDocuments.map((doc, i) => (
                      <li key={i} className="text-xs text-[#9CA3AF]">
                        {doc}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Why you qualify badge */}
          <div 
            className="relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div className="flex h-7 w-7 cursor-help items-center justify-center rounded-full bg-[#1E2D45] text-[#9CA3AF] transition-colors hover:bg-[#2D3F5F] hover:text-white">
            <Info className="h-3.5 w-3.5" />
          </div>
          
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-[#1E2D45] bg-[#0B1120] p-3 shadow-xl"
              >
                <p className="mb-2 text-xs font-medium text-[#F97316]">Why you qualify:</p>
                <div className="space-y-1.5">
                  {scheme.matchReasons.map((reason, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                      <CheckCircle2 className="h-3 w-3 shrink-0 text-[#10B981]" />
                      {reason}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      </div>
      
      {/* Content area - flex-1 with overflow hidden */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Scheme Name - 2 lines max */}
        <h3 className="mb-2 line-clamp-2 text-[15px] font-semibold leading-tight text-[#F9FAFB]">
          {scheme.name}
        </h3>
        
        {/* Benefit Amount - always visible */}
        <p className="mb-2 text-xl font-bold text-[#F97316]">{scheme.benefit}</p>
        
        {/* Eligibility - 1 line truncated */}
        <p className="mb-3 line-clamp-1 text-sm text-[#9CA3AF]">{scheme.eligibility}</p>
        
        {/* Level badge */}
        <span className={`mb-4 w-fit rounded-full px-2.5 py-1 text-xs font-medium ${
          scheme.level === "central" 
            ? "bg-[#F97316]/10 text-[#F97316]" 
            : "bg-[#10B981]/10 text-[#10B981]"
        }`}>
          {scheme.level === "central" ? "Central Govt" : "State Govt"}
        </span>
      </div>
      
      {/* Button row - always at bottom */}
      <div className="mt-auto flex flex-col gap-2">
        <a
          href={scheme.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            createRipple(e as unknown as React.MouseEvent<HTMLElement>)
          }}
          className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#10B981] px-4 py-3 text-sm font-medium text-white transition-all hover:bg-[#0D9668]"
        >
          Apply on Official Site
          <ExternalLink className="h-4 w-4" />
        </a>
        
        <button
          onClick={() => {
            const text = `Check out ${scheme.name} - ${scheme.benefit}!\n\nApply here: ${scheme.link}`
            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#1E2D45] bg-transparent px-4 py-2.5 text-sm text-[#9CA3AF] transition-all hover:border-[#10B981] hover:text-white"
        >
          <Share2 className="h-4 w-4" />
          Share on WhatsApp
        </button>
      </div>
    </motion.div>
  )
}

// Animated Counter Component
function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  
  useEffect(() => {
    const duration = 1500
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * value)
      
      setDisplayValue(current)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [value])
  
  return (
    <span>
      {prefix}{displayValue.toLocaleString("en-IN")}{suffix}
    </span>
  )
}

// Empty state component
function EmptyState({ onModify }: { onModify: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#1E2D45]">
        <FileQuestion className="h-12 w-12 text-[#9CA3AF]" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-[#F9FAFB]">No schemes found</h3>
      <p className="mb-6 max-w-md text-[#9CA3AF]">
        We couldn&apos;t find any schemes matching your exact profile. Try adjusting your filters or categories.
      </p>
      <button
        onClick={onModify}
        className="flex items-center gap-2 rounded-xl bg-[#F97316] px-6 py-3 font-medium text-[#0B1120] transition-all hover:bg-[#F97316]/90"
      >
        <Filter className="h-4 w-4" />
        Modify Profile
      </button>
    </motion.div>
  )
}

export function ResultsSection({ onBack, formData }: ResultsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("all")
  const playChime = useSuccessChime()
  const triggerConfetti = useConfetti()

  // Get relevant categories based on form data (categories + occupation)
  const getRelevantCategories = (): Category[] => {
    const allCategories: Category[] = ["all", "agriculture", "education", "health", "housing", "women", "business", "social"]
    
    if (!formData) return allCategories
    
    // Combine both
    const allRelevant = new Set<Category>()
    if (formData.schemeCategories.length > 0) {
      formData.schemeCategories.forEach(c => allRelevant.add(c as Category))
    }
    
    if (formData.occupation) {
      const occupationCategoryMap: Record<string, Category[]> = {
        "student": ["education", "social"],
        "farmer": ["agriculture", "social", "health"],
        "daily-wage": ["social", "housing", "health"],
        "business": ["business", "social"],
        "salaried": ["housing", "health", "education", "social"],
        "unemployed": ["social", "education", "business"],
      }
      const relevantCats = occupationCategoryMap[formData.occupation] || []
      relevantCats.forEach(c => allRelevant.add(c))
    }
    
    if (allRelevant.size > 0) {
      return ["all", ...Array.from(allRelevant)]
    }
    
    return allCategories
  }

  const relevantCategories = getRelevantCategories()

  // Filter schemes based on formData eligibility (categories AND occupation)
  const getFilteredSchemes = () => {
    if (!formData) return SAMPLE_SCHEMES
    
    // Occupation to category mapping
    const occupationCategoryMap: Record<string, string[]> = {
      "student": ["education", "social"],
      "farmer": ["agriculture", "social", "health"],
      "daily-wage": ["social", "housing", "health"],
      "business": ["business", "social"],
      "salaried": ["housing", "health", "education", "social"],
      "unemployed": ["social", "education", "business"],
    }
    
    const occupationCategories = formData.occupation ? occupationCategoryMap[formData.occupation] || [] : []
    const userSelectedCategories = formData.schemeCategories || []
    
    const allRelevant = new Set<string>()
    occupationCategories.forEach(c => allRelevant.add(c))
    userSelectedCategories.forEach(c => allRelevant.add(c))
    
    return SAMPLE_SCHEMES.filter(scheme => {
      // If we have any relevant categories, filter by them
      if (allRelevant.size > 0) {
        return allRelevant.has(scheme.category)
      }
      
      // If neither, show all schemes
      return true
    })
  }

  const eligibleSchemes = getFilteredSchemes()
  
  // Play effects on mount
  useEffect(() => {
    if (eligibleSchemes.length > 0) {
      const timeout = setTimeout(() => {
        playChime()
        triggerConfetti()
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [eligibleSchemes.length, playChime, triggerConfetti])
  
  const filteredSchemes = activeCategory === "all"
    ? eligibleSchemes
    : eligibleSchemes.filter(s => s.category === activeCategory)
  
  const centralSchemes = eligibleSchemes.filter(s => s.level === "central").length
  const stateSchemes = eligibleSchemes.filter(s => s.level === "state").length
  const totalBenefit = eligibleSchemes.reduce((acc, s) => acc + s.benefitAmount, 0)

  const metrics = [
    { label: "Total Found", value: eligibleSchemes.length, prefix: "", suffix: "" },
    { label: "Central Schemes", value: centralSchemes, prefix: "", suffix: "" },
    { label: "State Schemes", value: stateSchemes, prefix: "", suffix: "" },
    { label: "Est. Annual Benefit", value: totalBenefit, prefix: "₹", suffix: "" },
  ]

  const categoryLabels: Record<Category, string> = {
    all: "All",
    agriculture: "Agriculture",
    education: "Education",
    health: "Health",
    housing: "Housing",
    women: "Women",
    business: "Business",
    social: "Social Welfare",
  }

  return (
    <section className="relative min-h-screen px-4 pb-8 pt-24">
      <div className="mx-auto max-w-6xl">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-sm text-[#9CA3AF] transition-colors hover:text-[#F9FAFB]"
        >
          <ArrowLeft className="h-4 w-4" />
          Modify Profile
        </motion.button>

        {/* Animated Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-8 overflow-hidden rounded-2xl border border-[#1E2D45] bg-[#111827]"
        >
          {/* Header Title */}
          <div className="border-b border-[#1E2D45] p-6 text-center">
            <motion.h1 
              className="text-2xl font-bold text-[#F9FAFB] md:text-3xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              We found <span className="text-[#10B981]"><AnimatedNumber value={eligibleSchemes.length} /></span> schemes matching your profile
            </motion.h1>
          </div>
          
          {/* Metric Pills - Separate section with proper padding */}
          <div className="bg-[#0B1120]/50 p-4">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex flex-col items-center rounded-xl border border-[#1E2D45] bg-[#111827] px-4 py-3 text-center"
                >
                  <span className="mb-1 text-xs text-[#9CA3AF]">{metric.label}</span>
                  <span className="text-lg font-bold text-[#F9FAFB]">
                    <AnimatedNumber value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Filter Chips - Only relevant categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 flex flex-wrap items-center gap-2"
        >
          <Filter className="mr-2 h-4 w-4 text-[#9CA3AF]" />
          {relevantCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-[#10B981] text-white"
                  : "border border-[#1E2D45] bg-[#111827] text-[#9CA3AF] hover:border-[#10B981] hover:text-white"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </motion.div>

        {/* Results Grid or Empty State */}
        {filteredSchemes.length === 0 ? (
          <EmptyState onModify={onBack} />
        ) : (
          <motion.div 
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08
                }
              }
            }}
          >
            {filteredSchemes.map((scheme, index) => (
              <SchemeCard key={scheme.id} scheme={scheme} index={index} />
            ))}
          </motion.div>
        )}

        {/* Download All Button */}
        {filteredSchemes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex justify-center"
          >
            <button
              onClick={() => {
                const schemesText = filteredSchemes
                  .map(s => `${s.name}\n${s.benefit}\n${s.link}\n`)
                  .join("\n---\n\n")
                const blob = new Blob([`Your Eligible Schemes\n\n${schemesText}`], { type: "text/plain" })
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = "my-eligible-schemes.txt"
                a.click()
                URL.revokeObjectURL(url)
              }}
              className="flex items-center gap-2 rounded-xl border border-[#1E2D45] bg-[#111827] px-6 py-3 text-sm font-medium text-[#9CA3AF] transition-all hover:border-[#F97316] hover:text-[#F9FAFB]"
            >
              <Download className="h-4 w-4" />
              Download All Schemes
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
