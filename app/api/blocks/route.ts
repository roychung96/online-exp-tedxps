import { NextResponse } from "next/server"
import { blocks } from "@/data/blocks.mock"

export async function GET() {
  try {
    if (process.env.NODE_ENV === "development") {
      // Clean up expired locks
      const now = new Date()
      blocks.forEach((block) => {
        if (block.expiresTime && now > block.expiresTime) {
          block.status = "available"
          block.lockedAt = null
          block.expiresTime = null
          block.userId = null
        }
      })

      return NextResponse.json({ blocks })
    }

    // In production, this would connect to MongoDB
    return NextResponse.json({ blocks: [] })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blocks" }, { status: 500 })
  }
}
