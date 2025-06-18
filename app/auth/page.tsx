"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"

export default function AuthPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false)
      router.push("/hub")
    }, 2000)
  }

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      <Header />

      <main className="pt-16 pb-20 px-4 max-w-4xl mx-auto flex items-center justify-center min-h-[calc(100vh-4rem-3rem)]">
        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg p-8 space-y-4 text-center">
          <div className="w-16 h-16 bg-[#E62B1E] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">T</span>
          </div>

          <h1 className="text-2xl font-bold text-[#333333] mb-2">Welcome to TEDxPS</h1>
          <p className="text-gray-600 mb-6">Sign in to start earning badges and tracking your journey</p>

          <Button
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full py-3 bg-[#E62B1E] hover:bg-[#E62B1E]/90 text-white rounded-lg flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
