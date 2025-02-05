"use client"
import { useState } from 'react'
import { StatsCards } from '@/app/components/dashboard/stats-card'
import { TaskCalendar } from '@/app/components/dashboard/task-calendra'
import { TaskList } from '@/app/components/dashboard/task-list'
import { ProgressChart } from '@/app/components/dashboard/progress-chart'
import { Task } from '@/types/task'

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Write and submit the project proposal document',
    priority: 'high',
    dueDate: new Date('2024-03-25'),
    completed: false,
    projectId: '1',
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Review code changes',
    description: 'Review pull requests from team members',
    priority: 'medium',
    dueDate: new Date('2024-03-23'),
    completed: true,
    projectId: '1',
    createdAt: new Date(),
  },
]

function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const completedTasks = tasks.filter(task => task.completed).length
  const upcomingTasks = tasks.filter(task => 
    !task.completed && task.dueDate > new Date()
  ).length
  const overdueTasks = tasks.filter(task =>
    !task.completed && task.dueDate < new Date()
  ).length

  const handleToggleComplete = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    const task: Task = {
      ...newTask,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }
    setTasks([task, ...tasks])
  }

  const handleUpdateTask = (id: string, updatedTask: Omit<Task, 'id' | 'createdAt'>) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, ...updatedTask }
        : task
    ))
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your tasks and track your progress
          </p>
        </div>

        <StatsCards
          totalTasks={tasks.length}
          completedTasks={completedTasks}
          upcomingTasks={upcomingTasks}
          overdueTasks={overdueTasks}
        />

        <div className="grid gap-4 md:grid-cols-7">
          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
          <div className="col-span-3 space-y-4">
            <ProgressChart
              totalTasks={tasks.length}
              completedTasks={completedTasks}
            />
            <TaskCalendar tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard