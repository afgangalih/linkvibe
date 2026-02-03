export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar Placeholder */}
      <aside className="w-64 border-r bg-muted/40 hidden md:block">
        <div className="p-4 font-bold">LinkVibe Dashboard</div>
        <nav className="p-4 space-y-2">
          <div className="p-2 hover:bg-muted rounded">Links</div>
          <div className="p-2 hover:bg-muted rounded">Appearance</div>
          <div className="p-2 hover:bg-muted rounded">Settings</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-14 border-b flex items-center px-4">
          Header
        </header>
        <div className="flex-1 overflow-hidden">
            {children}
        </div>
      </main>
    </div>
  );
}
