"use client"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Task } from "@/types/task"

interface TaskCalendarProps {
  tasks: Task[]
}

export function TaskCalendar({ tasks }: TaskCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Create a map of dates to tasks for easier lookup
  const tasksByDate = tasks.reduce((acc, task) => {
    const dateStr = task.dueDate.toDateString()
    if (!acc[dateStr]) {
      acc[dateStr] = []
    }
    acc[dateStr].push(task)
    return acc
  }, {} as Record<string, Task[]>)

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Calendar View</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          modifiers={{
            taskDay: (date) => {
              return tasksByDate[date.toDateString()]?.length > 0
            },
          }}
          modifiersStyles={{
            taskDay: {
              fontWeight: 'bold',
              backgroundColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
            },
          }}
        />
      </CardContent>
    </Card>
  )
}