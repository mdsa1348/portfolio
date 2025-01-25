import { Navigation } from "@/components/navigation"
import { Sidebar } from "@/components/sidebar"
import { getBlogPosts, type BlogPost, initializeDatabase } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminPanel } from "@/components/admin-panel-blog"
import { AdminCheck } from "@/components/admin-check"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function Blog() {
  let posts: BlogPost[] = []
  let error: string | null = null

  try {
    await initializeDatabase()
    posts = await getBlogPosts()
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
              <h2 className="text-2xl font-bold mb-2">Blog</h2>
              <span className="block h-1 w-10 bg-yellow-500 rounded-full mb-6" />

              <AdminCheck>
                <AdminPanel blogPosts={posts} />
              </AdminCheck>

              {error ? (
                <p className="text-red-500">{error}</p>
              ) : posts.length > 0 ? (
                <div className="grid gap-6">
                  {posts.map((post) => (
                    <Card key={post._id} className="bg-[#222222] border-0">
                      <CardHeader>
                        <div className="text-yellow-500 text-sm mb-2">
                          {new Date(post.created_at).toLocaleDateString()}
                        </div>
                        <CardTitle className="text-white text-lg">{post.title}</CardTitle>
                        <p className="text-yellow-500">{post.excerpt}</p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-400">{post.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No blog posts found. Add some posts to get started!</p>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

