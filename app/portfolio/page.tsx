import { getPortfolioItems, type PortfolioItem, initializeDatabase } from "@/lib/db"
import { AdminPanel } from "@/components/admin-panel"
import { AdminCheck } from "@/components/admin-check"
import { PortfolioList } from "@/components/portfolio-list"

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
    <section>
      <h2 className="text-2xl font-bold mb-2">Portfolio</h2>
      <span className="block h-1 w-10 bg-yellow-500 rounded-full mb-6" />

      <AdminCheck>
        <AdminPanel portfolioItems={portfolioItems} />
      </AdminCheck>

<<<<<<< HEAD
             

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
=======
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : portfolioItems.length > 0 ? (
        <PortfolioList initialItems={portfolioItems} />
      ) : (
        <p className="text-gray-400">
          No portfolio items found. Add some projects or courses to get started!
        </p>
      )}
    </section>
>>>>>>> 682a05d (feat: Initialize Next.js portfolio application with core pages, layout, navigation, and content display components.)
  )
}

