import { Navigation } from '@/components/navigation'
import { Sidebar } from '@/components/sidebar'
import { getResumeItems, ResumeItem } from '@/lib/db'

export default async function Resume() {
  let resumeItems: ResumeItem[] = [];
  let error: string | null = null;
  let isConnected = false;

  try {
    resumeItems = await getResumeItems();
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
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-4">
                Resume
                <span className="h-1 w-10 bg-yellow-500 rounded-full" />
              </h2>

              {/* Database connection status */}
              <div className={`p-4 mb-6 rounded-md ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}>
                <p className="text-white font-semibold">
                  Database status: {isConnected ? 'Connected' : 'Not connected'}
                </p>
                {error && <p className="text-white mt-2">Error: {error}</p>}
              </div>

              {/* Resume items or error message */}
              {isConnected && resumeItems.length > 0 ? (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Experience</h3>
                    <div className="space-y-4">
                      {resumeItems.filter(item => item.type === 'experience').map((item) => (
                        <div key={item.id} className="bg-[#222222] rounded-2xl p-6">
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
                      {resumeItems.filter(item => item.type === 'education').map((item) => (
                        <div key={item.id} className="bg-[#222222] rounded-2xl p-6">
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
                  {isConnected 
                    ? "No resume items found. Please check back later." 
                    : "Unable to fetch resume items. Please check your database connection."}
                </p>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

