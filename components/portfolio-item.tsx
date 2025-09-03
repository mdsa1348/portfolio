'use client'

import Image from 'next/image'
import { useState } from 'react'
import { PortfolioItem as PortfolioItemType } from '@/lib/db'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

export function PortfolioItem({ project }: { project: PortfolioItemType }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const shortDescription = project.description.split(' ').slice(0, 20).join(' ')
  const hasMoreContent = project.description.split(' ').length > 20

  return (
    <>
      <div className="bg-[#222222] rounded-2xl overflow-hidden">
        <Image
          src={project.image ? `/portfolio-images/${project.image}` : '/placeholder.svg'}
          alt={project.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold mb-2">{project.title}</h3>
          <p className="text-sm text-gray-400">
            {shortDescription}
            {hasMoreContent && '...'}
          </p>
          {hasMoreContent && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-yellow-500 text-sm mt-2 hover:underline"
            >
              Show more
            </button>
          )}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{project.title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <p className="text-gray-400">{project.description}</p>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  )
}

