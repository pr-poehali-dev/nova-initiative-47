import { useEffect, useRef } from "react"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const targetPositionRef = useRef({ x: 0, y: 0 })
  const isPointerRef = useRef(false)

  useEffect(() => {
    let animationFrameId: number

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const updateCursor = () => {
      positionRef.current.x = lerp(positionRef.current.x, targetPositionRef.current.x, 0.15)
      positionRef.current.y = lerp(positionRef.current.y, targetPositionRef.current.y, 0.15)

      if (cursorRef.current) {
        const rotate = isPointerRef.current ? "-30deg" : "0deg"
        cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%) rotate(${rotate})`
      }

      animationFrameId = requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPositionRef.current = { x: e.clientX, y: e.clientY }

      const target = e.target as HTMLElement
      isPointerRef.current =
        window.getComputedStyle(target).cursor === "pointer" || target.tagName === "BUTTON" || target.tagName === "A"
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    animationFrameId = requestAnimationFrame(updateCursor)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-50 will-change-transform"
      style={{
        contain: "layout style paint",
        transition: "transform 0.2s ease",
        transitionProperty: "rotate",
      }}
    >
      <span style={{ fontSize: "20px", lineHeight: 1, display: "block", filter: "drop-shadow(0 0 2px rgba(255,255,255,0.4))" }}>🍷</span>
    </div>
  )
}
