export interface Block {
  row: number
  col: number
  status: "available" | "drawing" | "completed"
  imageBase64: string
  lockedAt: Date | null
  expiresTime: Date | null
  submissionTime: Date | null
  userId: string | null
  pixelData: PixelData[]
}

export interface PixelData {
  row: number
  column: number
  color: string
}

export interface LockResponse {
  success: boolean
  message: string
  block?: Block
}
