"use client"

export default function Navbar() {
  return (

    <div className="w-full flex items-center p-2 bg-opacity-90 bg-slate-100 text-black drop-shadow-xl font-medium fixed top-0 z-50">
    
    <a className="p-2 px-4 hover:text-blue-400" href="./">Home</a>
    
    <a className="p-2 px-4 hover:text-blue-400" href="/dashboard">Dashboard</a>

    </div>
  );
}