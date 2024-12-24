"use client";
import { signIn, useSession } from "next-auth/react";
import Navbar from "./components/Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter();
  const { status } = useSession();

  const handleOnClick = () => {
    signIn("google");
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "authenticated") {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-between">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="pt-32 pb-16 flex flex-col items-center justify-center text-white px-8">
        <h1 className="text-4xl font-bold text-center">
          Spine Image Reporting
        </h1>
        <p className="text-lg py-4 text-center">
          Generate accurate and detailed reports for spine images.
        </p>

        <div className="mt-4 flex">
          <button
          className="p-1 px-2 bg-white text-black flex items-center rounded-lg shadow-md hover:drop-shadow-lg"
          onClick={handleOnClick}
          >
            <Image
              src="/google-logo.png"
              height={30}
              width={30}
              alt="Google-Logo"
              className="h-auto w-auto"
            />
            <span className="p-3 rounded-r-lg">
              Continue with Google
            </span>
          </button>
        </div>

      </div>

      {/* Features Section */}
      <div className="py-16 px-8 bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800">Why Choose Us?</h2>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center">
            <h3 className="text-xl font-semibold">Easy Image Upload</h3>
            <p className="text-gray-600 mt-2">
              Upload spine images effortlessly for fast reporting.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center">
            <h3 className="text-xl font-semibold">Comprehensive Reports</h3>
            <p className="text-gray-600 mt-2">
              Get detailed reports with clear insights and annotations.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center">
            <h3 className="text-xl font-semibold">Data Security</h3>
            <p className="text-gray-600 mt-2">
              Your data is protected with industry-standard security measures.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-500 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Spine Reporting. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="hover:underline mr-4">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
