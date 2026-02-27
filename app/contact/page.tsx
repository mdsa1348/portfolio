import { ContactForm } from "@/components/contact-form"
import { AdminCheck } from "@/components/admin-check"
import { getMessages, type Message, initializeDatabase } from "@/lib/db"
import { MessageList } from "@/components/message-list"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function Contact() {
  let messages: Message[] = []
  let error: string | null = null

  try {
    await initializeDatabase()
    messages = await getMessages()
  } catch (e) {
    console.error("Error fetching messages:", e)
    error = e instanceof Error ? e.message : "An unknown error occurred"
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-2">Contact</h2>
        <span className="block h-1 w-10 bg-yellow-500 rounded-full mb-6" />
        <ContactForm />
      </section>

      <AdminCheck>
        <section>
          <h3 className="text-xl font-bold mb-4">Messages</h3>
          {error ? (
            <p className="text-red-500">Error loading messages: {error}</p>
          ) : (
            <MessageList initialMessages={messages} />
          )}
        </section>
      </AdminCheck>
    </div>
  )
}

