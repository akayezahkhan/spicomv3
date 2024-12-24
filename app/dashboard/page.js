"use client";
import React from "react";
import Navbar from "../components/Navbar";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PngImageViewer from '../components/PNG_Report'

export default function Dashboard() {

  const { status, data:session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status !== "authenticated") {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="w-screen h-screen">
    
      <Navbar />

      <div className="pt-20 pb-1 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold text-center">
        Dashboard
        </h1>
      </div>

      <div className="mt-6 px-6">
        <PngImageViewer/>
      </div>

      <div className="text-white mt-2 px-6 flex justify-between items-center">
        <span>Signed in as: {session.user.email}</span>
        <button
        className="p-1 w-32 bg-red-500 text-white border border-red-700 rounded hover:bg-red-600"
        onClick={() => signOut()}
        >
          Sign out
        </button>

      </div>

    </div>
  );
}
