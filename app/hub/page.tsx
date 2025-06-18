"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BadgeCard } from "@/components/badge-card"
import { Users, Trophy, Camera, Brain, Share, Calendar } from "lucide-react"

const badges = [
  {
    id: "1",
    title: "First Steps",
    description: "Complete your profile setup",
    icon: <Trophy className="w-6 h-6" />,
    status: "earned" as const,
    category: "Getting Started",
  },
  {
    id: "2",
    title: "Networking Pro",
    description: "Connect with 5 attendees",
    icon: <Users className="w-6 h-6" />,
    status: "unlocked" as const,
    category: "Social",
  },
  {
    id: "3",
    title: "Photo Booth",
    description: "Take a photo with TEDx logo",
    icon: <Camera className="w-6 h-6" />,
    status: "unlocked" as const,
    category: "Fun",
  },
  {
    id: "4",
    title: "Quiz Master",
    description: "Complete the TEDx knowledge quiz",
    icon: <Brain className="w-6 h-6" />,
    status: "unlocked" as const,
    category: "Learning",
  },
  {
    id: "5",
    title: "Social Sharer",
    description: "Share your experience on social media",
    icon: <Share className="w-6 h-6" />,
    status: "locked" as const,
    category: "Social",
  },
  {
    id: "6",
    title: "Event Veteran",
    description: "Attend all scheduled talks",
    icon: <Calendar className="w-6 h-6" />,
    status: "locked" as const,
    category: "Attendance",
  },
]

export default function BadgeHubPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("all")

  const handleBadgeClick = (badge: any) => {
    if (badge.status === "locked") return

    if (badge.status === "earned") {
      router.push("/poster")
    } else {
      router.push(`/badge/${badge.id}`)
    }
  }

  const categories = ["all", "Getting Started", "Social", "Fun", "Learning", "Attendance"]
  const filteredBadges =
    selectedCategory === "all" ? badges : badges.filter((badge) => badge.category === selectedCategory)

  const earnedCount = badges.filter((b) => b.status === "earned").length
  const progress = Math.round((earnedCount / badges.length) * 100)

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      <Header progress={progress} />

      <main className="pt-16 pb-20 px-4 max-w-4xl mx-auto">
        <div className="mb-6 mt-6">
          <h1 className="text-2xl font-bold text-[#333333] mb-2">Badge Collection</h1>
          <p className="text-gray-600">Earn badges by participating in TEDxPetalingStreet activities</p>
        </div>

        {/* Category Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedCategory === category
                  ? "bg-[#E62B1E] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category === "all" ? "All" : category}
            </button>
          ))}
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBadges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} onClick={() => handleBadgeClick(badge)} />
          ))}
        </div>

        {/* Progress Summary */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-xl font-bold text-[#333333] mb-2">Your Progress</h2>
          <div className="text-3xl font-bold text-[#E62B1E] mb-2">
            {earnedCount}/{badges.length}
          </div>
          <p className="text-gray-600">Badges Earned</p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
