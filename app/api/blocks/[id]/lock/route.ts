import { type NextRequest, NextResponse } from "next/server"
import { getBlockByCoords, updateBlock } from "@/data/blocks.mock"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const [row, col] = params.id.split("-").map(Number)

    if (process.env.NODE_ENV === "development") {
      const block = getBlockByCoords(row, col)

      if (!block) {
        return NextResponse.json({ success: false, message: "Block not found" }, { status: 404 })
      }

      if (block.status !== "available") {
        return NextResponse.json({ success: false, message: "Block is not available" }, { status: 400 })
      }

      const now = new Date()
      const expiresTime = new Date(now.getTime() + 5 * 60 * 1000) // 5 minutes
      const userId = `user-${Math.random().toString(36).substr(2, 9)}`

      const updatedBlock = updateBlock(row, col, {
        status: "drawing",
        lockedAt: now,
        expiresTime,
        userId,
      })

      return NextResponse.json({ success: true, message: "Block locked successfully", block: updatedBlock })
    }

    return NextResponse.json({ success: false, message: "Production mode not implemented" })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to lock block" }, { status: 500 })
  }
}
