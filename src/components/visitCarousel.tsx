import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import React from "react"
import data from "@/data/drawings.json"

const VisitCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const handlePrevious = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const handleNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  return (
    <div className="w-full max-w-xs mx-auto">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {data.map((item, index) => {
            // data is data uri of the image
            const dataURI = item.src

            return (
              <CarouselItem key={index}>
                <Card className="w-full">
                  <CardContent>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full aspect-square bg-[#c5c5c5] rounded-lg"
                    >
                      <image href={dataURI} className="w-full h-full" />
                    </svg>
                    <p className="text-center text-sm mt-2">By {item.name}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center items-center mt-4 space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          disabled={!api}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">
          {current} / {count}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={!api}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default VisitCarousel
