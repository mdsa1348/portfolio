"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import type { PortfolioItem } from "@/lib/db"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface PortfolioListProps {
  initialItems: PortfolioItem[]
}

export function PortfolioList({ initialItems }: PortfolioListProps) {
  const [items, setItems] = useState(initialItems)
  const [filter, setFilter] = useState<"all" | "project" | "course" | "thesis">("all")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)

  const filteredItems = items.filter((item) => filter === "all" || item.type === filter)

  return (

    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={() => setFilter("all")}
          variant={filter === "all" ? "default" : "outline"}
          className={`min-w-[100px] ${filter === "all" ? "text-white" : "text-black"}`}
        >
          All
        </Button>
        <Button
          onClick={() => setFilter("project")}
          variant={filter === "project" ? "default" : "outline"}
          className={`min-w-[100px] ${filter === "project" ? "text-white" : "text-black"}`}
        >
          Projects
        </Button>
        <Button
          onClick={() => setFilter("course")}
          variant={filter === "course" ? "default" : "outline"}
          className={`min-w-[100px] ${filter === "course" ? "text-white" : "text-black"}`}
        >
          Courses
        </Button>
        <Button
          onClick={() => setFilter("thesis")}
          variant={filter === "thesis" ? "default" : "outline"}
          className={`min-w-[100px] ${filter === "thesis" ? "text-white" : "text-black"}`}
        >
          Thesis
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div key={item._id} className="bg-[#222222] rounded-2xl overflow-hidden">
            <Image
              src={`/portfolio-images/${item.image}`}
              alt={item.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() => setSelectedImage(`/portfolio-images/${item.image}`)}
            />
            <div className="p-4">
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <div className="flex flex-col">
                <p className="text-sm text-gray-400">
                  {item.description.split(" ").slice(0, 20).join(" ")}
                  {item.description.split(" ").length > 20 ? "..." : ""}
                </p>
                {item.description.split(" ").length > 20 && (
                  <div className="flex justify-end mt-2">
                    <button onClick={() => setSelectedItem(item)} className="text-yellow-500 text-sm hover:underline">
                      Show more
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="bg-black sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle className="text-yellow-500 text-xl">{selectedItem?.title}</DialogTitle>
            <DialogTitle className="text-sm text-gray-400 mt-1">{selectedItem?.category}</DialogTitle>
          </DialogHeader>
          <p className="text-white">{selectedItem?.description}</p>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl bg-black ">
          <div className="relative aspect-video">
            {selectedImage && (
              <Image src={selectedImage || "/placeholder.svg"} alt="Full size image" fill className="object-contain" />
            )}
          </div>

        </DialogContent>
      </Dialog>
    </div>
  )
}

