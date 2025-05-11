"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Send } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface SocialShareButtonsProps {
  imageUrl: string
}

export function SocialShareButtons({ imageUrl }: SocialShareButtonsProps) {
  const shareText = "Check out this meme I created with Meme Engine!"
  const encodedText = encodeURIComponent(shareText)

  const handleFacebookShare = () => {
    // In a real app, you'd use the Facebook SDK or API
    // For now, we'll just open a new window with the Facebook share dialog
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank")
  }

  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodeURIComponent(window.location.href)}`,
      "_blank",
    )
  }

  const handleInstagramShare = () => {
    // Instagram doesn't have a direct web sharing API
    // In a real app, you'd need to use their API
    toast({
      title: "Instagram Sharing",
      description: "Save the image and upload it to Instagram manually.",
    })
  }

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodedText} ${encodeURIComponent(window.location.href)}`, "_blank")
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        className="bg-[#1877F2]/10 border-[#1877F2]/30 hover:bg-[#1877F2]/20 hover:text-[#1877F2]"
        onClick={handleFacebookShare}
      >
        <Facebook className="h-4 w-4 mr-2" />
        Facebook
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="bg-[#1DA1F2]/10 border-[#1DA1F2]/30 hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2]"
        onClick={handleTwitterShare}
      >
        <Twitter className="h-4 w-4 mr-2" />X
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="bg-[#E4405F]/10 border-[#E4405F]/30 hover:bg-[#E4405F]/20 hover:text-[#E4405F]"
        onClick={handleInstagramShare}
      >
        <Instagram className="h-4 w-4 mr-2" />
        Instagram
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="bg-[#25D366]/10 border-[#25D366]/30 hover:bg-[#25D366]/20 hover:text-[#25D366]"
        onClick={handleWhatsAppShare}
      >
        <Send className="h-4 w-4 mr-2" />
        WhatsApp
      </Button>
    </div>
  )
}
