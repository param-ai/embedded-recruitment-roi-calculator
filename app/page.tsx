"use client"

import { useRef } from "react"
import { ArrowDown } from "lucide-react"
import { RecruitmentCalculator } from "@/components/recruitment-calculator"
import { Button } from "@/components/ui/button"

export default function Home() {
  const calculatorRef = useRef<HTMLDivElement>(null)

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 pb-32 pt-28 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Maximize Your
            <br />
            Recruitment Investment
            <br />
            in Seconds
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-xl font-light text-indigo-100 md:text-2xl">
            Instantly compare recruitment strategies to unlock smarter hiring decisions.
          </p>
          <Button
            size="lg"
            onClick={scrollToCalculator}
            className="bg-gradient-to-r from-orange-400 to-pink-500 px-8 py-6 text-lg font-medium hover:from-orange-500 hover:to-pink-600"
          >
            Try Calculator <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Calculator Section */}
      <section
        ref={calculatorRef}
        className="bg-gradient-to-b from-slate-50 to-slate-100 py-16 dark:from-slate-950 dark:to-slate-900"
      >
        <div className="container mx-auto px-4 py-8">
          <h2 className="mb-2 text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            Recruitment ROI Calculator
          </h2>
          <p className="mb-12 text-center text-lg text-slate-600 dark:text-slate-400">
            Compare traditional recruiting firms vs embedded recruiters
          </p>
          <RecruitmentCalculator />
        </div>
      </section>
    </main>
  )
}

