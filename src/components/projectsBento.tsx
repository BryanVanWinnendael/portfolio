import { DATA } from "@/data/resume"
import { BentoGrid, BentoCard } from "./ui/bento-grid"

const ProjectsBento = () => {
  return (
    <BentoGrid className="lg:grid-rows-10 lg:grid-cols-3 min-h-screen h-full">
      {DATA.projects.map((feature, key) => (
        <BentoCard {...feature} key={key} />
      ))}
    </BentoGrid>
  )
}

export default ProjectsBento
