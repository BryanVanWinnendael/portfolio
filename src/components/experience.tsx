import { DATA } from "@/data/resume"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { AnimatedHref } from "./ui/animated-href"
import { ChevronRightIcon } from "lucide-react"

const Experience = () => {
  return (
    <div className="border rounded-lg px-10 h-fit">
      <ol className="relative border-s border-gray-200 dark:border-gray-500 h-full">
        {DATA.work.map((work) => (
          <li className="ms-4 pl-4">
            <a target="_blank" href={work.url}>
              <Avatar className="border w-12 h-12 bg-muted-background dark:bg-foreground absolute mt-1.5 -start-6">
                <AvatarImage
                  src={work.logoUrl}
                  alt={work.company}
                  className="object-contain"
                />
                <AvatarFallback>{work.company[0]}</AvatarFallback>
              </Avatar>
            </a>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {work.start} - {work.end ?? "Present"}
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex gap-2 items-center">
              {work.company}
            </h3>
            <h4 className="text-gray-500">{work.title}</h4>
            <ul className="list-disc [&>li]:mt-2 pl-5 pb-4">
              {work.description.map((desc, id) => (
                <li key={id}>{desc}</li>
              ))}
            </ul>
            {work.viewMore && (
              <div className="py-2">
                <AnimatedHref
                  color="#3b82f6"
                  text={
                    <span className="group inline-flex items-center">
                      Learn more{" "}
                      <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  }
                  href={"/experience/" + work.viewMore}
                />
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Experience
