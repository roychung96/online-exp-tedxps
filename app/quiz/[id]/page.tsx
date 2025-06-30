"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"

const quizQuestions = [
  {
    question: "What does TED stand for?",
    options: [
      "Technology, Entertainment, Design",
      "Teaching, Education, Development",
      "Think, Explore, Discover",
      "Technology, Engineering, Design",
    ],
    correct: 0,
  },
  {
    question: "What is the maximum length of a TED talk?",
    options: ["15 minutes", "18 minutes", "20 minutes", "25 minutes"],
    correct: 1,
  },
  {
    question: "TEDx events are:",
    options: [
      "Official TED conferences",
      "Independent events licensed by TED",
      "Online-only events",
      "Corporate training sessions",
    ],
    correct: 1,
  },
  {
    question: "What is the main theme of TEDxPetalingStreet?",
    options: ["Technology Innovation", "Ideas Worth Spreading", "Community Building", "Future of Work"],
    correct: 1,
  },
  {
    question: "TED talks are known for their:",
    options: ["Long duration", "Academic language", "Inspiring and accessible format", "Technical complexity"],
    correct: 2,
  },
]

export default function QuizPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleNext = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      // Quiz completed
      const score = newAnswers.reduce((acc, answer, index) => {
        return acc + (answer === quizQuestions[index].correct ? 1 : 0)
      }, 0)

      setShowResult(true)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1])
      setAnswers(answers.slice(0, -1))
    }
  }

  const score = answers.reduce((acc, answer, index) => {
    return acc + (answer === quizQuestions[index].correct ? 1 : 0)
  }, 0)

  const percentage = Math.round((score / quizQuestions.length) * 100)

  if (showResult) {
    return (
      <div className="font-sans text-gray-800 bg-white min-h-screen">
        <Header progress={percentage >= 80 ? 60 : 35} />

        <main className="pt-16 pb-20 px-4 max-w-4xl mx-auto flex items-center justify-center min-h-[calc(100vh-4rem-3rem)]">
          <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6 text-center">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                percentage >= 80 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              }`}
            >
              <span className="text-2xl font-bold">{percentage}%</span>
            </div>

            <h1 className="text-2xl font-semibold text-[#333333]">
              {percentage >= 80 ? "Congratulations!" : "Good Try!"}
            </h1>

            <p className="text-gray-600">
              You scored {score} out of {quizQuestions.length} questions correctly.
              {percentage >= 80
                ? " You've earned the Quiz Master badge!"
                : " You need 80% to earn the badge. Try again!"}
            </p>

            <div className="space-y-3">
              {percentage >= 80 ? (
                <Button
                  onClick={() => router.push("/hub")}
                  className="w-full py-3 bg-[#E62B1E] hover:bg-[#E62B1E]/90 text-white rounded-lg"
                >
                  View Badge
                </Button>
              ) : (
                <Button
                  onClick={() => window.location.reload()}
                  className="w-full py-3 bg-[#E62B1E] hover:bg-[#E62B1E]/90 text-white rounded-lg"
                >
                  Try Again
                </Button>
              )}

              <Button
                variant="outline"
                onClick={() => router.push("/hub")}
                className="w-full py-3 border-gray-300 text-gray-700 rounded-lg"
              >
                Back to Hub
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      <Header progress={35} />

      <main className="pt-16 pb-20 px-4 max-w-4xl mx-auto flex items-center justify-center min-h-[calc(100vh-4rem-3rem)]">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#333333]">
              Question {currentQuestion + 1}/{quizQuestions.length}
            </h2>
            <div className="text-sm text-gray-500">Quiz Master Badge</div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-[#333333] mb-4">{quizQuestions[currentQuestion].question}</h3>

            <div className="space-y-2">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(index)}
                  className={`w-full p-3 text-left rounded-lg border transition-colors ${
                    selectedAnswer === index
                      ? "border-[#E62B1E] bg-red-50 text-[#E62B1E]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className="px-4 py-2 border-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
            >
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="px-4 py-2 bg-[#E62B1E] hover:bg-[#E62B1E]/90 text-white rounded-lg disabled:opacity-50"
            >
              {currentQuestion === quizQuestions.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
