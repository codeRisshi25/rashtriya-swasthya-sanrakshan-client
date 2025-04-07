import { LoginForm } from "@/components/auth/login-form"
import { Heart } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-blue-50/50">
      <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary fill-primary" />
            <h1 className="text-xl font-bold tracking-tight text-primary">Rashtriya Swasthya Sanrakshan</h1>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <LoginForm />
      </main>
    </div>
  )
}

