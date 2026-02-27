import { getResumeItems, type ResumeItem, initializeDatabase } from "@/lib/db"
import { AdminPanel } from "@/components/admin-panel-resume"
import { AdminCheck } from "@/components/admin-check"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function Resume() {
  let resumeItems: ResumeItem[] = []
  let error: string | null = null

  try {
    await initializeDatabase()
    resumeItems = await getResumeItems()
  } catch (e) {
    error = e instanceof Error ? e.message : "An unknown error occurred"
    console.error("Database error:", error)
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">Resume</h2>
      <span className="block h-1 w-10 bg-yellow-500 rounded-full mb-6" />

      <AdminCheck>
        <AdminPanel resumeItems={resumeItems} />
      </AdminCheck>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : resumeItems.length > 0 ? (
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Experience</h3>
            <div className="space-y-4">
              {resumeItems
                .filter((item) => item.type === "experience")
                .map((item) => (
                  <div key={item._id} className="bg-[#222222] rounded-2xl p-6">
                    <div className="text-yellow-500 text-sm mb-2">{item.date}</div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Education</h3>
            <div className="space-y-4">
              {resumeItems
                .filter((item) => item.type === "education")
                .map((item) => (
                  <div key={item._id} className="bg-[#222222] rounded-2xl p-6">
                    <div className="text-yellow-500 text-sm mb-2">{item.date}</div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-400">
          No resume items found. Add some experience or education to get started!
        </p>
      )}
    </section>
  )
}

