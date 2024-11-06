"use client"

import React, { useState, useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import IntroPage from "@/components/intro-page"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const fontUrl = "https://use.typekit.net/gcd4kuc.css";

const funnelData = {
  questions: [
    {
      id: 1,
      type: "multiple-choice",
      sentence: "What is your primary financial goal?",
      options: [
        "Preparing for retirement with tax-smart investments",
        "Saving for a major purchase, like a home",
        "Building a portfolio with minimized tax liabilities",
        "Securing financial stability for future generations",
        "Other"
      ],
      correctAnswer: null // User input will vary
    },
    {
      id: 2,
      type: "multiple-choice",
      sentence: "What is your biggest concern about managing taxes on your investments?",
      options: [
        "High tax deductions on my returns",
        "Not fully utilizing available tax-saving accounts",
        "Finding reliable guidance on tax-efficient options",
        "Understanding complex tax rules",
        "Other"
      ],
      correctAnswer: null // User input will vary
    },
    {
      id: 3,
      type: "multiple-choice",
      sentence: "What would you find most valuable to achieve your goals?",
      options: [
        "A personalized investment plan focusing on tax savings",
        "Tools to monitor and optimize tax efficiency",
        "Expert insights on maximizing Canadian tax benefits",
        "A roadmap to achieve tax-smart financial growth",
        "Other"
      ],
      correctAnswer: null
    }
  ]
}

export default function GetStarted() {
  const [showIntro, setShowIntro] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(new Array(funnelData.questions.length).fill(null))
  const [isVisible, setIsVisible] = useState(false)
  const [direction, setDirection] = useState(0)
  const router = useRouter()

  const currentQuestion = funnelData.questions[currentQuestionIndex]
  const totalQuestions = funnelData.questions.length

  useEffect(() => {
    const link = document.createElement("link")
    link.href = fontUrl
    link.rel = "stylesheet"
    document.head.appendChild(link)

    // Show intro for a few seconds before starting the quiz
    const timer = setTimeout(() => {
      setShowIntro(false)
      setIsVisible(true)
    }, 3000) // Show intro for 3 seconds

    return () => {
      document.head.removeChild(link)
      clearTimeout(timer)
    }
  }, [])

  const handleAnswerChange = (value: string) => {
    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentQuestionIndex] = value
    setSelectedAnswers(newSelectedAnswers)
  }

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setDirection(1)
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      handleFinish()
    }
  }

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1)
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    } else {
      router.push('/')
    }
  }

  const handleFinish = () => {
    console.log("Quiz finished. Selected answers:", selectedAnswers)
    // Navigate to the dashboard page
    router.push('/dashboard')
  }

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white" style={{ fontFamily: 'circe, sans-serif' }}>
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        {showIntro ? (
          <IntroPage />
        ) : (
          <Card className={`w-full max-w-2xl bg-white-100 bg-opacity-60 border-none transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <CardContent className="p-6 bg-transparent">
              <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
                <div className="w-full space-y-6 relative overflow-hidden">
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                      key={currentQuestionIndex}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                      }}
                      className="absolute w-full"
                    >
                      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">{currentQuestion.sentence}</h2>
                      
                      {/* Mobile-optimized RadioGroup */}
                      <RadioGroup
                        value={selectedAnswers[currentQuestionIndex] || ""}
                        onValueChange={handleAnswerChange}
                        className="space-y-2"
                      >
                        {currentQuestion.options.map((option) => (
                          <div
                            key={option}
                            className={`relative flex items-center p-3 rounded-lg
                              ${
                                selectedAnswers[currentQuestionIndex] === option
                                  ? "bg-teal-100 border-2 border-teal-500"
                                  : "bg-transparent border border-gray-300"
                              }`}
                          >
                            <RadioGroupItem value={option} id={option} className="absolute left-2 top-1/2 -translate-y-1/2" />
                            <Label
                              htmlFor={option}
                              className="pl-6 cursor-pointer flex-grow text-sm font-medium"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      
      {/* Fixed bottom navigation bar */}
      {!showIntro && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center">
          <Button
            onClick={handleBack}
            variant="ghost"
            className="text-gray-600"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div className="flex space-x-1">
            {funnelData.questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentQuestionIndex ? 'bg-teal-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <Button
            onClick={handleNext}
            variant="ghost"
            className="text-gray-600"
          >
            {currentQuestionIndex === totalQuestions - 1 ? "Finish" : <ChevronRight className="w-6 h-6" />}
          </Button>
        </div>
      )}
    </div>
  )
}