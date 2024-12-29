import { Navigation } from '@/components/navigation'
import { Sidebar } from '@/components/sidebar'
import { ContactForm } from '@/components/contact-form'

export default function Contact() {
  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-[5px]">
        <div className="md:sticky md:top-8 md:self-start">
          <Sidebar />
        </div>
        <main className="space-y-8 px-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <Navigation />
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-2">Contact</h2>
              <span className="block h-1 w-10 bg-yellow-500 rounded-full mb-6" />
              <ContactForm />
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

