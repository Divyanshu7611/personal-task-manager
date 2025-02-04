import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Master Your Tasks?</h2>
            <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
              Join thousands of productive individuals and start organizing your life with TaskMaster today. Sign up for
              free and experience the difference!
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <Button className="w-full h-11 px-8" variant="secondary">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-xs text-primary-foreground/60">No credit card required</p>
          </div>
        </div>
      </div>
    </section>
  )
}

