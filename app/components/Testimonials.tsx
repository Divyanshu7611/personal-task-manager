import Image from "next/image"

const testimonials = [
  {
    quote:
      "TaskMaster has completely transformed how I manage my daily tasks. It's intuitive, powerful, and keeps me on track.",
    author: "Sarah Johnson",
    title: "Freelance Designer",
  },
  {
    quote:
      "As a busy entrepreneur, TaskMaster has been a game-changer. It helps me prioritize and never miss important deadlines.",
    author: "Michael Chen",
    title: "Startup Founder",
  },
  {
    quote:
      "I love how TaskMaster adapts to my workflow. It's like having a personal assistant that knows exactly what I need to do.",
    author: "Emily Rodriguez",
    title: "Marketing Manager",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800"
            >
              <Image
                src={`/placeholder.svg?height=60&width=60&text=${index + 1}`}
                width={60}
                height={60}
                alt={testimonial.author}
                className="rounded-full mb-4"
              />
              <p className="text-gray-500 dark:text-gray-400 mb-4">"{testimonial.quote}"</p>
              <h4 className="font-bold">{testimonial.author}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

