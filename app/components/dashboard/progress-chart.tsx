import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProgressChartProps {
  totalTasks: number
  completedTasks: number
}

export function ProgressChart({ totalTasks, completedTasks }: ProgressChartProps) {
  const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-sm text-muted-foreground">
            {completedTasks} of {totalTasks} tasks completed ({Math.round(progressPercentage)}%)
          </p>
        </div>
      </CardContent>
    </Card>
  )
}