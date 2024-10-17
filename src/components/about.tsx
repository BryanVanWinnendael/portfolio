import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Experience from "./experience"
import Education from "./education"

const About = () => {
  return (
    <Tabs defaultValue="account" className="w-full my-12">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Experience</TabsTrigger>
        <TabsTrigger value="password">Education</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Experience />
      </TabsContent>
      <TabsContent value="password">
        <Education />
      </TabsContent>
    </Tabs>
  )
}

export default About
