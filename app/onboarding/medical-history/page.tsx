import { MedicalHistoryForm } from "@/components/patient/medical-history-form"
import { Heart } from "lucide-react"

export default function MedicalHistoryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary fill-primary" />
            <h1 className="text-xl font-bold tracking-tight text-primary">Rashtriya Swasthya Sanrakshan</h1>
          </div>
          <div className="text-sm text-gray-600">Step 2 of 2: Medical History</div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 bg-blue-50/50">
        <MedicalHistoryForm />
      </main>
    </div>
  )
}

