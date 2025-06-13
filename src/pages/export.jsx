import React from "react";
import { Sidebar } from "../components/sidebar";

export default function Export() {
  return (
    <div className="flex h-screen bg-zinc-50 text-zinc-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-zinc-200 p-4 bg-white">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold mr-6">Export & Download</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-sm font-medium">Zihad UIUX</span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-xl shadow-sm p-6 h-full">
            <p className="text-zinc-500">Export & Download page content will be implemented here...</p>
          </div>
        </main>
      </div>
    </div>
  );
} 