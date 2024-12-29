import Image from 'next/image'
import { Mail, Phone, Calendar, MapPin } from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    label: 'EMAIL',
    value: 'richard@example.com',
  },
  {
    icon: Phone,
    label: 'PHONE',
    value: '+1(213) 352-2795',
  },
  {
    icon: Calendar,
    label: 'BIRTHDAY',
    value: 'June 23, 1992',
  },
  {
    icon: MapPin,
    label: 'LOCATION',
    value: 'Sacramento, California, USA',
  },
]

export function Sidebar() {
  return (
    <div className="bg-[#222222] rounded-2xl p-8 flex flex-col items-center">
      <div className="w-32 h-32 relative mb-6">
        <Image
          src="/IMG_1531.JPG"
          alt="Richard Hanrick"
          width={128}
          height={128}
          className="rounded-2xl"
          priority
        />
      </div>
      
      <h1 className="text-2xl font-bold mb-2">Richard Hanrick</h1>
      <div className="px-4 py-1 bg-[#2D2D2D] rounded-full text-sm mb-8">
        Web Developer
      </div>

      <div className="w-full space-y-6">
        {contactInfo.map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <div className="flex items-center gap-3 text-yellow-500">
              <item.icon className="w-5 h-5" />
              <span className="text-xs text-gray-400">{item.label}</span>
            </div>
            <span className="text-sm pl-8">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

