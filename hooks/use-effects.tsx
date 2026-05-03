"use client"

import { useCallback } from "react"

// Success chime using Web Audio API
export function useSuccessChime() {
  const playChime = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      
      const playNote = (frequency: number, startTime: number, duration: number) => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.value = frequency
        oscillator.type = "sine"
        
        gainNode.gain.setValueAtTime(0.1, startTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration)
        
        oscillator.start(startTime)
        oscillator.stop(startTime + duration)
      }
      
      // 3-note ascending tone (C5, E5, G5)
      const now = audioContext.currentTime
      playNote(523.25, now, 0.15) // C5
      playNote(659.25, now + 0.1, 0.15) // E5
      playNote(783.99, now + 0.2, 0.2) // G5
    } catch {
      // Audio context not available
    }
  }, [])

  return playChime
}

// Confetti burst
export function useConfetti() {
  const triggerConfetti = useCallback(async () => {
    // Dynamic import for canvas-confetti
    const confetti = (await import("canvas-confetti")).default
    
    const duration = 2000
    const end = Date.now() + duration

    const colors = ["#F97316", "#10B981", "#FFFFFF"]

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }, [])

  return triggerConfetti
}

// Ripple effect hook
export function useRipple() {
  const createRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const ripple = document.createElement("span")
    ripple.style.position = "absolute"
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.style.width = "0"
    ripple.style.height = "0"
    ripple.style.background = "rgba(255, 255, 255, 0.4)"
    ripple.style.borderRadius = "50%"
    ripple.style.transform = "translate(-50%, -50%)"
    ripple.style.animation = "ripple 0.6s ease-out forwards"
    ripple.style.pointerEvents = "none"

    // Add ripple animation if not exists
    if (!document.getElementById("ripple-style")) {
      const style = document.createElement("style")
      style.id = "ripple-style"
      style.textContent = `
        @keyframes ripple {
          to {
            width: 200px;
            height: 200px;
            opacity: 0;
          }
        }
      `
      document.head.appendChild(style)
    }

    button.style.position = "relative"
    button.style.overflow = "hidden"
    button.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }, [])

  return createRipple
}
