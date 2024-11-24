import { ChevronLeftIcon } from "lucide-react"
import { AnimatedHref } from "./ui/animated-href"

const BackButton = () => {
  const handleClick = () => {
    window.history.back()
  }

  return (
    <AnimatedHref
      onClick={handleClick}
      color="#3b82f6"
      text={
        <span className="group inline-flex items-center">
          <ChevronLeftIcon className="ml-1 size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back
        </span>
      }
    />
  )
}

export default BackButton
