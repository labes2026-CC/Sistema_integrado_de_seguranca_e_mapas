
import Sidebar from "./components/sidebar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className="h-full antialiased">
      <body className="flex min-h-screen bg-gray-100 text-gray-900">

        <Sidebar />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}