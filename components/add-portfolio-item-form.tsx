"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { PortfolioItem } from "@/lib/db"

interface AddPortfolioItemFormProps {
  item?: PortfolioItem
  onCancel?: () => void
  onItemAdded?: () => void
}

export function AddPortfolioItemForm({ item, onCancel, onItemAdded }: AddPortfolioItemFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "project" as "project" | "course" | "thesis",
  })
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        description: item.description,
        category: item.category,
        type: item.type,
      })
      setPreviewUrl(`/portfolio-images/${item.image}`)
    }
  }, [item])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value as "project" | "course" | "thesis" }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setPreviewUrl(URL.createObjectURL(selectedFile))
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const form = new FormData()
    form.append("title", formData.title)
    form.append("description", formData.description)
    // form.appenform.append("description", formData.description)
    form.append("category", formData.category)
    form.append("type", formData.type)
    if (file) {
      form.append("image", file)
    }

    try {
      const url = item ? `/api/portfolio/${item._id}` : "/api/portfolio"
      const method = item ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        body: form,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to ${item ? "update" : "add"} portfolio item`)
      }

      alert(`Portfolio item ${item ? "updated" : "added"} successfully!`)

      if (onItemAdded) {
        onItemAdded()
      }
      // Refresh the page to update the blog posts list
      window.location.reload()
      // if (item && onCancel) {
      //   onCancel()
      // } else {
      //   setFormData({
      //     title: "",
      //     description: "",
      //     category: "",
      //     type: "project",
      //   })
      //   setFile(null)
      //   setPreviewUrl(null)
      // }
    } catch (error) {
      alert("Error: " + (error instanceof Error ? error.message : "An unknown error occurred"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          name="title"
          placeholder="Title"
          required
          className="bg-[#222222] border-gray-700"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          name="category"
          placeholder="Category"
          required
          className="bg-[#222222] border-gray-700"
          value={formData.category}
          onChange={handleChange}
        />
      </div>
      <div>
        <Textarea
          name="description"
          placeholder="Description"
          required
          className="bg-[#222222] border-gray-700 min-h-[100px]"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <Select name="type" value={formData.type} onValueChange={handleTypeChange}>
          <SelectTrigger className="bg-[#222222] border-gray-700">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="project">Project</SelectItem>
            <SelectItem value="course">Course</SelectItem>
            <SelectItem value="thesis">Thesis</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Input type="file" accept="image/*" onChange={handleFileChange} className="bg-[#222222] border-gray-700" />
      </div>
      {previewUrl && (
        <div className="mt-4">
          <img
            src={previewUrl || "/placeholder.svg"}
            alt="Preview"
            className="max-w-full h-auto max-h-48 object-contain"
          />
        </div>
      )}
      <div className="flex justify-between">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : item ? "Update Item" : "Add Item"}
        </Button>
        {item && onCancel && (
          <Button type="button" onClick={onCancel} variant="outline">
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}

