import { ScrollArea } from "@/components/ui/scroll-area";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProfileForm } from "@/components/editor/profile-form";
import { LinksEditor } from "@/components/editor/links-editor";
import { PreviewCanvas } from "@/components/editor/preview-canvas";

export default function EditorPage() {
  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      {/* Global Toolbar */}
      <EditorNavbar />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Pane: Editor (60%) */}
        <div className="flex-1 lg:flex-[0.6] min-w-0 border-r border-zinc-900 bg-black relative z-10 flex flex-col">
           <ScrollArea className="flex-1">
              <div className="w-full max-w-2xl mx-auto p-6 md:p-10 space-y-8 pb-32">
                  <ProfileForm />
                  <div className="h-px bg-zinc-900/50 my-6" /> {/* Divider */}
                  <LinksEditor />
              </div>
           </ScrollArea>
        </div>

        {/* Right Pane: Live Preview (40%) */}
        <div className="hidden lg:flex lg:flex-[0.4] bg-[#050505] items-center justify-center relative">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          
          <PreviewCanvas />
        </div>
      
      </div>
    </div>
  );
}
