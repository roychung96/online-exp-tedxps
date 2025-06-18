"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Download, Mail, Share2, Trophy } from "lucide-react"

export default function PosterPage() {
  const router = useRouter()
  const [isDownloading, setIsDownloading] = useState(false)
  const [isEmailing, setIsEmailing] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    // Simulate download
    setTimeout(() => {
      setIsDownloading(false)
      // In real app, trigger download
      console.log("Downloading poster...")
    }, 1500)
  }

  const handleEmail = async () => {
    setIsEmailing(true)
    // Simulate email
    setTimeout(() => {
      setIsEmailing(false)
      alert("Poster sent to your email!")
    }, 2000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My TEDxPetalingStreet Achievement",
        text: "Check out my badge collection from TEDxPetalingStreet!",
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      <Header progress={75} />

      <main className="pt-16 pb-20 px-4 max-w-4xl mx-auto">
        <div className="space-y-6 mt-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#333333] mb-2">Your Achievement Poster</h1>
            <p className="text-gray-600">Share your TEDxPetalingStreet journey with the world</p>
          </div>

          {/* Poster Preview */}
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-[#E62B1E] to-[#B91C1C] rounded-lg shadow-lg p-8 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-32 h-32 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-24 h-24 border-2 border-white rounded-full"></div>
              </div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2">TEDxPetalingStreet</h2>
                  <p className="text-xl opacity-90">Badge Achievement</p>
                </div>

                <div className="bg-white/10 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-[#E62B1E]" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-2">John Doe</h3>
                  <p className="text-center opacity-90">Successfully earned badges at TEDxPetalingStreet 2024</p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-sm opacity-80">Badges Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">85</div>
                    <div className="text-sm opacity-80">Points Scored</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">5</div>
                    <div className="text-sm opacity-80">Connections Made</div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm opacity-80">Ideas Worth Spreading</p>
                  <p className="text-xs opacity-60 mt-2">December 2024 • Petaling Street, KL</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 flex-wrap gap-4">
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
              variant="outline"
            >
              {isDownloading ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>{isDownloading ? "Downloading..." : "Download PNG"}</span>
            </Button>

            <Button
              onClick={handleEmail}
              disabled={isEmailing}
              className="px-4 py-2 bg-[#E62B1E] hover:bg-[#E62B1E]/90 text-white rounded-lg flex items-center space-x-2"
            >
              {isEmailing ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Mail className="w-4 h-4" />
              )}
              <span>{isEmailing ? "Sending..." : "Email Me"}</span>
            </Button>

            <Button
              onClick={handleShare}
              variant="outline"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </Button>
          </div>

          {/* Back to Hub */}
          <div className="text-center mt-8">
            <Button
              onClick={() => router.push("/hub")}
              variant="outline"
              className="px-6 py-2 border-[#E62B1E] text-[#E62B1E] hover:bg-red-50"
            >
              Back to Badge Hub
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
