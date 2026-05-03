"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type Language = "en" | "hi"

interface Translations {
  [key: string]: {
    en: string
    hi: string
  }
}

export const translations: Translations = {
  // Navbar
  "schemes_indexed": { en: "schemes indexed", hi: "योजनाएं अनुक्रमित" },
  
  // Hero
  "find_your_benefits": { en: "Find Your Government Benefits", hi: "अपने सरकारी लाभ खोजें" },
  "discovering": { en: "Discovering", hi: "खोज रहे हैं" },
  "schemes_across": { en: "schemes across", hi: "योजनाएं" },
  "states": { en: "states", hi: "राज्यों में" },
  "start_finding": { en: "Start Finding Schemes", hi: "योजनाएं खोजना शुरू करें" },
  
  // Form
  "tell_us_about": { en: "Tell Us About Yourself", hi: "अपने बारे में बताएं" },
  "answer_questions": { en: "Answer a few questions to find schemes you're eligible for", hi: "कुछ सवालों के जवाब दें" },
  "step": { en: "Step", hi: "चरण" },
  "of": { en: "of", hi: "का" },
  "personal": { en: "Personal", hi: "व्यक्तिगत" },
  "financial": { en: "Financial", hi: "वित्तीय" },
  "profile": { en: "Profile", hi: "प्रोफ़ाइल" },
  "confirm": { en: "Confirm", hi: "पुष्टि करें" },
  "age": { en: "Age", hi: "आयु" },
  "years": { en: "years", hi: "वर्ष" },
  "gender": { en: "Gender", hi: "लिंग" },
  "male": { en: "Male", hi: "पुरुष" },
  "female": { en: "Female", hi: "महिला" },
  "other": { en: "Other", hi: "अन्य" },
  "state": { en: "State", hi: "राज्य" },
  "search_state": { en: "Search state...", hi: "राज्य खोजें..." },
  "selected": { en: "Selected", hi: "चयनित" },
  "annual_income": { en: "Annual Income", hi: "वार्षिक आय" },
  "category": { en: "Category", hi: "श्रेणी" },
  "occupation": { en: "Occupation", hi: "व्यवसाय" },
  "student": { en: "Student", hi: "छात्र" },
  "farmer": { en: "Farmer", hi: "किसान" },
  "daily_wage": { en: "Daily Wage", hi: "दैनिक मजदूरी" },
  "business": { en: "Business", hi: "व्यापार" },
  "salaried": { en: "Salaried", hi: "वेतनभोगी" },
  "unemployed": { en: "Unemployed", hi: "बेरोजगार" },
  "confirm_details": { en: "Confirm Your Details", hi: "अपना विवरण पुष्टि करें" },
  "back": { en: "Back", hi: "वापस" },
  "continue": { en: "Continue", hi: "जारी रखें" },
  "find_my_schemes": { en: "Find My Schemes", hi: "मेरी योजनाएं खोजें" },
  "back_to_home": { en: "Back to Home", hi: "होम पर वापस जाएं" },
  
  // Results
  "your_eligible_schemes": { en: "Your Eligible Schemes", hi: "आपकी पात्र योजनाएं" },
  "schemes_found": { en: "schemes found for your profile", hi: "योजनाएं आपकी प्रोफ़ाइल के लिए मिलीं" },
  "total_schemes": { en: "Total Schemes", hi: "कुल योजनाएं" },
  "central": { en: "Central", hi: "केंद्रीय" },
  "state_schemes": { en: "State", hi: "राज्य" },
  "est_annual_benefit": { en: "Est. Annual Benefit", hi: "अनु. वार्षिक लाभ" },
  "all": { en: "All", hi: "सभी" },
  "agriculture": { en: "Agriculture", hi: "कृषि" },
  "education": { en: "Education", hi: "शिक्षा" },
  "health": { en: "Health", hi: "स्वास्थ्य" },
  "housing": { en: "Housing", hi: "आवास" },
  "finance": { en: "Finance", hi: "वित्त" },
  "why_you_qualify": { en: "Why you qualify", hi: "आप योग्य क्यों हैं" },
  "eligibility": { en: "Eligibility", hi: "पात्रता" },
  "required_documents": { en: "Required Documents", hi: "आवश्यक दस्तावेज" },
  "deadline": { en: "Deadline", hi: "समय सीमा" },
  "apply_on_portal": { en: "Apply on Official Portal", hi: "आधिकारिक पोर्टल पर आवेदन करें" },
  "share_whatsapp": { en: "Share on WhatsApp", hi: "WhatsApp पर साझा करें" },
  "download_pdf": { en: "Download All Schemes PDF", hi: "सभी योजनाएं PDF डाउनलोड करें" },
  "apply_now": { en: "Apply Now", hi: "अभी आवेदन करें" },
  
  // Loading
  "connecting": { en: "Connecting to myscheme.gov.in...", hi: "myscheme.gov.in से कनेक्ट हो रहा है..." },
  "scanning_pm_kisan": { en: "Scanning PM Kisan database...", hi: "PM किसान डेटाबेस स्कैन कर रहा है..." },
  "checking_state": { en: "Checking state portal...", hi: "राज्य पोर्टल जांच रहा है..." },
  "matching_income": { en: "Matching income criteria...", hi: "आय मानदंड का मिलान कर रहा है..." },
  "found_agriculture": { en: "Found 4 agriculture schemes...", hi: "4 कृषि योजनाएं मिलीं..." },
  "scanning_education": { en: "Scanning education schemes...", hi: "शिक्षा योजनाएं स्कैन कर रहा है..." },
  "found_scholarship": { en: "Found 3 scholarship programs...", hi: "3 छात्रवृत्ति कार्यक्रम मिले..." },
  "compiling_report": { en: "Compiling your personalized report...", hi: "आपकी व्यक्तिगत रिपोर्ट संकलित कर रहा है..." },
  
  // Footer
  "built_at": { en: "Built at Vercel Hackathon 2025 in 3 hours", hi: "Vercel हैकाथॉन 2025 में 3 घंटे में बनाया" },
  "data_source": { en: "Data: myscheme.gov.in", hi: "डेटा: myscheme.gov.in" },
  "not_official": { en: "Not an official government website", hi: "यह आधिकारिक सरकारी वेबसाइट नहीं है" },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
