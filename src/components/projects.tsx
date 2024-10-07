import { DATA } from "@/data/resume"
import { BentoCard } from "./ui/bento-grid"
import { ChevronRight } from "lucide-react"

const Projects = () => {
  return (
    <div className="mt-12">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Personal Projects
      </h1>
      <div className="mt-4 flex flex-col h-full gap-4">
        {DATA.projectsPreview.map((project) => (
          <BentoCard {...project} />
        ))}
      </div>
      <a
        href="/projects"
        className="text-blue-500 underline my-4 flex items-center"
      >
        View more <ChevronRight size={16} />
      </a>
    </div>
  )
}

export default Projects
