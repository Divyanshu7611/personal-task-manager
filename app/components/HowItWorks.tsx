import { CheckCircle, ListTodo, BarChart } from "lucide-react"

const steps = [
  {
    icon: <CheckCircle className="h-12 w-12 text-primary" />,
    title: "Create Tasks",
    description: "Quickly add tasks with details like due dates, priority, and notes.",
  },
  {
    icon: <ListTodo className="h-12 w-12 text-primary" />,
    title: "Organize & Prioritize",
    description: "Drag and drop tasks to reorder, set priorities, and create subtasks.",
  },
  {
    icon: <BarChart className="h-12 w-12 text-primary" />,
    title: "Track Progress",
    description: "Monitor your productivity, complete tasks, and celebrate your achievements.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How TaskMaster Works</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">{step.icon}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-500 dark:text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

