export type DrawingAction = {
  type: "draw" | "erase"
  path: [number, number][]
  color: string
  thickness: number
}
