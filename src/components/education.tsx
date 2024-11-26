import { DATA } from "@/data/resume"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const Education = () => {
  return (
    <div className="border rounded-lg px-10 h-fit">
      <ol className="relative border-s border-gray-200 dark:border-gray-500 h-full">
        {DATA.education.map((education, key) => (
          <li className="ms-4 pl-4" key={key}>
            <a target="_blank" href={education.url}>
              <Avatar className="border w-12 h-12 bg-muted-background dark:bg-foreground absolute mt-1.5 -start-6">
                <AvatarImage
                  src={education.logoUrl}
                  alt={education.company}
                  className="object-contain"
                />
                <AvatarFallback>{education.company[0]}</AvatarFallback>
              </Avatar>
            </a>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {education.start} - {education.end ?? "Present"}
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex gap-2 items-center">
              {education.company}
            </h3>
            <h4 className="text-gray-500">{education.title}</h4>
            <ul className="list-disc [&>li]:mt-2 pl-5 pb-4">
              {education.description.map((desc, id) => (
                <li key={id}>{desc}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Education
