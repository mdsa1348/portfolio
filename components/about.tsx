import { Code, Smartphone, Camera } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function About() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p className="text-gray-400 leading-relaxed">
          I&apos;m Creative Director and UI/UX Designer from Sydney, Australia, working in web development and print media. I
          enjoy turning complex problems into simple, beautiful and intuitive designs.
        </p>
        <p className="text-gray-400 leading-relaxed mt-4">
          My job is to build your website so that it is functional and user-friendly but at the same time attractive.
          Moreover, I add personal touch to your product and make sure that is eye-catching and easy to use. My aim is to
          bring across your message and identity in the most creative way.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">What I&apos;m Doing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center gap-4">
              <Code className="w-8 h-8 text-yellow-500" />
              <div>
                <CardTitle>Web Development</CardTitle>
                <CardDescription>High-quality development of sites at the professional level.</CardDescription>
              </div>
            </CardHeader>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center gap-4">
              <Smartphone className="w-8 h-8 text-yellow-500" />
              <div>
                <CardTitle>Mobile Apps</CardTitle>
                <CardDescription>Professional development of applications for iOS and Android.</CardDescription>
              </div>
            </CardHeader>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center gap-4">
              <Camera className="w-8 h-8 text-yellow-500" />
              <div>
                <CardTitle>Photography</CardTitle>
                <CardDescription>I make high-quality photos of any category at a professional level.</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  )
}

