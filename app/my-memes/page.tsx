import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Share2, Trash2 } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Memes - Meme Engine",
  description: "View and manage your saved memes",
}

export default function MyMemesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600 text-transparent bg-clip-text">
          My Memes
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Empty state */}
          {true && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted/30 rounded-full p-6 mb-4">
                <Share2 className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No memes saved yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Start creating and saving memes to see them here. Your memes will be stored locally on your device.
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Link href="/create">Create Your First Meme</Link>
              </Button>
            </div>
          )}

          {/* Sample meme cards - these would be dynamically generated in a real app */}
          {false &&
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden border-2 border-purple-500/20 shadow-lg shadow-purple-500/10">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={`/placeholder.svg?height=300&width=400&text=Meme+${i + 1}`}
                      alt={`Meme ${i + 1}`}
                      className="w-full aspect-[4/3] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="secondary">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium truncate">Funny Meme {i + 1}</h3>
                    <p className="text-xs text-muted-foreground">Created on May {i + 1}, 2025</p>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
