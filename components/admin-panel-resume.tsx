"use client"

import { useState } from "react"
import { AddResumeItemForm } from "./add-resume-item-form"
import { Button } from "@/components/ui/button"
import type { ResumeItem } from "@/lib/db"

export function AdminPanel({ resumeItems }: { resumeItems: ResumeItem[] }) {
  const [editingItem, setEditingItem] = useState<ResumeItem | null>(null)

  const handleEdit = (item: ResumeItem) => {
    setEditingItem(item)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this resume item?")) {
      try {
        const response = await fetch(`/api/resume/${id}`, { method: "DELETE" })
        if (response.ok) {
          alert("Resume item deleted successfully")
          window.location.reload()
        } else {
          throw new Error("Failed to delete resume item")
        }
      } catch (error) {
        console.error("Error deleting resume item:", error)
        alert("Failed to delete resume item. Please try again.")
      }
    }
  }

  return (
    <div className="space-y-6">
      {editingItem ? (
        <AddResumeItemForm item={editingItem} onCancel={() => setEditingItem(null)} />
      ) : (
        <AddResumeItemForm />
      )}

      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Manage Resume Items</h4>
        {resumeItems.map((item) => (
          <div key={item._id} className="flex justify-between items-center bg-[#222222] p-4 rounded-md">
            <span>
              {item.title} ({item.type})
            </span>
            <div>
              <Button onClick={() => handleEdit(item)} className="mr-2">
                Edit
              </Button>
              <Button onClick={() => handleDelete(item._id)} variant="destructive">
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4"></div>
    </div>
  )
}

