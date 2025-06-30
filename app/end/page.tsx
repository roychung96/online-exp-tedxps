"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Palette, Users, ArrowRight } from "lucide-react"

export default function EndPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="text-center">
          <CardHeader className="pb-8">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-4xl font-bold text-gray-900 mb-4">Thanks for Contributing!</CardTitle>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your pixel art has been added to our collaborative canvas. Together, we're creating something amazing, one
              block at a time.
            </p>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
                <Palette className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Creative Expression</h3>
                <p className="text-sm text-gray-600 text-center">
                  Every pixel tells a story and adds to our collective masterpiece
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
                <Users className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Community Art</h3>
                <p className="text-sm text-gray-600 text-center">
                  Join hundreds of artists collaborating on this unique project
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
                <ArrowRight className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Keep Creating</h3>
                <p className="text-sm text-gray-600 text-center">
                  There are always more blocks waiting for your artistic touch
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/">View Full Canvas</Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link href="/select">Contribute Another Block</Link>
              </Button>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Want to see your contribution? Check out the overview page to see how your block fits into the bigger
                picture!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
