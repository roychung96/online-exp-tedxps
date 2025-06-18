"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { QRCodeScanner } from "@/components/qr-scanner"
import { QRTestCodes } from "@/components/qr-test-codes"

export default function ScanPage() {
  const router = useRouter()

  const handleQRDetect = (data: string) => {
    console.log("QR Code detected:", data)

    // Parse different QR code formats
    try {
      // Handle TEDx badge QR codes
      if (data.includes("tedx-badge-") || data.includes("badge")) {
        const badgeId = data.split("-").pop() || data.split("/").pop()
        if (badgeId && badgeId.match(/^\d+$/)) {
          router.push(`/badge/${badgeId}`)
        } else {
          router.push("/hub")
        }
        return
      }

      // Handle URLs
      if (data.startsWith("http://") || data.startsWith("https://")) {
        // Check if it's a TEDx related URL
        if (data.includes("tedx") || data.includes("badge")) {
          const url = new URL(data)
          const pathSegments = url.pathname.split("/")
          const badgeIndex = pathSegments.indexOf("badge")

          if (badgeIndex !== -1 && pathSegments[badgeIndex + 1]) {
            router.push(`/badge/${pathSegments[badgeIndex + 1]}`)
          } else {
            router.push("/hub")
          }
        } else {
          // External URL - could open in new tab or show warning
          window.open(data, "_blank")
        }
        return
      }

      // Handle JSON data
      if (data.startsWith("{")) {
        const parsed = JSON.parse(data)
        if (parsed.type === "tedx-badge" && parsed.badgeId) {
          router.push(`/badge/${parsed.badgeId}`)
        } else if (parsed.action === "auth") {
          router.push("/auth")
        } else {
          router.push("/hub")
        }
        return
      }

      // Handle simple badge codes
      if (data.match(/^\d+$/)) {
        router.push(`/badge/${data}`)
        return
      }

      // Default fallback
      router.push("/hub")
    } catch (error) {
      console.error("Error parsing QR code:", error)
      // Fallback to hub on any parsing error
      router.push("/hub")
    }
  }

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      <Header progress={25} />

      <main className="h-[calc(100vh-4rem-3rem)] flex items-center justify-center px-4">
        <div className="w-full max-w-md aspect-square">
          <QRCodeScanner onDetect={handleQRDetect} />
        </div>
      </main>

      <Footer />
      <QRTestCodes />
    </div>
  )
}
