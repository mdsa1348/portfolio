"use client"

import { useState } from "react"
import { AddPortfolioItemForm } from "./add-portfolio-item-form"
import { Button } from "@/components/ui/button"
import type { PortfolioItem } from "@/lib/db"

export function AdminPanel({ portfolioItems }: { portfolioItems: PortfolioItem[] }) {
  const [items, setItems] = useState(portfolioItems)
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(`/api/portfolio/${id}`, { method: "DELETE" })
        if (response.ok) {
          setItems(items.filter((item) => item._id !== id))
          alert("Item deleted successfully")
          // Refresh the page to update the blog posts list
          window.location.reload()
        } else {
          throw new Error("Failed to delete item")
        }
      } catch (error) {
        console.error("Error deleting item:", error)
        alert("Failed to delete item. Please try again.")
      }
    }
  }

  const handleItemAdded = async () => {
    try {
      const response = await fetch("/api/portfolio")
      if (response.ok) {
        const updatedItems = await response.json()
        setItems(updatedItems)
      }
    } catch (error) {
      console.error("Error fetching updated items:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Admin Panel</h3>
      </div>

      {editingItem ? (
        <AddPortfolioItemForm item={editingItem} onCancel={() => setEditingItem(null)} onItemAdded={handleItemAdded} />
      ) : (
        <AddPortfolioItemForm onItemAdded={handleItemAdded} />
      )}

      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Manage Portfolio Items</h4>
        {items.map((item) => (
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

