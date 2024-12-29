'use client'

import { useState, useEffect } from 'react'
import { AdminLogin } from './admin-login'
import { AddPortfolioItemForm } from './add-portfolio-item-form'
import { Button } from '@/components/ui/button'
import { PortfolioItem } from '@/lib/db'

export function AdminPanel({ projects }: { projects: PortfolioItem[] }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [editingProject, setEditingProject] = useState<PortfolioItem | null>(null)

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isAdminLoggedIn') === 'true'
    setIsLoggedIn(loggedIn)
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminLoggedIn')
    setIsLoggedIn(false)
  }

  const handleEdit = (project: PortfolioItem) => {
    setEditingProject(project)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' })
        if (response.ok) {
          alert('Project deleted successfully')
          // Refresh the page to update the project list
          window.location.reload()
        } else {
          throw new Error('Failed to delete project')
        }
      } catch (error) {
        console.error('Error deleting project:', error)
        alert('Failed to delete project. Please try again.')
      }
    }
  }

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Admin Panel</h3>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      
      {editingProject ? (
        <AddPortfolioItemForm project={editingProject} onCancel={() => setEditingProject(null)} />
      ) : (
        <AddPortfolioItemForm />
      )}

      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Manage Projects</h4>
        {projects.map((project) => (
          <div key={project.id} className="flex justify-between items-center bg-[#222222] p-4 rounded-md">
            <span>{project.title}</span>
            <div>
              <Button onClick={() => handleEdit(project)} className="mr-2">Edit</Button>
              <Button onClick={() => handleDelete(project.id)} variant="destructive">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

