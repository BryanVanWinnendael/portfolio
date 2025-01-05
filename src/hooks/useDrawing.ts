import type { DrawingAction } from "@/types"
import { useState, useCallback } from "react"

export function useDrawing() {
  const [actions, setActions] = useState<DrawingAction[]>([])
  const [currentAction, setCurrentAction] = useState<DrawingAction | null>(null)
  const [redoStack, setRedoStack] = useState<DrawingAction[]>([])
  const [color, setColor] = useState("#000000")
  const [thickness, setThickness] = useState(8)
  const [isErasing, setIsErasing] = useState(false)

  const startDrawing = useCallback(
    (x: number, y: number) => {
      setCurrentAction({
        type: isErasing ? "erase" : "draw",
        path: [[x, y]],
        color: isErasing ? "#c5c5c5" : color,
        thickness,
      })
    },
    [color, thickness, isErasing]
  )

  const draw = useCallback(
    (x: number, y: number) => {
      if (currentAction) {
        setCurrentAction((prev) => ({
          ...prev!,
          path: [...prev!.path, [x, y]],
        }))
      }
    },
    [currentAction]
  )

  const endDrawing = useCallback(() => {
    if (currentAction) {
      setActions((prev) => [...prev, currentAction])
      setCurrentAction(null)
      setRedoStack([])
    }
  }, [currentAction])

  const undo = useCallback(() => {
    if (actions.length > 0) {
      const lastAction = actions[actions.length - 1]
      setActions((prev) => prev.slice(0, -1))
      setRedoStack((prev) => [...prev, lastAction])
    }
  }, [actions])

  const redo = useCallback(() => {
    if (redoStack.length > 0) {
      const nextAction = redoStack[redoStack.length - 1]
      setRedoStack((prev) => prev.slice(0, -1))
      setActions((prev) => [...prev, nextAction])
    }
  }, [redoStack])

  const clear = useCallback(() => {
    setActions([])
    setRedoStack([])
  }, [])

  return {
    actions,
    currentAction,
    color,
    setColor,
    thickness,
    setThickness,
    isErasing,
    setIsErasing,
    startDrawing,
    draw,
    endDrawing,
    undo,
    redo,
    clear,
  }
}
