import { DATA } from "@/data/resume"
import { ResumeCard } from "./resumeCard"

const Experience = () => {
  return (
    <div className="mt-12">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Experience
      </h1>
      <div className="mt-4">
        {DATA.work.map((work) => (
          <ResumeCard
            key={work.company}
            logoUrl={work.logoUrl}
            altText={work.company}
            title={work.company}
            subtitle={work.title}
            period={`${work.start} - ${work.end ?? "Present"}`}
            description={work.description}
            open={work.company === "IMEC"}
          />
        ))}
      </div>
    </div>
  )
}

export default Experience
