'use client'

import { useState } from 'react'
import { AddPortfolioItemForm } from './add-portfolio-item-form'
import { Button } from '@/components/ui/button'
import { PortfolioItem } from '@/lib/db'

export function AdminPanel({ portfolioItems }: { portfolioItems: PortfolioItem[] }) {
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' })
        if (response.ok) {
          alert('Item deleted successfully')
          // Reload the page to update the item list
          window.location.reload()
        } else {
          throw new Error('Failed to delete item')
        }
      } catch (error) {
        console.error('Error deleting item:', error)
        alert('Failed to delete item. Please try again.')
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Admin Panel</h3>
      </div>
      
      {editingItem ? (
        <AddPortfolioItemForm item={editingItem} onCancel={() => setEditingItem(null)} />
      ) : (
        <AddPortfolioItemForm />
      )}

      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Manage Portfolio Items</h4>
        {portfolioItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center bg-[#222222] p-4 rounded-md">
            <span>{item.title} ({item.type})</span>
            <div>
              <Button onClick={() => handleEdit(item)} className="mr-2">Edit</Button>
              <Button onClick={() => handleDelete(item.id)} variant="destructive">Delete</Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6"></div>
    </div>
  )
}

