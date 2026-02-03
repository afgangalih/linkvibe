import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

export default function EditorPage() {
  return (
    <div className="h-full flex">
      {/* Left: Editor Column */}
      <div className="flex-1 border-r bg-background">
        <ScrollArea className="h-full">
            <div className="p-8 max-w-2xl mx-auto space-y-6">
                <div>
                    <h2 className="text-2xl font-bold">Links</h2>
                    <p className="text-muted-foreground">Manage your links here.</p>
                </div>
                
                {/* Editor Content Placeholder */}
                <Card className="p-6">
                    <p>Link Editor Form will go here.</p>
                </Card>
            </div>
        </ScrollArea>
      </div>

      {/* Right: Preview Column */}
      <div className="w-[400px] bg-muted/30 hidden lg:flex items-center justify-center relative">
        <div className="sticky top-0 p-6">
            <div className="w-[300px] h-[600px] border-8 border-gray-900 rounded-[3rem] bg-white overflow-hidden shadow-xl relative">
                {/* Mobile Status Bar Simulation */}
                <div className="absolute top-0 w-full h-6 bg-gray-100 border-b flex justify-center items-center text-[10px] text-gray-500">
                    LinkVibe
                </div>
                
                {/* Mobile Preview Content */}
                <div className="mt-8 p-4 text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-200 w-3/4 mx-auto mb-2 rounded"></div>
                    <div className="h-3 bg-gray-100 w-1/2 mx-auto rounded"></div>
                    
                    <div className="mt-8 space-y-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-12 bg-gray-50 border rounded flex items-center justify-center text-sm text-gray-400">
                                Link {i}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
