import type { DrawingAction } from "@/types"

export function drawOnCanvas(
  ctx: CanvasRenderingContext2D,
  actions: DrawingAction[],
  currentAction: DrawingAction | null
) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  const allActions = [...actions, currentAction].filter(
    Boolean
  ) as DrawingAction[]

  allActions.forEach((action) => {
    ctx.beginPath()
    ctx.strokeStyle = action.color
    ctx.lineWidth = action.thickness
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    action.path.forEach(([x, y], index) => {
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()
  })
}
