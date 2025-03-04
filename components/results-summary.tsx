import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Percent, Users, Wallet } from "lucide-react"

interface HiringData {
  department: string
  hires: number
  commissionPercentage: number
  averageSalary: number
}

interface ResultsSummaryProps {
  totalHires: number
  totalSalaries: number
  totalCommission: number
  hiringData: HiringData[]
}

export function ResultsSummary({ totalHires, totalSalaries, totalCommission, hiringData }: ResultsSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Calculate weighted average commission percentage
  const weightedAvgCommission =
    hiringData.reduce((sum, dept) => {
      return sum + dept.hires * dept.commissionPercentage
    }, 0) / (totalHires || 1)

  return (
    <Card className="mb-8 overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Traditional Recruitment Summary
        </CardTitle>
        <CardDescription className="text-amber-100">
          Your current recruitment costs with traditional agencies
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 dark:from-amber-950 dark:to-orange-950">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-4 shadow-md dark:bg-slate-800">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Users className="h-4 w-4 text-amber-500" /> Total Hires
            </div>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{totalHires}</div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md dark:bg-slate-800">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Wallet className="h-4 w-4 text-orange-500" /> Total Salaries
            </div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {formatCurrency(totalSalaries)}
            </div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md dark:bg-slate-800">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Percent className="h-4 w-4 text-amber-500" /> Avg. Commission
            </div>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {weightedAvgCommission.toFixed(1)}%
            </div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md dark:bg-slate-800">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Wallet className="h-4 w-4 text-orange-500" /> Total Commission
            </div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {formatCurrency(totalCommission)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

