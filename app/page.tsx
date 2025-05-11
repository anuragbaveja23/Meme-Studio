"use client"

import { MemeEditor } from "@/components/meme-editor"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Share2, Trash2, Brush, Code, Sparkles, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 bg-black">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-white/5 blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Create memes because life is better with memes.
              </h1>
              <p className="text-xl mb-8 text-gray-400">
                Create custom memes instantly—just upload an image, add your text, and share your creation with the world. No design skills required.
              </p>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200"
                onClick={() => document.getElementById("create-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                Start Creating
              </Button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
        </section>

        {/* Create Section */}
        <section id="create-section" className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">
            Create Your Meme
          </h2>
          <MemeEditor />
        </section>

        {/* My Memes Section */}
        <section id="my-memes-section" className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">
              My Memes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Empty state */}
              {true && (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <div className="bg-white/10 rounded-full p-6 mb-4">
                    <Share2 className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-white">No memes saved yet</h3>
                  <p className="text-gray-400 mb-6 max-w-md">
                    Start creating and saving memes to see them here. Your memes will be stored locally on your device.
                  </p>
                  <Button
                    className="bg-white text-black hover:bg-gray-200"
                    onClick={() => document.getElementById("create-section")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Create Your First Meme
                  </Button>
                </div>
              )}

              {/* Sample meme cards - these would be dynamically generated in a real app */}
              {false &&
                Array.from({ length: 6 }).map((_, i) => (
                  <Card
                    key={i}
                    className="overflow-hidden border border-white/10 bg-white/5"
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={`/placeholder.svg?height=300&width=400&text=Meme+${i + 1}`}
                          alt={`Meme ${i + 1}`}
                          className="w-full aspect-[4/3] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="secondary" className="bg-white/10 hover:bg-white/20">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                            <Button size="sm" variant="secondary" className="bg-white/10 hover:bg-white/20">
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                            <Button size="sm" variant="destructive" className="bg-red-500/10 hover:bg-red-500/20 text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium truncate text-white">Funny Meme {i + 1}</h3>
                        <p className="text-xs text-gray-400">Created on May {i + 1}, 2025</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about-section" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">
              About Meme Studio
            </h2>

            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-center text-white">What Makes Us Different</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border border-white/10 bg-white/5 transition-shadow duration-200 hover:shadow-lg hover:shadow-white/10">
                  <CardContent className="pt-6">
                    <div className="mb-4 bg-white/10 w-12 h-12 rounded-full flex items-center justify-center">
                      <Brush className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-medium mb-2 text-white">Simple Design</h3>
                    <p className="text-gray-400">
                      Our intuitive interface makes it easy for anyone to create professional-looking memes in seconds.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border border-white/10 bg-white/5 transition-shadow duration-200 hover:shadow-lg hover:shadow-white/10">
                  <CardContent className="pt-6">
                    <div className="mb-4 bg-white/10 w-12 h-12 rounded-full flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-medium mb-2 text-white">Creative Freedom</h3>
                    <p className="text-gray-400">
                      Customize every aspect of your memes with our powerful yet easy-to-use editing tools.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border border-white/10 bg-white/5 transition-shadow duration-200 hover:shadow-lg hover:shadow-white/10">
                  <CardContent className="pt-6">
                    <div className="mb-4 bg-white/10 w-12 h-12 rounded-full flex items-center justify-center">
                      <Share2 className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-medium mb-2 text-white">Easy Sharing</h3>
                    <p className="text-gray-400">
                      Share your creations directly to social media or download them for use anywhere.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mb-16">
              {/* Our Team section removed as per user request */}
            </div>

            <div>
              <div className="bg-white/5 rounded-lg p-4 text-center border border-white/10 mt-4">
                <h3 className="text-2xl font-bold mb-2 text-white">Join Our Community</h3>
                <p className="text-lg mb-4 max-w-2xl mx-auto text-gray-400">
                  Connect with fellow meme creators, share your work, and stay updated on new features.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black hover:bg-gray-200 transition-colors"
                  >
                    <Users className="h-5 w-5" />
                    Discord Community
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black hover:bg-gray-200 transition-colors"
                  >
                    <Code className="h-5 w-5" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
