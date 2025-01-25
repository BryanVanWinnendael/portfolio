import { ChevronRightIcon } from "lucide-react"
import { AnimatedHref } from "./ui/animated-href"

const UcllProjects = () => {
  return (
    <AnimatedHref
      color="#3b82f6"
      target="_blank"
      text={
        <span className="group inline-flex items-center">
          See repository{" "}
          <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      }
      href="https://github.com/BryanVanWinnendael/ucll"
    />
  )
}

export default UcllProjects
