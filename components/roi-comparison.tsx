import { Check, CircleDashed } from "lucide-react"

interface RoiComparisonProps {
  title: string
  description: string
  traditional: {
    cost: number
    time: string
  }
  embedded: {
    recruiters: number
    cost: number
    time: string
    savings: number
    roiPercentage: number
  }
  theme: "indigo" | "purple" // Theme color for highlighting
}

export function RoiComparison({ title, description, traditional, embedded, theme }: RoiComparisonProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Set theme colors based on the theme prop
  const themeColors = {
    indigo: {
      light: "bg-indigo-50 dark:bg-indigo-950/30",
      border: "border-indigo-200 dark:border-indigo-800",
      text: "text-indigo-700 dark:text-indigo-300",
      bg: "bg-indigo-600",
      highlight: "from-indigo-600 to-indigo-700",
    },
    purple: {
      light: "bg-purple-50 dark:bg-purple-950/30",
      border: "border-purple-200 dark:border-purple-800",
      text: "text-purple-700 dark:text-purple-300",
      bg: "bg-purple-600",
      highlight: "from-purple-600 to-purple-700",
    },
  }

  const colors = themeColors[theme]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className={`text-xl font-medium ${colors.text}`}>{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className={`rounded-xl border ${colors.border} p-6 ${colors.light}`}>
          <h4 className="mb-4 text-lg font-medium">Traditional Recruitment</h4>
          <ul className="space-y-4">
            <li className="flex justify-between">
              <span className="text-muted-foreground">Total Cost</span>
              <span className="font-medium">{formatCurrency(traditional.cost)}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Time to Hire</span>
              <span className="font-medium">{traditional.time}</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border-2 border-dashed border-green-400 bg-green-50 p-6 dark:border-green-700 dark:bg-green-950/30">
          <h4 className="mb-4 text-lg font-medium text-green-700 dark:text-green-400">Embedded Recruitment</h4>
          <ul className="space-y-4">
            <li className="flex justify-between">
              <span className="text-muted-foreground">Recruiters Needed</span>
              <span className="font-medium">{embedded.recruiters}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Total Cost</span>
              <span className="font-medium">{formatCurrency(embedded.cost)}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Time to Hire</span>
              <span className="font-medium">{embedded.time}</span>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="relative mt-8 rounded-xl border-0 bg-gradient-to-r p-6 text-white shadow-lg"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fillOpacity='0.05' fillRule='evenodd'/%3E%3C/svg%3E")`,
          background: `linear-gradient(to right, ${theme === "indigo" ? "#4f46e5, #4338ca" : "#9333ea, #7e22ce"})`,
        }}
      >
        {/* Hand-drawn circle highlight effect around the ROI */}
        <div className="absolute -right-3 -top-3 h-28 w-28 animate-pulse">
          <svg viewBox="0 0 100 100" className="h-full w-full" style={{ transform: "rotate(10deg)" }}>
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#FF5757"
              strokeWidth="3"
              strokeDasharray="5,5"
              className="animate-spin-slow"
            />
          </svg>
        </div>

        <h4 className="mb-4 text-lg font-medium">Your ROI with Embedded Recruitment</h4>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="relative">
            <p className="mb-2 text-sm font-medium text-white/80">Total Savings</p>
            <p className="text-3xl font-bold">{formatCurrency(embedded.savings)}</p>
            {embedded.savings > 0 && (
              <CircleDashed className="absolute -right-1 -top-1 h-8 w-8 text-yellow-300 animate-pulse" />
            )}
          </div>
          <div className="relative">
            <p className="mb-2 text-sm font-medium text-white/80">ROI Percentage</p>
            <p className="text-3xl font-bold">{embedded.roiPercentage.toFixed(0)}%</p>
            {embedded.roiPercentage > 0 && (
              <CircleDashed className="absolute -right-1 -top-1 h-8 w-8 text-yellow-300 animate-pulse" />
            )}
          </div>
        </div>

        <div className="mt-6">
          <h5 className="mb-3 font-medium">Key Benefits</h5>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-5 w-5 text-green-300" />
              <span>
                {embedded.savings > 0
                  ? `Save ${formatCurrency(embedded.savings)} compared to traditional recruitment`
                  : "Cost-effective recruitment solution"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-5 w-5 text-green-300" />
              <span>Predictable monthly subscription fee</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-5 w-5 text-green-300" />
              <span>Dedicated recruiters focused on your company's needs</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

