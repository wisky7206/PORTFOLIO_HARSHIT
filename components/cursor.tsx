"use client"

import { useEffect, useState } from "react"

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [codeHovered, setCodeHovered] = useState(false)

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseenter", onMouseEnter)
      document.addEventListener("mouseleave", onMouseLeave)
      document.addEventListener("mousedown", onMouseDown)
      document.addEventListener("mouseup", onMouseUp)
    }

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const onMouseEnter = () => {
      setHidden(false)
    }

    const onMouseLeave = () => {
      setHidden(true)
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    const handleElementHoverEvents = () => {
      document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true))
        el.addEventListener("mouseleave", () => setLinkHovered(false))
      })

      // Add event listeners for code elements
      setTimeout(() => {
        document.querySelectorAll(".code-display").forEach((el) => {
          el.addEventListener("mouseenter", () => setCodeHovered(true))
          el.addEventListener("mouseleave", () => setCodeHovered(false))
        })
      }, 1000)
    }

    addEventListeners()
    handleElementHoverEvents()
    return () => removeEventListeners()
  }, [])

  return (
    <div
      className={`fixed pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ${
        hidden ? "opacity-0" : "opacity-100"
      } ${clicked ? "scale-75" : ""} ${linkHovered ? "scale-150" : ""} ${codeHovered ? "scale-[1.5] opacity-70" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className={`h-5 w-5 rounded-full bg-white transition-all duration-300 ${
          linkHovered ? "bg-opacity-20 h-10 w-10" : ""
        } ${codeHovered ? "bg-opacity-30 h-8 w-8 border border-white" : ""}`}
      />
      {codeHovered && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[8px] whitespace-nowrap opacity-80">
          &lt;/&gt;
        </div>
      )}
    </div>
  )
}
