"use client"

import { useEffect, useState, useCallback } from "react"

const LOG_LINES = [
  { text: "Connecting to myscheme.gov.in...", delay: 300 },
  { text: "Scanning PM Kisan database... ✓", delay: 600 },
  { text: "Checking state portal...", delay: 400 },
  { text: "Matching income criteria...", delay: 500 },
  { text: "Found 4 agriculture schemes...", delay: 400 },
  { text: "Scanning education schemes...", delay: 450 },
  { text: "Found 3 scholarship programs...", delay: 400 },
  { text: "Checking housing subsidies...", delay: 350 },
  { text: "Found 2 housing schemes...", delay: 400 },
  { text: "Compiling your personalized report...", delay: 500 },
]

const ORBIT_CATEGORIES = [
  { name: "Health", color: "#ef4444", speed: 8, axis: "Y", radius: 120, offset: 0 },
  { name: "Education", color: "#3b82f6", speed: 10, axis: "X", radius: 140, offset: 90 },
  { name: "Housing", color: "#F97316", speed: 12, axis: "Y", radius: 100, offset: 180 },
  { name: "Agriculture", color: "#10B981", speed: 9, axis: "X", radius: 130, offset: 270 },
  { name: "Finance", color: "#a855f7", speed: 11, axis: "Y", radius: 110, offset: 45 },
]

// India map SVG path - simplified wireframe outline
const INDIA_PATH = `M 150,20 
  L 180,25 L 200,40 L 220,35 L 240,50 L 250,70 
  L 245,90 L 260,110 L 255,130 L 270,150 
  L 265,170 L 280,190 L 275,210 L 260,230 
  L 250,260 L 230,280 L 200,290 L 180,285 
  L 160,300 L 140,295 L 120,280 L 100,260 
  L 90,240 L 85,220 L 75,200 L 80,180 
  L 70,160 L 75,140 L 85,120 L 95,100 
  L 110,80 L 120,60 L 135,40 L 150,20 Z`

// State boundaries for wireframe effect
const STATE_LINES = [
  "M 150,80 L 180,100 L 160,130 L 130,110 Z",
  "M 180,100 L 220,120 L 200,160 L 160,130 Z",
  "M 130,110 L 160,130 L 140,170 L 100,150 Z",
  "M 160,130 L 200,160 L 180,200 L 140,170 Z",
  "M 140,170 L 180,200 L 160,240 L 120,210 Z",
  "M 180,200 L 230,220 L 200,260 L 160,240 Z",
]

interface LoadingScreenProps {
  isVisible: boolean
  onComplete: () => void
}

export function LoadingScreen({ isVisible, onComplete }: LoadingScreenProps) {
  const [logLines, setLogLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  const handleComplete = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => {
      onComplete()
    }, 600)
  }, [onComplete])

  // Typewriter effect for log lines
  useEffect(() => {
    if (!isVisible || currentLineIndex >= LOG_LINES.length) return

    const line = LOG_LINES[currentLineIndex]
    let charIndex = 0

    const typeInterval = setInterval(() => {
      if (charIndex <= line.text.length) {
        setCurrentText(line.text.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => {
          setLogLines((prev) => [...prev, line.text])
          setCurrentText("")
          setCurrentLineIndex((prev) => prev + 1)
        }, line.delay)
      }
    }, 30)

    return () => clearInterval(typeInterval)
  }, [isVisible, currentLineIndex])

  // Progress bar animation
  useEffect(() => {
    if (!isVisible) return

    const duration = 4000
    const startTime = Date.now()

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        clearInterval(progressInterval)
        setTimeout(handleComplete, 500)
      }
    }, 50)

    return () => clearInterval(progressInterval)
  }, [isVisible, handleComplete])

  // Reset state when visibility changes
  useEffect(() => {
    if (isVisible) {
      setLogLines([])
      setCurrentLineIndex(0)
      setCurrentText("")
      setProgress(0)
      setIsExiting(false)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B1120] transition-opacity duration-300 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
      style={{ animation: "fadeIn 300ms ease-out" }}
    >
      {/* Scanlines overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
        }}
      />

      {/* Globe container */}
      <div
        className={`relative mb-8 transition-all duration-500 ${
          isExiting ? "scale-50 opacity-0" : "scale-100 opacity-100"
        }`}
        style={{ perspective: "1000px" }}
      >
        {/* 3D Rotating Globe - scales to 60% on mobile */}
        <div
          className="relative h-[180px] w-[180px] md:h-[300px] md:w-[300px]"
          style={{
            transformStyle: "preserve-3d",
            animation: "rotateGlobe 8s linear infinite",
          }}
        >
          {/* Main India outline */}
          <svg
            viewBox="0 0 300 320"
            className="absolute inset-0 h-full w-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Glow filter */}
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="wireGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F97316" />
                <stop offset="50%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>

            {/* Grid lines for globe effect */}
            <g opacity="0.2">
              {[...Array(8)].map((_, i) => (
                <ellipse
                  key={`h-${i}`}
                  cx="150"
                  cy="160"
                  rx={140}
                  ry={20 + i * 15}
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="0.5"
                />
              ))}
              {[...Array(12)].map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={150 + Math.cos((i * 30 * Math.PI) / 180) * 140}
                  y1="20"
                  x2={150 + Math.cos((i * 30 * Math.PI) / 180) * 100}
                  y2="300"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="0.5"
                />
              ))}
            </g>

            {/* State boundary lines */}
            {STATE_LINES.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="rgba(255,153,51,0.3)"
                strokeWidth="1"
                style={{
                  animation: `pulse ${2 + i * 0.3}s ease-in-out infinite`,
                }}
              />
            ))}

            {/* Main outline */}
            <path
              d={INDIA_PATH}
              fill="none"
              stroke="url(#wireGradient)"
              strokeWidth="2"
              filter="url(#glow)"
              style={{
                strokeDasharray: "1000",
                strokeDashoffset: "0",
                animation: "drawPath 3s ease-out forwards",
              }}
            />

            {/* Glowing dots at key cities */}
            {[
              { x: 150, y: 100, name: "Delhi" },
              { x: 200, y: 180, name: "Kolkata" },
              { x: 120, y: 180, name: "Mumbai" },
              { x: 160, y: 260, name: "Chennai" },
              { x: 180, y: 220, name: "Hyderabad" },
            ].map((city, i) => (
              <g key={city.name}>
                <circle
                  cx={city.x}
                  cy={city.y}
                  r="4"
                  fill="#F97316"
                  style={{
                    animation: `cityPulse ${1.5 + i * 0.2}s ease-in-out infinite`,
                  }}
                />
                <circle
                  cx={city.x}
                  cy={city.y}
                  r="8"
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="1"
                  opacity="0.5"
                  style={{
                    animation: `cityRing ${1.5 + i * 0.2}s ease-in-out infinite`,
                  }}
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Orbiting category dots */}
        {ORBIT_CATEGORIES.map((cat, i) => (
          <div
            key={cat.name}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: cat.radius * 2,
              height: cat.radius * 2,
              animation: `orbit${cat.axis} ${cat.speed}s linear infinite`,
              animationDelay: `${-cat.offset / 360 * cat.speed}s`,
            }}
          >
            <div
              className="absolute flex items-center gap-2"
              style={{
                top: "0",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: cat.color,
                  boxShadow: `0 0 10px ${cat.color}, 0 0 20px ${cat.color}`,
                }}
              />
              <span
                className="whitespace-nowrap text-xs font-medium"
                style={{ color: cat.color }}
              >
                {cat.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Terminal log */}
      <div
        className={`mb-8 w-full max-w-lg rounded-lg border border-white/10 bg-black/50 p-4 font-mono text-sm backdrop-blur-sm transition-all duration-500 ${
          isExiting ? "translate-y-10 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="mb-2 flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span className="ml-2 text-xs text-white/40">scheme-scanner v2.4.1</span>
        </div>
        <div className="h-48 overflow-hidden">
          {logLines.map((line, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[#10B981]">{">"}</span>
              <span className={line.includes("✓") || line.includes("Found") ? "text-[#10B981]" : "text-[#10B981]/80"}>
                {line}
              </span>
            </div>
          ))}
          {currentText && (
            <div className="flex items-center gap-2">
              <span className="text-[#10B981]">{">"}</span>
              <span className="text-[#10B981]/80">
                {currentText}
                <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-[#10B981]" />
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div
        className={`w-full max-w-lg transition-all duration-500 ${
          isExiting ? "translate-y-10 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="mb-2 flex justify-between text-xs text-white/60">
          <span>Scanning government databases...</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #F97316 0%, #F97316 100%)",
              boxShadow: "0 0 20px #F97316, 0 0 40px #F97316",
            }}
          />
        </div>
      </div>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes rotateGlobe {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }

        @keyframes orbitY {
          from {
            transform: translate(-50%, -50%) rotateY(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotateY(360deg);
          }
        }

        @keyframes orbitX {
          from {
            transform: translate(-50%, -50%) rotateX(0deg) rotateZ(30deg);
          }
          to {
            transform: translate(-50%, -50%) rotateX(360deg) rotateZ(30deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes cityPulse {
          0%,
          100% {
            r: 3;
            opacity: 1;
          }
          50% {
            r: 5;
            opacity: 0.7;
          }
        }

        @keyframes cityRing {
          0% {
            r: 4;
            opacity: 0.8;
          }
          100% {
            r: 15;
            opacity: 0;
          }
        }

        @keyframes drawPath {
          from {
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  )
}
