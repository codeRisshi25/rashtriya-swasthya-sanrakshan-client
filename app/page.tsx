import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Shield, UserPlus, FileText, Heart, Stethoscope, Building2 } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary fill-primary" />
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-orange-500">Rashtriya</span>{" "}
              <span className="text-white bg-blue-600 px-1 ">Swasthya</span>{" "}
              <span className="text-green-600">Sanrakshan</span>
            </h1>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-primary hover:bg-primary/90">Register</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter text-primary sm:text-5xl xl:text-6xl/none">
                    Secure Healthcare Records for a Healthier India
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    A blockchain-powered platform that puts you in control of your health data while enabling better
                    healthcare delivery and policy decisions.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="gap-1.5 bg-primary hover:bg-primary/90">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      Learn More
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-gray-600">Secure & Private</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <UserPlus className="h-4 w-4 text-primary" />
                    <span className="text-gray-600">Aadhaar Verification</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-gray-600">Complete Records</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[450px] w-[450px] rounded-full bg-blue-100 p-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-[350px] w-[350px] overflow-hidden rounded-full border-8 border-white shadow-lg">
                    <svg 
                      width="400" 
                      height="400" 
                      viewBox="0 0 360 360" 
                      fill="white" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="m-[10px]"
                    >
                    <rect width="400" height="400" fill="#f0f0f0" />
                    </svg>
                  </div>
                  </div>
                  <div className="absolute -right-4 top-1/4 flex h-20 w-60 items-center justify-center rounded-lg bg-primary p-4 text-white shadow-lg">
                  <span className="font-semibold">Secure Blockchain Records</span>
                  </div>
                  <div className="absolute -left-4 bottom-1/4 flex h-20 w-60 items-center justify-center rounded-lg bg-white p-4 shadow-lg">
                    <span className="font-semibold text-primary">Aadhaar Verified Access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
            Our platform connects patients, doctors, and health officials in a secure ecosystem
          </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-blue-100 p-6 shadow-sm bg-white transition-all duration-300 hover:shadow-md hover:border-primary hover:scale-105">
          <div className="rounded-full bg-blue-100 p-3 transition-colors duration-300 group-hover:bg-primary/20">
            <UserPlus className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-primary">For Patients</h3>
          <p className="text-center text-gray-600">
            Control your medical records, grant doctor access, and securely upload documents.
          </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-blue-100 p-6 shadow-sm bg-white transition-all duration-300 hover:shadow-md hover:border-primary hover:scale-105">
          <div className="rounded-full bg-blue-100 p-3 transition-colors duration-300 group-hover:bg-primary/20">
            <Stethoscope className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-primary">For Doctors</h3>
          <p className="text-center text-gray-600">
            Access patient records, add medical notes, and track blockchain transaction logs.
          </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-blue-100 p-6 shadow-sm bg-white transition-all duration-300 hover:shadow-md hover:border-primary hover:scale-105">
          <div className="rounded-full bg-blue-100 p-3 transition-colors duration-300 group-hover:bg-primary/20">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-primary">For Government</h3>
          <p className="text-center text-gray-600">
            View anonymized health trends and statistics for better public health policy decisions.
          </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0 bg-blue-50">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm text-gray-600 md:text-left">
            &copy; {new Date().getFullYear()} Rashtriya Swasthya Sanrakshan. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

