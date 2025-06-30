"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PixelData } from "@/types/block"

const COLORS = [
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#800000",
  "#008000",
  "#000080",
  "#808000",
  "#800080",
  "#008080",
  "#C0C0C0",
  "#808080",
]

async function updateBlock(row: number, col: number, pixelData: PixelData[], imageBase64: string) {
  const response = await fetch(`/api/blocks/${row}-${col}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pixelData, imageBase64 }),
  })
  return response.json()
}

export default function DrawPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const row = Number.parseInt(searchParams.get("row") || "0")
  const col = Number.parseInt(searchParams.get("col") || "0")

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedColor, setSelectedColor] = useState("#000000")
  const [isErasing, setIsErasing] = useState(false)
  const [pixelData, setPixelData] = useState<PixelData[]>([])

  const updateMutation = useMutation({
    mutationFn: ({ pixelData, imageBase64 }: { pixelData: PixelData[]; imageBase64: string }) =>
      updateBlock(row, col, pixelData, imageBase64),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] })
      router.push("/end")
    },
  })

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    for (let i = 0; i <= 8; i++) {
      ctx.beginPath()
      ctx.moveTo(i * 40, 0)
      ctx.lineTo(i * 40, 320)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i * 40)
      ctx.lineTo(320, i * 40)
      ctx.stroke()
    }

    // Draw pixels
    pixelData.forEach((pixel) => {
      ctx.fillStyle = pixel.color
      ctx.fillRect(pixel.column * 40 + 1, pixel.row * 40 + 1, 38, 38)
    })
  }, [pixelData])

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const pixelRow = Math.floor(y / 40)
    const pixelCol = Math.floor(x / 40)

    if (pixelRow >= 0 && pixelRow < 8 && pixelCol >= 0 && pixelCol < 8) {
      setPixelData((prev) => {
        const filtered = prev.filter((p) => !(p.row === pixelRow && p.column === pixelCol))

        if (!isErasing) {
          return [...filtered, { row: pixelRow, column: pixelCol, color: selectedColor }]
        }

        return filtered
      })
    }
  }

  const generateImageBase64 = (): string => {
    const canvas = document.createElement("canvas")
    canvas.width = 8
    canvas.height = 8
    const ctx = canvas.getContext("2d")

    if (!ctx) return ""

    // Fill with transparent background
    ctx.clearRect(0, 0, 8, 8)

    // Draw pixels
    pixelData.forEach((pixel) => {
      ctx.fillStyle = pixel.color
      ctx.fillRect(pixel.column, pixel.row, 1, 1)
    })

    return canvas.toDataURL("image/png")
  }

  const handleSubmit = () => {
    const imageBase64 = generateImageBase64()
    updateMutation.mutate({ pixelData, imageBase64 })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Draw Block ({row}, {col})
            </CardTitle>
            <p className="text-center text-gray-600">
              Create your 8×8 pixel masterpiece! Click to paint, select colors below.
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <canvas
                  ref={canvasRef}
                  width={320}
                  height={320}
                  onClick={handleCanvasClick}
                  className="border-2 border-gray-300 rounded-lg cursor-crosshair mx-auto block"
                />
              </div>

              <div className="lg:w-80 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Tools</h3>
                  <div className="flex gap-2">
                    <Button variant={!isErasing ? "default" : "outline"} onClick={() => setIsErasing(false)} size="sm">
                      Paint
                    </Button>
                    <Button variant={isErasing ? "default" : "outline"} onClick={() => setIsErasing(true)} size="sm">
                      Erase
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Colors</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setSelectedColor(color)
                          setIsErasing(false)
                        }}
                        className={`
                          w-12 h-12 rounded-lg border-2 transition-all
                          ${selectedColor === color ? "border-blue-500 scale-110" : "border-gray-300"}
                        `}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Button onClick={() => setPixelData([])} variant="outline" className="w-full">
                    Clear All
                  </Button>

                  <Button onClick={handleSubmit} disabled={updateMutation.isPending} className="w-full">
                    {updateMutation.isPending ? "Submitting..." : "Submit Artwork"}
                  </Button>

                  <Button variant="outline" onClick={() => router.push("/select")} className="w-full">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
