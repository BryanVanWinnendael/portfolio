import * as z from "zod"

export const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  text: z
    .string()
    .min(10, {
      message: "Please enter at least 10 characters",
    })
    .max(1000, {
      message: "Please enter less than 1000 characters",
    }),
})
