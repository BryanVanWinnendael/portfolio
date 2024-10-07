import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ChevronRightIcon } from "lucide-react"
import { useState } from "react"

interface ResumeCardProps {
  logoUrl: string
  altText: string
  title: string
  subtitle?: string
  period: string
  description: ReadonlyArray<string>
  open?: boolean
}
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  period,
  description,
  open,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = useState(open ?? false)

  const handleClick = (e: any) => {
    if (description) {
      e.preventDefault()
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <div className="block cursor-pointer overflow-hidden" onClick={handleClick}>
      <Card className="flex bg-transparent">
        <div className="flex-none ">
          <Avatar className="border size-12 m-auto bg-muted-background dark:bg-foreground">
            <AvatarImage
              src={logoUrl}
              alt={altText}
              className="object-contain"
            />
            <AvatarFallback>{altText[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow ml-4 items-center flex-col group">
          <CardHeader>
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h2 className="inline-flex items-center justify-center text-start scroll-m-20 sm:text-3xl text-xl tracking-wide leading-none font-medium">
                {title}
                <ChevronRightIcon
                  className={cn(
                    "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
                    isExpanded ? "rotate-90" : "rotate-0"
                  )}
                />
              </h2>
              <div className="text-sm text-gray-400">{period}</div>
            </div>
            {subtitle && (
              <h3 className="scroll-m-20 sm:text-xl text-lg tracking-wide leading-none font-medium">
                {subtitle}
              </h3>
            )}
          </CardHeader>
          {description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isExpanded ? 1 : 0,

                height: isExpanded ? "auto" : 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <ul className="list-disc [&>li]:mt-2">
                {description.map((desc, id) => (
                  <li key={id}>{desc}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </Card>
    </div>
  )
}
