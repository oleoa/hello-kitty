// import { useEffect, useMemo, useRef, useState } from 'react'

import HelloKittyRightGif from './assets/hkr.gif'
import HelloKittyLeftGif from './assets/hkl.gif'

import HelloKittyRightPng from './assets/hkr.png'
import HelloKittyLeftPng from './assets/hkl.png'
import { useAnimation } from './hooks/useAnimation'
import { useEffect } from 'react'

export default function Cursor() {
  const { position, side, isMoving, setGoal } = useAnimation(2)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setGoal({ x: event.clientX, y: event.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [setGoal])

  return (
    <div
      className={'fixed z-40'}
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <img
        src={
          isMoving
            ? side == 'right'
              ? HelloKittyRightPng
              : HelloKittyLeftPng
            : side == 'right'
            ? HelloKittyRightGif
            : HelloKittyLeftGif
        }
        alt="helloKitty"
        className="h-20 hellokitty"
      />
    </div>
  )
}
