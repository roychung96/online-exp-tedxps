import { type NextRequest, NextResponse } from "next/server"
import { getBlockByCoords, updateBlock } from "@/data/blocks.mock"
import type { PixelData } from "@/types/block"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const [row, col] = params.id.split("-").map(Number)
    const { pixelData, imageBase64 }: { pixelData: PixelData[]; imageBase64: string } = await request.json()

    if (process.env.NODE_ENV === "development") {
      const block = getBlockByCoords(row, col)

      if (!block) {
        return NextResponse.json({ error: "Block not found" }, { status: 404 })
      }

      if (block.status !== "drawing") {
        return NextResponse.json({ error: "Block is not in drawing state" }, { status: 400 })
      }

      const updatedBlock = updateBlock(row, col, {
        status: "completed",
        pixelData,
        imageBase64,
        submissionTime: new Date(),
        lockedAt: null,
        expiresTime: null,
        userId: null,
      })

      return NextResponse.json({ success: true, block: updatedBlock })
    }

    return NextResponse.json({ error: "Production mode not implemented" }, { status: 500 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update block" }, { status: 500 })
  }
}
