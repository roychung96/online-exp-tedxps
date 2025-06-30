"use client"

import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import Link from "next/link"
import type { Block } from "@/types/block"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

async function fetchBlocks(): Promise<Block[]> {
  const response = await fetch("/api/blocks")
  const data = await response.json()
  return data.blocks
}

export default function OverviewPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const {
    data: blocks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blocks"],
    queryFn: fetchBlocks,
  })

  useEffect(() => {
    if (!blocks.length || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid lines
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    for (let i = 0; i <= 16; i++) {
      ctx.beginPath()
      ctx.moveTo(i * 32, 0)
      ctx.lineTo(i * 32, 512)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i * 32)
      ctx.lineTo(512, i * 32)
      ctx.stroke()
    }

    // Draw blocks
    blocks.forEach((block) => {
      const x = block.col * 32
      const y = block.row * 32

      // Draw block background based on status
      if (block.status === "completed") {
        ctx.fillStyle = "#10b981"
      } else if (block.status === "drawing") {
        ctx.fillStyle = "#f59e0b"
      } else {
        ctx.fillStyle = "#f3f4f6"
      }

      ctx.fillRect(x + 1, y + 1, 30, 30)

      // Draw pixel data if available
      if (block.pixelData.length > 0) {
        block.pixelData.forEach((pixel) => {
          ctx.fillStyle = pixel.color
          ctx.fillRect(x + pixel.column * 4 + 1, y + pixel.row * 4 + 1, 4, 4)
        })
      }
    })
  }, [blocks])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading pixel art canvas...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Error loading blocks</div>
      </div>
    )
  }

  const completedBlocks = blocks.filter((b) => b.status === "completed").length
  const drawingBlocks = blocks.filter((b) => b.status === "drawing").length
  const availableBlocks = blocks.filter((b) => b.status === "available").length

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Collaborative Pixel Art Canvas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completedBlocks}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{drawingBlocks}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{availableBlocks}</div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <canvas
                ref={canvasRef}
                width={512}
                height={512}
                className="border-2 border-gray-300 rounded-lg shadow-lg"
              />
            </div>

            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link href="/select">Start Contributing</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/end">View Gallery</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
