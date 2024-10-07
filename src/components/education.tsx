import { DATA } from "@/data/resume"
import { ResumeCard } from "./resumeCard"

const Education = () => {
  return (
    <div className="mt-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Education
      </h1>
      <div className="mt-4">
        {DATA.education.map((work) => (
          <ResumeCard
            key={work.company}
            logoUrl={work.logoUrl}
            altText={work.company}
            title={work.company}
            subtitle={work.title}
            period={`${work.start} - ${work.end ?? "Present"}`}
            description={work.description}
          />
        ))}
      </div>
    </div>
  )
}

export default Education
