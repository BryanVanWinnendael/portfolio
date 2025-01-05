"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useDrawing } from "@/hooks/useDrawing"
import { drawOnCanvas } from "@/utils/canvas"
import { ThicknessControl } from "@/components/canvas/thicknessControl"

import { Eraser, Redo, Trash, Undo } from "lucide-react"
import { Input } from "../ui/input"
import { useToast } from "@/hooks/use-toast"

const colors = [
  "#ffffff",
  "#000000",
  "#ef4444",
  "#22c55e",
  "#3b82f6",
  "#eab308",
]

const sendmail = async (name: string, drawing: string) => {
  try {
    const data = await fetch("/api/requestDrawing.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        drawing,
      }),
    })

    if (!data.ok) {
      throw new Error("Network error.")
    }

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export default function Index({
  setIsOpen,
}: {
  setIsOpen: (value: boolean) => void
}) {
  const [selected, setSelected] = useState(colors[1])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  const {
    actions,
    currentAction,
    setColor,
    thickness,
    setThickness,
    setIsErasing,
    startDrawing,
    draw,
    endDrawing,
    undo,
    redo,
    clear,
  } = useDrawing()
  const [name, setName] = useState("")
  const { toast } = useToast()

  const handleSubmit = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const drawing = canvas.toDataURL()
    sendmail(name, drawing)
    toast({
      variant: "default",
      title: "Drawing sent!",
    })
    setIsOpen(false)
  }

  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current && canvasRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setCanvasSize({ width, height })
        canvasRef.current.width = width
        canvasRef.current.height = height
      }
    }

    // Initial update with a small delay to ensure the container has rendered
    const initialUpdateTimeout = setTimeout(updateCanvasSize, 0)

    window.addEventListener("resize", updateCanvasSize)

    return () => {
      clearTimeout(initialUpdateTimeout)
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    drawOnCanvas(ctx, actions, currentAction)
  }, [actions, currentAction, canvasSize])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const getCoordinates = (e: MouseEvent | TouchEvent): [number, number] => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height

      if (e instanceof MouseEvent) {
        return [
          (e.clientX - rect.left) * scaleX,
          (e.clientY - rect.top) * scaleY,
        ]
      } else {
        return [
          (e.touches[0].clientX - rect.left) * scaleX,
          (e.touches[0].clientY - rect.top) * scaleY,
        ]
      }
    }

    const handleStart = (e: MouseEvent | TouchEvent) => {
      const [x, y] = getCoordinates(e)
      startDrawing(x, y)
    }

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (currentAction) {
        const [x, y] = getCoordinates(e)
        draw(x, y)
      }
    }

    const handleEnd = () => {
      endDrawing()
    }

    canvas.addEventListener("mousedown", handleStart)
    canvas.addEventListener("mousemove", handleMove)
    canvas.addEventListener("mouseup", handleEnd)
    canvas.addEventListener("mouseleave", handleEnd)
    canvas.addEventListener("touchstart", handleStart)
    canvas.addEventListener("touchmove", handleMove)
    canvas.addEventListener("touchend", handleEnd)

    return () => {
      canvas.removeEventListener("mousedown", handleStart)
      canvas.removeEventListener("mousemove", handleMove)
      canvas.removeEventListener("mouseup", handleEnd)
      canvas.removeEventListener("mouseleave", handleEnd)
      canvas.removeEventListener("touchstart", handleStart)
      canvas.removeEventListener("touchmove", handleMove)
      canvas.removeEventListener("touchend", handleEnd)
    }
  }, [currentAction, startDrawing, draw, endDrawing, canvasSize])

  return (
    <div className="flex flex-col h-full">
      <div className="px-2 pb-2 mb-2">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-2">
            {colors.map((c) => (
              <Button
                key={c}
                onClick={() => {
                  setColor(c)
                  setIsErasing(false)
                  setSelected(c)
                }}
                className={`${selected === c ? "bg-primary/15" : "bg-transparent"} shadow-none hover:bg-primary/15 size-auto p-1`}
                aria-label={`Select ${c} color`}
              >
                <div
                  className="size-5 rounded-full border border-gray-300"
                  style={{ backgroundColor: c }}
                />
              </Button>
            ))}
          </div>
          <ThicknessControl thickness={thickness} setThickness={setThickness} />
          <Button
            onClick={() => {
              setIsErasing(true)
              setSelected("eraser")
            }}
            variant="default"
            className={`${selected === "eraser" ? "bg-primary/15" : "bg-transparent"} shadow-none hover:bg-primary/15 size-auto p-1`}
          >
            <Eraser className="text-primary size-5" />
          </Button>
          <Button
            onClick={undo}
            className="bg-transparent shadow-none hover:bg-primary/15 size-auto p-1"
          >
            <Undo className="text-primary size-5" />
          </Button>
          <Button
            onClick={redo}
            className="bg-transparent shadow-none hover:bg-primary/15 size-auto p-1"
          >
            <Redo className="text-primary size-5" />
          </Button>
          <Button
            onClick={clear}
            className="bg-transparent shadow-none hover:bg-primary/15 size-auto p-1"
          >
            <Trash className="text-primary size-5" />
          </Button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="flex-grow overflow-hidden flex items-center justify-center"
      >
        <canvas
          ref={canvasRef}
          className="rounded-lg bg-[#c5c5c5] aspect-square"
          style={{ width: "100%", height: "100%", backgroundColor: "#c5c5c5" }}
        />
      </div>

      <Input
        type="text"
        value={name}
        placeholder="Name"
        className="mt-2"
        onChange={(e) => setName(e.target.value)}
      />
      <div className="mt-2 flex gap-2">
        <Button onClick={() => setIsOpen(false)} variant="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  )
}
