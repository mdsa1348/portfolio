import { Navigation } from '@/components/navigation'
import { Sidebar } from '@/components/sidebar'
import { Code, Smartphone, Brain, Book } from 'lucide-react'

const services = [
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
    icon: Brain,
    title: 'AI & ML',
    description: 'Developing intelligent solutions using Artificial Intelligence and Machine Learning.',
  },
  {
    icon: Book,
    title: 'Online Courses',
    description: 'Providing comprehensive online courses on various tech topics.',
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
                  I&apos;m an aspiring Fullstack Software Engineer with expertise in building dynamic and user-friendly applications using technologies like React Native, Flutter, CodeIgniter, React, Express, MySQL, and Firebase. I have experience working on diverse projects, including video calling apps, AI-powered solutions, and dynamic dashboards.
                </p>
                <p>
                  My work focuses on creating innovative, scalable, and impactful solutions while delivering high-quality results. I enjoy collaborating with teams and exploring new technologies to stay ahead in the ever-evolving tech landscape.
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

