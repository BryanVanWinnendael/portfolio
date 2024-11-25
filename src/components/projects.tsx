import { DATA } from "@/data/resume"
import { BentoCard } from "./ui/bento-grid"
import { ChevronRightIcon } from "lucide-react"
import { AnimatedHref } from "./ui/animated-href"

const Projects = () => {
  return (
    <div className="mt-12">
      <div className="mb-1 w-fit rounded-md bg-muted px-1.5 py-1 text-muted-foreground text-xs">
        Selected projects
      </div>
      <div className="mt-4 flex flex-col h-full gap-4">
        {DATA.projectsPreview.map((project) => (
          <BentoCard key={project.name} {...project} />
        ))}
      </div>
      <div className="pt-4">
        <AnimatedHref
          color="#3b82f6"
          text={
            <span className="group inline-flex items-center">
              View more{" "}
              <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          }
          href="/projects"
        />
      </div>
    </div>
  )
}

export default Projects
