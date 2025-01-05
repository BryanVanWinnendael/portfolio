import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import * as Portal from "@radix-ui/react-portal"
import { Disc } from "lucide-react"
import { useState } from "react"

interface ThicknessControlProps {
  thickness: number
  setThickness: (thickness: number) => void
}

export function ThicknessControl({
  thickness,
  setThickness,
}: ThicknessControlProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          className={`${isOpen ? "bg-primary/15" : "bg-transparent"} shadow-none hover:bg-primary/15 size-auto p-1`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Disc className="text-primary size-5" />
        </Button>
      </PopoverTrigger>
      <Portal.Root>
        <PopoverContent
          className="w-max z-[9999] fixed"
          sideOffset={5}
          side="right"
          align="start"
          style={{
            pointerEvents: "auto",
            position: "fixed",
          }}
        >
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col justify-center items-center gap-4">
              <Slider
                min={8}
                max={44}
                step={1}
                value={[thickness]}
                onValueChange={(value) => setThickness(value[0])}
                className="w-24"
              />
              <div className="size-14 flex items-center justify-center">
                <div
                  className="rounded-full bg-primary"
                  style={{
                    width: `${thickness}px`,
                    height: `${thickness}px`,
                  }}
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Portal.Root>
    </Popover>
  )
}
