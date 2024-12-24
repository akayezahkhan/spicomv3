import "./globals.css";
import SessionWrapper from "./components/SessionWrapper";
import { Ubuntu } from "next/font/google";

const inter = Ubuntu({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Spine Scanner",
  description: "Generated for Reporting Spine radiographs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <SessionWrapper>
      <body
      className={`${inter.className} bg-gradient-to-r from-blue-500 to-teal-500`}
      >
        {/* <div className="fixed -z-20 min-h-screen min-w-full bg-cover bg-center opacity-60"></div> */}
        {children}
      </body>
    </SessionWrapper>
    </html>
  );
}
