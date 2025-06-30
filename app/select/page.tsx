"use client"

import type React from "react"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import type { Block, LockResponse } from "@/types/block"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

async function fetchBlocks(): Promise<Block[]> {
  const response = await fetch("/api/blocks")
  const data = await response.json()
  return data.blocks
}

async function lockBlock(row: number, col: number): Promise<LockResponse> {
  const response = await fetch(`/api/blocks/${row}-${col}/lock`, {
    method: "POST",
  })
  return response.json()
}

export default function SelectPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { data: blocks = [], isLoading } = useQuery({
    queryKey: ["blocks"],
    queryFn: fetchBlocks,
  })

  const lockMutation = useMutation({
    mutationFn: ({ row, col }: { row: number; col: number }) => lockBlock(row, col),
    onSuccess: (data, variables) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["blocks"] })
        router.push(`/draw?row=${variables.row}&col=${variables.col}`)
      } else {
        alert(data.message)
      }
    },
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

      // Add selection highlight for available blocks
      if (block.status === "available") {
        ctx.strokeStyle = "#22c55e"
        ctx.lineWidth = 2
        ctx.strokeRect(x + 1, y + 1, 30, 30)
      }

      // Draw pixel data if available
      if (block.pixelData.length > 0) {
        block.pixelData.forEach((pixel) => {
          ctx.fillStyle = pixel.color
          ctx.fillRect(x + pixel.column * 4 + 1, y + pixel.row * 4 + 1, 4, 4)
        })
      }
    })
  }, [blocks])

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || lockMutation.isPending) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Convert to block coordinates
    const col = Math.floor(x / 32)
    const row = Math.floor(y / 32)

    if (row >= 0 && row < 16 && col >= 0 && col < 16) {
      const block = blocks.find((b) => b.row === row && b.col === col)

      if (block?.status === "available") {
        lockMutation.mutate({ row, col })
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading canvas...</div>
      </div>
    )
  }

  const availableBlocks = blocks.filter((block) => block.status === "available").length
  const completedBlocks = blocks.filter((b) => b.status === "completed").length
  const drawingBlocks = blocks.filter((b) => b.status === "drawing").length

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Select a Block to Draw</CardTitle>
            <p className="text-center text-gray-600">
              Click on any available block (highlighted in green) to start drawing
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{availableBlocks}</div>
                <div className="text-sm text-gray-600">Available to Draw</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{drawingBlocks}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{completedBlocks}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <canvas
                ref={canvasRef}
                width={512}
                height={512}
                onClick={handleCanvasClick}
                className={`border-2 border-gray-300 rounded-lg shadow-lg ${
                  lockMutation.isPending ? "cursor-wait opacity-50" : "cursor-pointer"
                }`}
              />
            </div>

            <div className="text-center space-y-4">
              <div className="flex justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 border-2 border-green-500 rounded-sm"></div>
                  <span>Available (click to select)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-100 border border-gray-300 rounded-sm"></div>
                  <span>In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 border border-gray-300 rounded-sm"></div>
                  <span>Completed</span>
                </div>
              </div>

              {lockMutation.isPending && <div className="text-blue-600 font-medium">Locking block for drawing...</div>}

              <Button variant="outline" asChild>
                <Link href="/">← Back to Overview</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
