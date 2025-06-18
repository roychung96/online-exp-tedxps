"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Users, Camera, Brain } from "lucide-react"

const badgeDetails: Record<string, any> = {
  "2": {
    title: "Networking Pro",
    description: "Connect with 5 fellow attendees and exchange contact information",
    icon: <Users className="w-12 h-12" />,
    instructions:
      "Visit the networking area and use the QR codes on attendee badges to connect. You need to successfully connect with 5 different people to earn this badge.",
    action: "Start Networking",
    actionType: "scan",
  },
  "3": {
    title: "Photo Booth",
    description: "Take a creative photo with the TEDx logo",
    icon: <Camera className="w-12 h-12" />,
    instructions:
      "Find the TEDxPetalingStreet photo booth area and take a photo with the official logo. Make sure the logo is clearly visible in your photo.",
    action: "Take Photo",
    actionType: "photo",
  },
  "4": {
    title: "Quiz Master",
    description: "Test your knowledge about TEDx and innovation",
    icon: <Brain className="w-12 h-12" />,
    instructions:
      "Complete our interactive quiz about TEDx history, innovation, and the themes discussed at TEDxPetalingStreet. You need to score at least 80% to earn this badge.",
    action: "Start Quiz",
    actionType: "quiz",
  },
}

export default function BadgeDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const badge = badgeDetails[params.id]

  if (!badge) {
    return <div>Badge not found</div>
  }

  const handleStart = () => {
    switch (badge.actionType) {
      case "quiz":
        router.push(`/quiz/${params.id}`)
        break
      case "photo":
        router.push(`/photo/${params.id}`)
        break
      case "scan":
        router.push("/")
        break
      default:
        router.push("/hub")
    }
  }

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      <Header progress={35} />

      <main className="pt-16 pb-20 px-4 max-w-4xl mx-auto flex items-center justify-center min-h-[calc(100vh-4rem-3rem)]">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-[#E62B1E] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
              {badge.icon}
            </div>
            <h1 className="text-2xl font-semibold text-[#333333] mb-2">{badge.title}</h1>
            <p className="text-gray-600">{badge.description}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-[#333333] mb-2">How to Earn this Badge?</h2>
            <p className="text-gray-600">{badge.instructions}</p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleStart}
              className="w-full py-3 bg-[#E62B1E] hover:bg-[#E62B1E]/90 text-white rounded-lg"
            >
              {badge.action}
            </Button>

            <Button
              variant="outline"
              onClick={() => router.push("/hub")}
              className="w-full py-3 border-gray-300 text-gray-700 rounded-lg"
            >
              Back to Hub
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
