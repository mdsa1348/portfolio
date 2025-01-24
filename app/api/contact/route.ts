import { NextResponse } from "next/server"
import { addMessage, initializeDatabase } from "@/lib/db"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    await initializeDatabase()
    const { name, email, message } = await request.json()

    const newMessage = await addMessage({ name, email, message })

    if (!newMessage) {
      throw new Error("Failed to add message to the database")
    }


    // Send email notification
    const transporter = nodemailer.createTransport({
      // host: 'smtp.gmail.com',
      // port: 465,
      // secure: true, // Use SSL
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "mdsa134867@gmail.com",
      subject: "New Contact Form Submission",
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    })

    return NextResponse.json({ message: "Message sent successfully" }, { status: 201 })
  } catch (error) {
    // console.error("Error in POST /api/contact:", error)
    return NextResponse.json(
      { error: "Error sending message: " + (error instanceof Error ? error.message : "Unknown error") },
      { status: 500 },
    )
  }
}

