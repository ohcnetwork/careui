import React from 'react'
import { type ComponentDoc } from '@/lib/types'
import { Calendar } from '@/components/ui/calendar'

export const calendarDoc: ComponentDoc = {
  id: 'calendar',
  name: 'Calendar',
  description: 'A date field component that allows users to enter and edit date.',
  installation: {
    cli: 'npx shadcn@latest add calendar',
    manual: 'Copy and paste the calendar component source code into your project.'
  },
  usage: `import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

export function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}`,
  preview: {
    code: `<Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />`,
    component: React.createElement(Calendar, { mode: 'single', className: 'rounded-md border' })
  }
}
