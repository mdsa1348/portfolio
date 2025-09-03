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

export function Services() {
  return (
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
  )
}

