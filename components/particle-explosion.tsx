"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
}

interface ParticleExplosionProps {
  isActive: boolean
  originX: number
  originY: number
  onComplete: () => void
}

export function ParticleExplosion({ isActive, originX, originY, onComplete }: ParticleExplosionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!isActive) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const colors = ["#F97316", "#10B981", "#FFFFFF", "#F97316", "#10B981"]
    const particleCount = 60

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5
      const speed = 3 + Math.random() * 8
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        maxLife: 1,
      })
    }

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let allDead = true

      particles.forEach((p) => {
        if (p.life <= 0) return

        allDead = false
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.15 // gravity
        p.vx *= 0.98 // friction
        p.life -= 0.02

        // Ensure radius is never negative
        const radius = Math.max(0, p.size * p.life)
        if (radius <= 0) return

        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0, p.life)
        ctx.fill()
        ctx.globalAlpha = 1
      })

      if (allDead) {
        cancelAnimationFrame(animationId)
        onComplete()
        return
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isActive, originX, originY, onComplete])

  if (!isActive) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ mixBlendMode: "screen" }}
    />
  )
}
