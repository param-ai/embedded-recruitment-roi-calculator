"use client"

import { useState } from "react"
import { Clock, DollarSign, TrendingUp, Users, Briefcase } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { HiringInputs } from "@/components/hiring-inputs"
import { ResultsSummary } from "@/components/results-summary"
import { RoiComparison } from "@/components/roi-comparison"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

// Update the HiringData interface to include average salary per department
export interface HiringData {
  department: Department
  hires: number
  commissionPercentage: number
  averageSalary: number
}

export type Department = "Tech & Product" | "Go-to-market" | "General & Administrative" | "Executive"

export function RecruitmentCalculator() {
  // Initialize state variables with department-specific salaries
  const [hiringData, setHiringData] = useState<HiringData[]>([
    { department: "Tech & Product", hires: 0, commissionPercentage: 20, averageSalary: 1500000 },
    { department: "Go-to-market", hires: 0, commissionPercentage: 15, averageSalary: 1200000 },
    { department: "General & Administrative", hires: 0, commissionPercentage: 10, averageSalary: 900000 },
    { department: "Executive", hires: 0, commissionPercentage: 25, averageSalary: 3000000 },
  ])

  const [calculated, setCalculated] = useState<boolean>(false)
  const [monthlySubscriptionFee, setMonthlySubscriptionFee] = useState<number>(200000)
  const [manualRecruiters, setManualRecruiters] = useState<number | null>(null)

  const totalHires = hiringData.reduce((sum, dept) => sum + dept.hires, 0)

  // Update calculations to use department-specific salaries
  const totalSalaries = hiringData.reduce((sum, dept) => {
    return sum + dept.hires * dept.averageSalary
  }, 0)

  const totalCommission = hiringData.reduce((sum, dept) => {
    return sum + dept.hires * dept.averageSalary * (dept.commissionPercentage / 100)
  }, 0)

  // Embedded recruiter calculations - fixed values
  const hiresPerRecruiter = 4
  const targetMonths = 4

  // Time-based ROI (4 months)
  // Calculate how many hires we need to make per month to complete in 4 months
  const hiresPerMonth = totalHires / targetMonths
  // Calculate how many recruiters we need to achieve that monthly hire rate
  const calculatedRecruitersNeeded = Math.ceil(hiresPerMonth / hiresPerRecruiter)
  const recruitersNeededForTime = manualRecruiters !== null ? manualRecruiters : calculatedRecruitersNeeded
  const timeBasedCost = recruitersNeededForTime * monthlySubscriptionFee * targetMonths
  const timeBasedSavings = totalCommission - timeBasedCost
  const timeBasedRoiPercentage = totalCommission > 0 ? (timeBasedSavings / totalCommission) * 100 : 0

  // Finance-based ROI (1 recruiter)
  const monthsNeededForOneRecruiter = Math.ceil(totalHires / hiresPerRecruiter)
  const financeBasedCost = monthlySubscriptionFee * monthsNeededForOneRecruiter
  const financeBasedSavings = totalCommission - financeBasedCost
  const financeBasedRoiPercentage = totalCommission > 0 ? (financeBasedSavings / totalCommission) * 100 : 0

  // Update the handleHiringDataChange function to handle all fields
  const handleHiringDataChange = (
    index: number,
    field: "hires" | "commissionPercentage" | "averageSalary",
    value: number,
  ) => {
    const newData = [...hiringData]
    newData[index][field] = value
    setHiringData(newData)
  }

  const handleSubscriptionFeeChange = (value: number) => {
    setMonthlySubscriptionFee(value)
  }

  const handleManualRecruitersChange = (value: number | null) => {
    setManualRecruiters(value)
  }

  const handleCalculate = () => {
    setCalculated(true)
  }

  // Update the handleReset function
  const handleReset = () => {
    setHiringData([
      { department: "Tech & Product", hires: 0, commissionPercentage: 20, averageSalary: 1500000 },
      { department: "Go-to-market", hires: 0, commissionPercentage: 15, averageSalary: 1200000 },
      { department: "General & Administrative", hires: 0, commissionPercentage: 10, averageSalary: 900000 },
      { department: "Executive", hires: 0, commissionPercentage: 25, averageSalary: 3000000 },
    ])
    setMonthlySubscriptionFee(200000)
    setManualRecruiters(null)
    setCalculated(false)
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Card className="mb-8 border border-indigo-200 shadow-lg dark:border-indigo-900">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
          <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
            <Users className="h-5 w-5" />
            Hiring Requirements
          </CardTitle>
          <CardDescription>Enter your hiring needs and current recruitment costs</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <HiringInputs hiringData={hiringData} onHiringDataChange={handleHiringDataChange} />
          
          {/* Total Hires Summary */}
          {totalHires > 0 && (
            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-900/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-medium text-amber-700 dark:text-amber-400">
                  <Briefcase className="h-5 w-5" />
                  <span>Total Hiring Plan:</span>
                </div>
                <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
                  {totalHires} {totalHires === 1 ? 'position' : 'positions'}
                </span>
              </div>
            </div>
          )}
          
          {/* Recruitment Staffing Plan */}
          <div className="mt-8 space-y-6">
            <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-300">Embedded Recruiter Planning</h3>
            <div className="rounded-lg border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-5 shadow-sm dark:border-indigo-800 dark:from-indigo-950/30 dark:to-purple-950/30">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="subscription-fee" className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" /> Monthly Subscription Fee per Embedded Recruiter (INR)
                  </Label>
                  <Input
                    id="subscription-fee"
                    type="number"
                    min="0"
                    step="10000"
                    value={monthlySubscriptionFee}
                    onChange={(e) => handleSubscriptionFeeChange(Number.parseInt(e.target.value) || 200000)}
                    className="bg-white/80 dark:bg-slate-900/80"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manual-recruiters" className="flex items-center gap-1">
                    <Users className="h-4 w-4" /> Number of Embedded Recruiters (Optional)
                  </Label>
                  <div className="flex gap-4">
                    <Input
                      id="manual-recruiters"
                      type="number"
                      min="1"
                      step="1"
                      value={manualRecruiters === null ? '' : manualRecruiters}
                      onChange={(e) => 
                        e.target.value === '' 
                          ? handleManualRecruitersChange(null) 
                          : handleManualRecruitersChange(Number.parseInt(e.target.value) || 1)
                      }
                      placeholder={`Auto: ${calculatedRecruitersNeeded}`}
                      className="bg-white/80 dark:bg-slate-900/80"
                    />
                    {manualRecruiters !== null && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleManualRecruitersChange(null)}
                        className="h-10"
                      >
                        Reset
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Leave empty to calculate based on target of {targetMonths} months ({hiresPerRecruiter} hires per recruiter per month).
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button
              onClick={handleCalculate}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              Calculate ROI
            </Button>
          </div>
        </CardContent>
      </Card>

      {calculated && totalHires > 0 && (
        <>
          <ResultsSummary
            totalHires={totalHires}
            totalSalaries={totalSalaries}
            totalCommission={totalCommission}
            hiringData={hiringData}
          />

          <Card className="mb-8 mt-8 overflow-hidden border-2 border-purple-500 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                ROI Comparison
              </CardTitle>
              <CardDescription className="text-purple-100">
                See how embedded recruiters can save you time and money
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="time" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-slate-100 dark:bg-slate-800">
                  <TabsTrigger
                    value="time"
                    className="flex items-center gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                  >
                    <Clock className="h-4 w-4" /> Time Optimized
                  </TabsTrigger>
                  <TabsTrigger
                    value="finance"
                    className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                  >
                    <DollarSign className="h-4 w-4" /> Cost Optimized
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="time">
                  <RoiComparison
                    title="Time-Optimized Approach"
                    description={
                      `Complete all ${totalHires} hires in ${targetMonths} months with ${recruitersNeededForTime} embedded recruiter${recruitersNeededForTime > 1 ? 's' : ''} ` + 
                      `(${(totalHires / targetMonths).toFixed(1)} hires/month, ${hiresPerRecruiter} hires per recruiter per month)`
                    }
                    traditional={{
                      cost: totalCommission,
                      time: "Variable (typically 6-12 months)",
                    }}
                    embedded={{
                      recruiters: recruitersNeededForTime,
                      cost: timeBasedCost,
                      time: `${targetMonths}-${targetMonths + 2} months`,
                      savings: timeBasedSavings,
                      roiPercentage: timeBasedRoiPercentage,
                    }}
                    theme="indigo"
                  />
                </TabsContent>
                <TabsContent value="finance">
                  <RoiComparison
                    title="Cost-Optimized Approach"
                    description={
                      `Use 1 embedded recruiter for maximum cost efficiency (₹${(monthlySubscriptionFee/100000).toFixed(1)} lakh/month)` +
                      ` - completes all ${totalHires} hires in ${monthsNeededForOneRecruiter} months`
                    }
                    traditional={{
                      cost: totalCommission,
                      time: "Variable (typically 6-12 months)",
                    }}
                    embedded={{
                      recruiters: 1,
                      cost: financeBasedCost,
                      time: `${monthsNeededForOneRecruiter} months`,
                      savings: financeBasedSavings,
                      roiPercentage: financeBasedRoiPercentage,
                    }}
                    theme="purple"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}

      {/* Footer with tidyhire.app branding */}
      <footer className="mt-12 text-center">
        <div className="flex items-center justify-center gap-2 text-slate-500">
          <span>Powered by</span>
          <a 
            href="https://tidyhire.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-medium text-indigo-600 transition-colors hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            tidyhire.app
          </a>
        </div>
      </footer>
    </div>
  )
}

