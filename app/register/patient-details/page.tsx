import { PatientRegistrationForm } from "@/components/auth/patient-registration-form"

export default function PatientDetailsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight">Rashtriya Swasthya Sanrakshan</h1>
          </div>
          <div className="text-sm text-muted-foreground">Step 1 of 2: Personal Information</div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <PatientRegistrationForm />
      </main>
    </div>
  )
}

