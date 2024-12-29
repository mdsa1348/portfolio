import { Navigation } from '@/components/navigation';
import { Sidebar } from '@/components/sidebar';
import { getPortfolioItems, PortfolioItem } from '@/lib/db';
import { AdminPanel } from '@/components/admin-panel';
import Image from 'next/image';

export default async function Portfolio() {
  let projects: PortfolioItem[] = [];
  let error: string | null = null;
  let isConnected = false;

  try {
    projects = await getPortfolioItems();
    isConnected = true;
  } catch (e) {
    error = e instanceof Error ? e.message : 'An unknown error occurred';
    console.error('Database error:', error);
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

              {/* Database connection status */}
              <div className={`p-4 mb-6 rounded-md ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}>
                <p className="text-white font-semibold">
                  Database status: {isConnected ? 'Connected' : 'Not connected'}
                </p>
                {error && <p className="text-white mt-2">Error: {error}</p>}
              </div>

              {isConnected ? (
                <>
                  {/* Admin Panel */}
                  <AdminPanel projects={projects} />

                  {/* Projects */}
                  {projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {projects.map((project) => {
                        // Use fallback image if project.image is invalid
                        const imageUrl = project.image?.startsWith('http')
                          ? project.image
                          : '/IMG_1531.JPG';

                        return (
                          <div key={project.id} className="bg-[#222222] rounded-2xl overflow-hidden">
                            <Image
                              src={imageUrl}
                              alt={project.title || 'Default Title'}
                              width={400}
                              height={200}
                              placeholder="blur"
                              blurDataURL="/placeholder.svg" // Optional: low-quality placeholder
                            />
                            <div className="p-4">
                              <h3 className="font-semibold mb-2">{project.title}</h3>
                              <p className="text-sm text-gray-400">{project.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-400">
                      No portfolio items found. Add some projects to get started!
                    </p>
                  )}
                </>
              ) : (
                <p className="text-gray-400">
                  Unable to fetch projects. Please check your database connection.
                </p>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
