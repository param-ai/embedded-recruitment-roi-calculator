import type { HiringData } from "@/components/recruitment-calculator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Briefcase, DollarSign, Percent } from "lucide-react"

// Update the interface to remove average salary and onSalaryChange
interface HiringInputsProps {
  hiringData: HiringData[]
  onHiringDataChange: (index: number, field: "hires" | "commissionPercentage" | "averageSalary", value: number) => void
  currency?: "INR" | "USD"
}

export function HiringInputs({ hiringData, onHiringDataChange, currency = "INR" }: HiringInputsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium text-indigo-700 dark:text-indigo-300">Department Hiring Details</h3>
        <div className="space-y-6">
          {hiringData.map((dept, index) => {
            // Define color schemes for each department
            const colorSchemes = {
              "Tech & Product":
                "from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 border-blue-200 dark:border-blue-800",
              "Go-to-market":
                "from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 border-emerald-200 dark:border-emerald-800",
              "General & Administrative":
                "from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 border-amber-200 dark:border-amber-800",
              "Executive":
                "from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-200 dark:border-purple-800",
            }

            return (
              <div
                key={dept.department}
                className={`rounded-lg border bg-gradient-to-r p-5 shadow-sm ${colorSchemes[dept.department]}`}
              >
                <h4 className="mb-3 font-medium">{dept.department}</h4>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor={`dept-hires-${index}`} className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" /> Number of Hires
                    </Label>
                    <Input
                      id={`dept-hires-${index}`}
                      type="number"
                      min="0"
                      step="1"
                      value={dept.hires}
                      onChange={(e) => onHiringDataChange(index, "hires", Number.parseInt(e.target.value) || 0)}
                      className="bg-white/80 dark:bg-slate-900/80"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`dept-commission-${index}`} className="flex items-center gap-1">
                      <Percent className="h-4 w-4" /> Commission (%)
                    </Label>
                    <Input
                      id={`dept-commission-${index}`}
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={dept.commissionPercentage}
                      onChange={(e) =>
                        onHiringDataChange(index, "commissionPercentage", Number.parseFloat(e.target.value) || 0)
                      }
                      className="bg-white/80 dark:bg-slate-900/80"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`dept-salary-${index}`} className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" /> Avg. Salary ({currency})
                    </Label>
                    <Input
                      id={`dept-salary-${index}`}
                      type="number"
                      min="0"
                      step={currency === "INR" ? "10000" : "100"}
                      value={dept.averageSalary}
                      onChange={(e) => onHiringDataChange(index, "averageSalary", Number.parseInt(e.target.value) || 0)}
                      className="bg-white/80 dark:bg-slate-900/80"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-800 dark:border-indigo-900 dark:bg-indigo-950/50 dark:text-indigo-300">
        <p>Traditional agency fees typically range from 7% to 30% of annual salary</p>
      </div>
    </div>
  )
}

