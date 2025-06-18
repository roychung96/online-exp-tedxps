"use client"

import { useEffect, useRef, useState } from "react"
import { CameraOff, Camera, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QRCodeScannerProps {
  onDetect: (data: string) => void
}

export function QRCodeScanner({ onDetect }: QRCodeScannerProps) {
  const scannerRef = useRef<HTMLDivElement>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cameraId, setCameraId] = useState<string>("")
  const [cameras, setCameras] = useState<any[]>([])
  const [scanner, setScanner] = useState<any>(null)

  useEffect(() => {
    let html5QrCode: any = null

    const initializeScanner = async () => {
      try {
        // Dynamically import html5-qrcode
        const { Html5Qrcode } = await import("html5-qrcode")

        html5QrCode = new Html5Qrcode("qr-reader")
        setScanner(html5QrCode)

        // Get available cameras
        const devices = await Html5Qrcode.getCameras()
        if (devices && devices.length) {
          setCameras(devices)
          // Prefer back camera if available
          const backCamera = devices.find(
            (device: any) =>
              device.label.toLowerCase().includes("back") ||
              device.label.toLowerCase().includes("rear") ||
              device.label.toLowerCase().includes("environment"),
          )
          setCameraId(backCamera ? backCamera.id : devices[0].id)
        }
      } catch (err) {
        console.error("Failed to initialize scanner:", err)
        setError("Failed to initialize camera scanner")
      }
    }

    initializeScanner()

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(console.error)
      }
    }
  }, [])

  const startScanning = async () => {
    if (!scanner || !cameraId) return

    try {
      setError(null)
      setIsScanning(true)

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      }

      await scanner.start(
        cameraId,
        config,
        (decodedText: string) => {
          console.log("QR Code detected:", decodedText)
          onDetect(decodedText)
          stopScanning()
        },
        (errorMessage: string) => {
          // Handle scan errors silently - this fires frequently during normal operation
        },
      )
    } catch (err: any) {
      console.error("Failed to start scanning:", err)
      setError(err.message || "Failed to start camera")
      setIsScanning(false)
    }
  }

  const stopScanning = async () => {
    if (scanner && scanner.isScanning) {
      try {
        await scanner.stop()
        setIsScanning(false)
      } catch (err) {
        console.error("Failed to stop scanning:", err)
      }
    }
  }

  const switchCamera = async () => {
    if (cameras.length <= 1) return

    await stopScanning()

    const currentIndex = cameras.findIndex((cam) => cam.id === cameraId)
    const nextIndex = (currentIndex + 1) % cameras.length
    setCameraId(cameras[nextIndex].id)

    // Small delay before starting with new camera
    setTimeout(() => {
      if (!isScanning) {
        startScanning()
      }
    }, 500)
  }

  const simulateQRDetection = () => {
    // Keep the demo functionality for testing
    onDetect("tedx-badge-networking-001")
  }

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
      {error ? (
        <div className="flex flex-col items-center justify-center h-full text-white space-y-4 p-4">
          <CameraOff className="w-16 h-16 text-gray-400" />
          <p className="text-center text-sm">{error}</p>
          <div className="space-y-2">
            <Button
              onClick={startScanning}
              className="px-4 py-2 bg-[#E62B1E] text-white rounded-lg"
              disabled={!scanner || !cameraId}
            >
              <Camera className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button
              onClick={simulateQRDetection}
              variant="outline"
              className="px-4 py-2 border-white text-white hover:bg-white hover:text-black"
            >
              Demo Mode
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* QR Reader Container */}
          <div id="qr-reader" className="w-full h-full"></div>

          {/* Scanner Overlay - only show when not scanning */}
          {!isScanning && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-center text-white space-y-4">
                <div className="w-64 h-64 border-2 border-white rounded-lg relative mx-auto">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#E62B1E] rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#E62B1E] rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#E62B1E] rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#E62B1E] rounded-br-lg"></div>
                </div>
                <p className="text-sm">Point camera at QR code to scan</p>
              </div>
            </div>
          )}

          {/* Control Buttons */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
            {!isScanning ? (
              <Button
                onClick={startScanning}
                className="px-4 py-2 bg-[#E62B1E] text-white rounded-lg"
                disabled={!scanner || !cameraId}
              >
                <Camera className="w-4 h-4 mr-2" />
                Start Scanning
              </Button>
            ) : (
              <Button
                onClick={stopScanning}
                variant="outline"
                className="px-4 py-2 border-white text-white hover:bg-white hover:text-black"
              >
                Stop Scanning
              </Button>
            )}

            {cameras.length > 1 && (
              <Button
                onClick={switchCamera}
                variant="outline"
                className="px-3 py-2 border-white text-white hover:bg-white hover:text-black"
                disabled={isScanning}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            )}

            <Button
              onClick={simulateQRDetection}
              variant="outline"
              className="px-4 py-2 border-white text-white hover:bg-white hover:text-black text-xs"
            >
              Demo
            </Button>
          </div>

          {/* Camera Info */}
          {cameras.length > 0 && (
            <div className="absolute top-4 left-4 right-4">
              <div className="bg-black bg-opacity-50 rounded-lg p-2 text-white text-xs text-center">
                {cameras.find((cam) => cam.id === cameraId)?.label || "Camera"}
                {cameras.length > 1 && (
                  <span className="ml-2 opacity-75">
                    ({cameras.findIndex((cam) => cam.id === cameraId) + 1}/{cameras.length})
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Scanning Indicator */}
          {isScanning && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-64 h-64 border-2 border-[#E62B1E] rounded-lg relative">
                <div className="absolute inset-0 border-2 border-[#E62B1E] rounded-lg animate-pulse"></div>
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg"></div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
