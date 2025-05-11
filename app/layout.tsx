import type React from "react"
import type { Metadata } from "next"
import { Inter, Dancing_Script } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "Meme Engine - Create Custom Memes",
  description: "Upload images, add text, and create custom memes with Meme Engine",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
