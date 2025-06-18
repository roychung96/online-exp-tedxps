"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Camera, Upload, Check } from "lucide-react"

export default function PhotoUploadPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)

    // Simulate upload
    setTimeout(() => {
      setIsUploading(false)
      setIsUploaded(true)
    }, 2000)
  }

  const handleSubmit = () => {
    router.push("/hub")
  }

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      <Header progress={45} />

      <main className="pt-16 pb-20 px-4 max-w-4xl mx-auto flex items-center justify-center min-h-[calc(100vh-4rem-3rem)]">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 space-y-4 text-center">
          <div className="w-16 h-16 bg-[#E62B1E] rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-2xl font-semibold text-[#333333] mb-2">Photo Booth Badge</h1>
          <p className="text-gray-600 mb-6">Upload a photo with the TEDxPS logo to earn this badge.</p>

          {!preview && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Take or upload a photo</p>
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="border-[#E62B1E] text-[#E62B1E] hover:bg-red-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Photo
              </Button>
            </div>
          )}

          {preview && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full rounded-lg shadow-md max-h-64 object-cover"
                />
                {isUploaded && (
                  <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              {!isUploaded && (
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700"
                >
                  Choose Different Photo
                </Button>
              )}
            </div>
          )}

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

          {preview && !isUploaded && (
            <Button
              onClick={handleUpload}
              disabled={isUploading}
              className="w-full py-3 bg-[#E62B1E] hover:bg-[#E62B1E]/90 text-white rounded-lg"
            >
              {isUploading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Uploading...</span>
                </div>
              ) : (
                "Upload Photo"
              )}
            </Button>
          )}

          {isUploaded && (
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <Check className="w-5 h-5" />
                <span className="font-medium">Photo uploaded successfully!</span>
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full py-3 bg-[#E62B1E] hover:bg-[#E62B1E]/90 text-white rounded-lg"
              >
                Claim Badge
              </Button>
            </div>
          )}

          <Button
            variant="outline"
            onClick={() => router.push("/hub")}
            className="w-full py-3 border-gray-300 text-gray-700 rounded-lg"
          >
            Back to Hub
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
