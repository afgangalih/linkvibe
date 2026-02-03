export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* 
        Modified: Removed Sidebar. 
        The Editor now manages its own full-screen layout.
        Dashboard/Settings pages will use this as a container.
      */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
