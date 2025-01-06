import type { APIRoute } from "astro"
import nodemailer from "nodemailer"

const emailTo = import.meta.env.EMAIL
const emailToPass = import.meta.env.PASS

const MAIL_TO_ADMIN = `<html lang='en'>
      <head>
        <style>
          .footer{
            text-align: center;
            margin-top: 50px;
            background-color: #0e0e0e;
            color: white;
            width: 100%;
            height: fit-content !important;
            border-radius: 5px;
            padding: 5px;
          }
          .heading{
            font-weight: bold;
            margin: 5px;
            font-size: xx-large;
          }
          .message{
            font-size: large;
          }
        </style>
      </head>
      <body>
          <p class="message">You have a new message from %mail </p>
          <p class="message">%drawing</p>
          <div class="footer">
            <p class="heading">BRYAN VAN</p>
            <p class="heading">WINNENDAEL</p>
          </div>
      </body>
      </html>`

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailTo,
    pass: emailToPass,
  },
})

const sendMailToAdmin = async (name: string, drawing: string) => {
  const mailToAdmin = MAIL_TO_ADMIN.replace("%mail", name).replace(
    "%drawing",
    drawing
  )

  let mailDetails = {
    from: emailTo,
    to: emailTo,
    subject: "Portfolio - Drawing request from " + name,
    name,
    html: mailToAdmin,
  }

  try {
    await mailTransporter.sendMail(mailDetails)
    return true
  } catch (error) {
    console.log("******* Error: ", error)
    return false
  }
}

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const formData = await request.json()
    const name = formData.name
    const drawing = formData.drawing

    // send mail to admin
    let sent = await sendMailToAdmin(name, drawing)
    if (!sent) {
      return new Response(null, { status: 500 })
    }

    // return endpoint response
    return new Response(null, { status: 200 })
  }
  return new Response(null, { status: 400 }) // if not a json request
}
