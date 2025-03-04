"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

// This is a stub component. The actual calendar functionality has been removed
// since react-day-picker was removed from the project dependencies.
// If you need calendar functionality, either reinstall react-day-picker
// or implement an alternative calendar solution.

export type CalendarProps = {
  className?: string
  classNames?: Record<string, string>
  showOutsideDays?: boolean
  [key: string]: any
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <div className={cn("p-3", className)}>
      <div className="text-center p-4">
        <p>Calendar component is disabled.</p>
        <p className="text-sm text-muted-foreground mt-2">
          The react-day-picker dependency has been removed.
        </p>
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
