"use client"

import type React from "react"

import { Lock, CheckCircle } from "lucide-react"

interface BadgeData {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  status: "locked" | "unlocked" | "earned"
  category: string
}

interface BadgeCardProps {
  badge: BadgeData
  onClick: () => void
}

export function BadgeCard({ badge, onClick }: BadgeCardProps) {
  const getBorderColor = () => {
    switch (badge.status) {
      case "earned":
        return "border-[#E62B1E] bg-red-50"
      case "unlocked":
        return "border-[#E62B1E] border-dashed"
      default:
        return "border-gray-200"
    }
  }

  const getStatusBadge = () => {
    switch (badge.status) {
      case "earned":
        return (
          <div className="flex items-center space-x-1 text-green-600 text-xs">
            <CheckCircle className="w-3 h-3" />
            <span>Earned</span>
          </div>
        )
      case "unlocked":
        return <span className="text-[#E62B1E] text-xs font-medium">Available</span>
      default:
        return <span className="text-gray-400 text-xs">Locked</span>
    }
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 flex flex-col items-center border-2 cursor-pointer transition-all hover:shadow-lg ${getBorderColor()}`}
      onClick={onClick}
    >
      <div className={`p-3 rounded-full mb-3 ${badge.status === "locked" ? "bg-gray-100" : "bg-[#E62B1E] text-white"}`}>
        {badge.status === "locked" ? <Lock className="w-6 h-6 text-gray-400" /> : badge.icon}
      </div>

      <h3
        className={`font-semibold text-center mb-2 ${badge.status === "locked" ? "text-gray-400" : "text-[#333333]"}`}
      >
        {badge.title}
      </h3>

      <p className={`text-sm text-center mb-3 ${badge.status === "locked" ? "text-gray-400" : "text-gray-600"}`}>
        {badge.description}
      </p>

      <div className="mt-auto">{getStatusBadge()}</div>
    </div>
  )
}
