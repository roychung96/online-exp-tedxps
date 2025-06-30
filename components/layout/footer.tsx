"use client"
import { useRouter, usePathname } from "next/navigation"
import { X, QrCode } from "lucide-react"



export function Footer() {
    const router = useRouter()
  const pathname = usePathname()

  const handleScanHome = () => {
    router.push("/")
  }

  const handleLeftAction = () => {
    // Left X button - could be close/cancel action
    if (pathname !== "/hub") {
      router.push("/hub")
    }
  }

  const handleRightAction = () => {
    // Right X button - could be another action or disabled
    console.log("Right action clicked")
  }
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-12 bg-white border-t text-sm text-gray-500 flex items-center justify-center z-50">
      <div className="flex space-x-6">
<button
        onClick={handleLeftAction}
        className="w-12 h-12 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100 mt-2"
      >
        <X className="w-6 h-6 text-[#E62B1E]" strokeWidth={3} />
      </button>

      {/* Center Scan Button */}
      <button
        onClick={handleScanHome}
        className="w-14 h-14 bg-[#E62B1E] rounded-full flex items-center justify-center shadow-lg hover:bg-[#E62B1E]/90 transition-colors mb-3"
      >
        <QrCode className="w-7 h-7 text-white" strokeWidth={2} />
      </button>

      {/* Right Button */}
      <button
        onClick={handleRightAction}
        className="w-12 h-12 flex items-center justify-center rounded-full transition-colors hover:bg-gray-100 mt-2"
      >
        <X className="w-6 h-6 text-gray-400" strokeWidth={3} />
      </button>
      </div>
    </footer>
  )
}
