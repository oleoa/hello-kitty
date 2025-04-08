import { useEffect, useMemo, useRef, useState } from 'react'

// Linear interpolation function for smooth movement
const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor
}

// Calculate distance between two points
const distance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

const defaultInitialPosition: Position = {
  x: typeof window !== 'undefined' ? window.innerWidth / 2 : 600,
  y: typeof window !== 'undefined' ? window.innerHeight / 2 : 600,
}

interface Position {
  x: number
  y: number
}

export function useAnimation(initialVelocity: number, initialPosition: Position = defaultInitialPosition) {
  const [position, setPosition] = useState(initialPosition)
  const [goal, setGoal] = useState(initialPosition)
  const [velocity, setVelocity] = useState(initialVelocity)

  const lastSide = useRef('right')
  const side = useMemo(() => {
    const side = goal.x > position.x ? 'right' : 'left'
    if (goal.x == position.x) return lastSide.current
    lastSide.current = side
    return side
  }, [goal, position])

  const isMoving = useMemo(() => {
    return goal.x === position.x && goal.y === position.y
  }, [goal, position])

  const animationFrame = useRef<number>(0)
  useEffect(() => {
    const animate = () => {
      const currentDistance = distance(position.x, position.y, goal.x, goal.y)
      if (currentDistance > velocity) {
        const factor = velocity / currentDistance
        const newX = lerp(position.x, goal.x, factor)
        const newY = lerp(position.y, goal.y, factor)
        setPosition({ x: newX, y: newY })
        animationFrame.current = requestAnimationFrame(animate)
      } else {
        setPosition(goal)
        cancelAnimationFrame(animationFrame.current)
      }
    }
    animationFrame.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [goal, position, velocity])

  return { position, side, setGoal, isMoving, setVelocity }
}
