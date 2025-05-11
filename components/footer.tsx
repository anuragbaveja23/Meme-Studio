import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-6 md:py-8">
      <div className="container flex flex-col items-center gap-4">
        <div className="flex items-center justify-center space-x-4">
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Facebook className="h-5 w-5" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Meme Studio. All rights reserved.
          </p>
          <p className="text-sm text-white">@anuragbaveja</p>
        </div>
      </div>
    </footer>
  )
}
