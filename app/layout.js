import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./_components/Navbar";
import "./globals.css";
import { Mulish } from "next/font/google";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  weight: ["300", "500", "700", "800"],
});

export const metadata = {
  title: "Finance Smart",
  description: "Expense tracker built with AI",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body className={mulish.variable}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}