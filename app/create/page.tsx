import { MemeEditor } from "@/components/meme-editor"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Meme - Meme Engine",
  description: "Create your own custom memes with Meme Engine",
}

export default function CreatePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600 text-transparent bg-clip-text">
          Create Your Meme
        </h1>
        <MemeEditor />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
