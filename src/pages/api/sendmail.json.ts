import type { APIRoute } from "astro"
import nodemailer from "nodemailer"

const emailTo = import.meta.env.EMAIL
const emailToPass = import.meta.env.PASS

const MAIL_TO_SENDER = `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
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
        <h1>Thank you for your email</h1>
        <p class="message">Thank you for contacting me. I will get back to you as soon as possible.</p>
        <div class="footer">
                <p class="heading">BRYAN VAN</p>
                <p class="heading">WINNENDAEL</p>
        </div>
    </body>
    </html>`

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
          <p class="message">%text</p>
          <div class="footer">
            <p class="heading">BRYAN VAN</p>
            <p class="heading">WINNENDAEL</p>
          </div>
      </body>
      </html>`

console.log("emailTo: ", emailTo)
console.log("emailToPass: ", emailToPass)

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailTo,
    pass: emailToPass,
  },
})

const sendMailToAdmin = async (email: string, text: string) => {
  const mailToAdmin = MAIL_TO_ADMIN.replace("%mail", email).replace(
    "%text",
    text
  )

  let mailDetails = {
    from: email,
    to: emailTo,
    subject: "Portfolio - Contact received",
    text,
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

const sendMailToUser = async (email: string) => {
  const mailToSender = MAIL_TO_SENDER

  let mailDetails = {
    from: emailTo,
    to: email,
    subject: "Portfolio - Contact received",
    text: "Thank you for your email",
    html: mailToSender,
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
    const email = formData.email
    const text = formData.text

    // send mail to admin
    let sent = await sendMailToAdmin(email, text)
    if (!sent) {
      return new Response(null, { status: 500 })
    }
    // send mail to user
    sent = await sendMailToUser(email)
    if (!sent) {
      return new Response(null, { status: 500 })
    }

    // return endpoint response
    return new Response(null, { status: 200 })
  }
  return new Response(null, { status: 400 }) // if not a json request
}
