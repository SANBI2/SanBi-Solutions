"use client"

import { useEffect, useState } from "react"

interface CountUpProps {
  end: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
}

export const CountUp = ({ end, duration = 2, decimals = 0, prefix = "", suffix = "" }: CountUpProps) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const startAnimation = (timestamp: number) => {
      startTime = timestamp
      updateCount(timestamp)
    }

    const updateCount = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const currentCount = progress * end

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount)
      }
    }

    animationFrame = requestAnimationFrame(startAnimation)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [end, duration])

  return (
    <span>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  )
}

