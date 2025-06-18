"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "lucide-react"

interface HeaderProps {
  userAvatar?: string
  progress?: number
}

export function Header({ userAvatar, progress = 0 }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md px-6 flex items-center justify-between z-50">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-[#E62B1E] rounded-full flex items-center justify-center">
          <Badge className="w-4 h-4 text-white" />
        </div>
        <h1 className="text-lg font-bold text-[#333333]">TEDxPS Badge Hub</h1>
      </div>

      <div className="flex items-center space-x-4">
        {progress > 0 && (
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-sm text-gray-600">Progress</span>
            <Progress value={progress} className="w-20 h-2" />
            <span className="text-sm font-medium text-[#E62B1E]">{progress}%</span>
          </div>
        )}
        <Avatar className="w-8 h-8">
          <AvatarImage src={userAvatar || "/placeholder.svg?height=32&width=32"} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
