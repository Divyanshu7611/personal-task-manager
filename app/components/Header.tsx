import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import ThemeSwitcher from "@/lib/ThemeSwitcher"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <CheckCircle className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">TaskMaster</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="#features">Features</Link>
            <Link href="#how-it-works">How It Works</Link>
            <Link href="#testimonials">Testimonials</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <Button variant="ghost" className="mr-2">
              Log in
            </Button>
            <Button>Sign up free</Button>
            <ThemeSwitcher/>

          </nav>
        </div>
      </div>
    </header>
  )
}

