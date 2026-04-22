"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen relative overflow-hidden bg-background">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-muted/20">
          <div className="container mx-auto p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
