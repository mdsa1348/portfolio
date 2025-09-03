import { Navigation } from "@/components/navigation"
import { Sidebar } from "@/components/sidebar"
import { getPortfolioItems, type PortfolioItem, initializeDatabase } from "@/lib/db"
import { AdminPanel } from "@/components/admin-panel"
import { AdminCheck } from "@/components/admin-check"
import { PortfolioList } from "@/components/portfolio-list"
import { DatabaseStatus } from "@/components/database-status"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function Portfolio() {
  let portfolioItems: PortfolioItem[] = []
  let error: string | null = null

  try {
    await initializeDatabase()
    portfolioItems = await getPortfolioItems()
  } catch (e) {
    error = e instanceof Error ? e.message : "An unknown error occurred"
    console.error("Database error:", error)
  }

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-[5px]">
        <div className="md:sticky md:top-8 md:self-start">
          <Sidebar />
        </div>
        <main className="space-y-8 px-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <Navigation />

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-2">Portfolio</h2>
              <span className="block h-1 w-10 bg-yellow-500 rounded-full mb-6" />

              <DatabaseStatus />

              <AdminCheck>
                <AdminPanel portfolioItems={portfolioItems} />
              </AdminCheck>

              {error ? (
                <p className="text-red-500">{error}</p>
              ) : portfolioItems.length > 0 ? (
                <PortfolioList initialItems={portfolioItems} />
              ) : (
                <p className="text-gray-400">No portfolio items found. Add some projects or courses to get started!</p>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

