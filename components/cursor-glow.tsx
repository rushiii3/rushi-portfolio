"use client"

import { useEffect, useState } from "react"

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  // const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseLeave = () => {
      // setIsVisible(false)
    }

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  // if (typeof window === "undefined") return null

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[-1] transition-opacity duration-300  delay-1000 transition-all`}
      style={{
        background: `radial-gradient(1600px circle at ${position.x}px ${position.y}px, rgba(32,194,14, 0.15), transparent 40%)`,
      }}
    />
  )
}

