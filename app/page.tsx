import { Navigation } from '@/components/navigation'
import { Sidebar } from '@/components/sidebar'
import { Code, Smartphone, Camera, Palette } from 'lucide-react'

const services = [
  {
    icon: Palette,
    title: 'Web Design',
    description: 'The most modern and high-quality design made at a professional level.',
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'High-quality development of sites at the professional level.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Professional development of applications for iOS and Android.',
  },
  {
    icon: Camera,
    title: 'Photography',
    description: 'I make high-quality photos of any category at a professional level.',
  },
]

export default function Home() {
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
              <h2 className="text-2xl font-bold mb-2">About Me</h2>
              <span className="block h-1 w-10 bg-yellow-500 rounded-full mb-4" />
              <div className="space-y-4 text-gray-400">
                <p>
                  I&apos;m Creative Director and UI/UX Designer from Sydney, Australia, working in web development and print media. I
                  enjoy turning complex problems into simple, beautiful and intuitive designs.
                </p>
                <p>
                  My job is to build your website so that it is functional and user-friendly but at the same time attractive.
                  Moreover, I add personal touch to your product and make sure that is eye-catching and easy to use. My aim is to
                  bring across your message and identity in the most creative way. I created web design for many famous brand
                  companies.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-2">What I&apos;m Doing</h2>
              <span className="block h-1 w-10 bg-yellow-500 rounded-full mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div
                    key={service.title}
                    className="bg-[#222222] rounded-2xl p-6 flex items-start gap-4"
                  >
                    <div className="p-3 bg-[#2D2D2D] rounded-xl">
                      <service.icon className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{service.title}</h3>
                      <p className="text-sm text-gray-400">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

