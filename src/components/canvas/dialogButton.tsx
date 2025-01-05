import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { Button } from "../ui/button"
import Canvas from "."

const DialogButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Request Drawing</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-max p-2 [&>button]:hidden">
        <Canvas setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}

export default DialogButton
