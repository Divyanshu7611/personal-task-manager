import { CheckCircle, Calendar, Bell, Zap, Users, Lock } from "lucide-react"

const features = [
  {
    icon: <CheckCircle className="h-10 w-10 text-primary" />,
    title: "Intuitive Task Management",
    description: "Create, organize, and prioritize tasks with ease using our user-friendly interface.",
  },
  {
    icon: <Calendar className="h-10 w-10 text-primary" />,
    title: "Smart Scheduling",
    description: "Automatically schedule your tasks based on due dates, priority, and available time slots.",
  },
  {
    icon: <Bell className="h-10 w-10 text-primary" />,
    title: "Customizable Reminders",
    description: "Set personalized reminders to stay on top of your tasks and never miss a deadline.",
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Productivity Analytics",
    description: "Gain insights into your productivity patterns and improve your time management skills.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Collaboration Tools",
    description: "Share tasks and projects with team members or family for seamless cooperation.",
  },
  {
    icon: <Lock className="h-10 w-10 text-primary" />,
    title: "Secure & Private",
    description: "Your data is protected with end-to-end encryption and stringent privacy measures.",
  },
]

export default function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Powerful Features for Effortless Productivity
        </h2>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800"
            >
              {feature.icon}
              <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

