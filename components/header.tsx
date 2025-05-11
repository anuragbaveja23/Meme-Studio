"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal"]
})

export function Header() {
  const pathname = usePathname()

  const scrollToSection = (sectionId: string) => {
    if (pathname !== "/") {
      // If not on home page, navigate to home page first
      return
    }

    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex flex-col md:flex-row items-center justify-between py-4 px-4 md:py-6">
        <div className="flex flex-col items-center gap-2 text-center mx-auto md:mx-0">
          <Link href="/" className="flex flex-col items-center gap-1">
            <span
              className={`text-2xl md:text-3xl font-bold text-white ${montserrat.className}`}
            >
              Meme Studio
            </span>
          </Link>
        </div>

        <nav className="flex items-center justify-center mt-4 md:mt-0">
          <ul className="flex space-x-1 md:space-x-4">
            <li>
              <Button
                variant="ghost"
                size="default"
                className={`hover:bg-white/10 hover:text-white ${pathname === "/" ? "bg-white/10 text-white" : "text-gray-400"}`}
                asChild
              >
                <Link href="/">Home</Link>
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                size="default"
                className={`hover:bg-white/10 hover:text-white text-gray-400`}
                onClick={() => scrollToSection("create-section")}
                asChild={pathname !== "/"}
              >
                {pathname === "/" ? <button>Create</button> : <Link href="/#create-section">Create</Link>}
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                size="default"
                className={`hover:bg-white/10 hover:text-white text-gray-400`}
                onClick={() => scrollToSection("my-memes-section")}
                asChild={pathname !== "/"}
              >
                {pathname === "/" ? <button>My Memes</button> : <Link href="/#my-memes-section">My Memes</Link>}
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                size="default"
                className={`hover:bg-white/10 hover:text-white text-gray-400`}
                onClick={() => scrollToSection("about-section")}
                asChild={pathname !== "/"}
              >
                {pathname === "/" ? <button>About</button> : <Link href="/#about-section">About</Link>}
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
