"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function QRTestCodes() {
  const [showCodes, setShowCodes] = useState(false)

  const testCodes = [
    {
      name: "Networking Badge",
      data: "tedx-badge-networking-002",
      description: "Scan to unlock networking badge challenge",
    },
    {
      name: "Quiz Badge",
      data: "tedx-badge-quiz-004",
      description: "Scan to start the TEDx knowledge quiz",
    },
    {
      name: "Photo Badge",
      data: "tedx-badge-photo-003",
      description: "Scan to unlock photo booth challenge",
    },
    {
      name: "JSON Format",
      data: '{"type":"tedx-badge","badgeId":"2","action":"unlock"}',
      description: "Example of structured QR data",
    },
  ]

  if (!showCodes) {
    return (
      <div className="fixed bottom-20 right-4 z-40">
        <Button
          onClick={() => setShowCodes(true)}
          variant="outline"
          size="sm"
          className="bg-white shadow-lg border-[#E62B1E] text-[#E62B1E] hover:bg-red-50"
        >
          Show Test QR Codes
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md max-h-[80vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="text-lg">Test QR Codes</CardTitle>
          <CardDescription>Use these sample codes to test the scanner functionality</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {testCodes.map((code, index) => (
            <div key={index} className="border rounded-lg p-3">
              <h4 className="font-medium text-sm mb-1">{code.name}</h4>
              <p className="text-xs text-gray-600 mb-2">{code.description}</p>
              <div className="bg-gray-100 p-2 rounded text-xs font-mono break-all">{code.data}</div>
            </div>
          ))}

          <div className="pt-4 border-t">
            <p className="text-xs text-gray-500 mb-3">
              To test: Copy any code above and create a QR code using an online generator, then scan it with the camera.
            </p>
            <Button onClick={() => setShowCodes(false)} className="w-full bg-[#E62B1E] hover:bg-[#E62B1E]/90">
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
