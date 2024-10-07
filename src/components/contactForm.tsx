import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "@/lib/schema"
import { Textarea } from "./ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { Loader2 } from "lucide-react"

const sendmail = async (values: z.infer<typeof formSchema>) => {
  try {
    const data = await fetch("/api/sendmail.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    if (!data.ok) {
      throw new Error("Network error.")
    }

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

const ContactForm = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      text: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    const res = await sendmail(values)
    if (res) {
      form.reset()
      toast({
        variant: "default",
        title: "Message sent!",
        description: "I'll get back to you as soon as possible!",
      })
    } else {
      toast({
        variant: "destructive",
        title: "Message failed to send!",
        description: "Please try again later.",
      })
    }
    setLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="bg-background border-foreground/40"
                  placeholder="email@email.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-52 bg-background border-foreground/40"
                  placeholder="Message"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {loading ? (
          <Button disabled variant="outline" className="w-full text-secondary">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            please wait
          </Button>
        ) : (
          <Button
            variant="default"
            type="submit"
            className="w-full text-secondary"
          >
            submit
          </Button>
        )}
      </form>
    </Form>
  )
}

export default ContactForm
