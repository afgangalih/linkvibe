export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Placeholder */}
      <header className="p-4 border-b">
        <div className="container mx-auto">LinkVibe Public Header</div>
      </header>
      
      <main className="flex-1">{children}</main>

      {/* Footer Placeholder */}
      <footer className="p-4 border-t">
        <div className="container mx-auto">LinkVibe Footer</div>
      </footer>
    </div>
  );
}
