"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  alpha: number
  alphaDirection: number
  pulseSpeed: number
  pulsePhase: number
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particles: Particle[] = []
    const particleCount = 80 // Increased to 80 particles
    const colors = ["#F97316", "#10B981", "#3B82F6"] // Saffron orange, Emerald, and Blue

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 4 + 2, // Varying sizes from 2px to 6px
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
        alphaDirection: Math.random() > 0.5 ? 1 : -1,
        pulseSpeed: Math.random() * 0.02 + 0.01, // Random pulse speed
        pulsePhase: Math.random() * Math.PI * 2, // Random starting phase
      })
    }

    let animationId: number
    let time = 0

    const animate = () => {
      time += 1
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Smooth sinusoidal alpha pulse with random phase
        particle.alpha = 0.3 + Math.sin(time * particle.pulseSpeed + particle.pulsePhase) * 0.3

        // Draw particle with enhanced glow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.alpha
        ctx.shadowBlur = 20 + particle.radius * 3
        ctx.shadowColor = particle.color
        ctx.fill()
        
        // Draw outer glow ring for larger particles
        if (particle.radius > 3) {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2)
          ctx.globalAlpha = particle.alpha * 0.2
          ctx.fill()
        }
        
        ctx.globalAlpha = 1
        ctx.shadowBlur = 0
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    />
  )
}
