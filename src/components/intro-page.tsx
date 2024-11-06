"use client"

import React, { useState, useEffect } from "react"

const fontUrl = "https://use.typekit.net/gcd4kuc.css";

export default function IntroPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [titleIndex, setTitleIndex] = useState(0)

  const titleText = "Welcome to Tax-Efficient Investing"
  const introText = "Ready to grow your wealth while reducing your tax burden? Our strategies are tailored for Canadians who want to keep more of their earnings. Let's start by understanding your financial goals!"

  useEffect(() => {
    const link = document.createElement("link")
    link.href = fontUrl
    link.rel = "stylesheet"
    document.head.appendChild(link)

    // Trigger fade-in animation after component mounts
    setTimeout(() => setIsVisible(true), 100)

    // Start title animation
    const titleInterval = setInterval(() => {
      setTitleIndex(prevIndex => {
        if (prevIndex < titleText.length) {
          return prevIndex + 1
        }
        clearInterval(titleInterval)
        return prevIndex
      })
    }, 50) // Adjust speed of title animation here

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent p-4" style={{ fontFamily: 'circe, sans-serif' }}>
      <div className={`max-w-2xl text-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-4xl font-bold mb-6 text-teal-600 h-16 flex items-center justify-center">
          {titleText.slice(0, titleIndex)}
          {titleIndex < titleText.length && (
            <span className="animate-pulse ml-1 text-teal-600">|</span>
          )}
        </h1>
        <p className="text-xl mb-8 text-gray-700">
          {introText}
        </p>
      </div>
    </div>
  )
}