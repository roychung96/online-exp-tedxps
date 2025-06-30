import type { Block } from "@/types/block"

// Simple 8x8 transparent PNG as base64
const placeholder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAANSURBVBiVY2AYBaNgFAAABQABDQottAAAAABJRU5ErkJggg=="

export const blocks: Block[] = Array.from({ length: 256 }, (_, i) => ({
  row: Math.floor(i / 16),
  col: i % 16,
  status: i % 3 === 0 ? "completed" : "available",
  imageBase64: placeholder,
  lockedAt: null,
  expiresTime: null,
  submissionTime: null,
  userId: null,
  pixelData: [],
}))

// Helper function to get block by coordinates
export function getBlockByCoords(row: number, col: number): Block | undefined {
  return blocks.find((block) => block.row === row && block.col === col)
}

// Helper function to update block
export function updateBlock(row: number, col: number, updates: Partial<Block>): Block | null {
  const blockIndex = blocks.findIndex((block) => block.row === row && block.col === col)
  if (blockIndex === -1) return null

  blocks[blockIndex] = { ...blocks[blockIndex], ...updates }
  return blocks[blockIndex]
}
