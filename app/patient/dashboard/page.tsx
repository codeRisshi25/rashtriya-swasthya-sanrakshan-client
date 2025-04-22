"use client"

import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionLog } from "@/components/blockchain/transaction-log"
import { ProfileCard } from "@/components/patient/profile-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, File, Calendar, User, FileUp } from "lucide-react"
import { useUser } from "@/context/user-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function PatientDashboard() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  console.log("User:", user)
  
  // Redirect if not logged in or not a patient
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "patient")) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  // Show loading state
  if (isLoading) {
    return (
      <DashboardLayout userRole="patient" userName="Loading...">
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-80" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-[240px]" />
            <div className="grid gap-6 md:col-span-1 lg:col-span-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <Skeleton className="h-[180px]" />
              <Skeleton className="h-[180px]" />
              <Skeleton className="h-[180px]" />
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // If not a patient or not logged in, show a message (will redirect via useEffect)
  if (!user || user.role !== "patient") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Please log in as a patient to view this page</p>
      </div>
    )
  }

  const firstName = user.name.split(" ")[0]
  
  // Mock data - in a real app, this would come from the user object
  const patientData = {
    medicalRecords: 12,
    lastUpdated: "2 days ago",
    sharedWith: 2,
    lastShared: "5 days ago",
    uploadedDocs: 5,
    lastUploaded: "3 days ago"
  }

  return (
    <DashboardLayout userRole="patient" userName={user.name}>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold tracking-tight">Welcome back, {firstName}</h2>
          <p className="text-muted-foreground">
            Manage your medical records, control doctor access, and view your health data
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProfileCard 
            name={user.name} 
            patientId={user.aadharId || "Unknown"} 
            age={user.age || 0} 
            bloodType={user.medicalDetails?.bloodGroup || "Unknown"} 
            gender="Male" // This should also come from the user object
            photoUrl={user.photoUrl}
          />
          <div className="grid gap-6 md:col-span-1 lg:col-span-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Medical Records</CardTitle>
                <CardDescription>Your health documents</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-3xl font-bold">{patientData.medicalRecords}</div>
                <p className="text-xs text-muted-foreground">Last updated {patientData.lastUpdated}</p>
              </CardContent>
              <CardContent className="flex items-center justify-center pt-0">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/patient/medical-records">
                    View Records
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Shared With</CardTitle>
                <CardDescription>Doctors with access</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-3xl font-bold">{patientData.sharedWith}</div>
                <p className="text-xs text-muted-foreground">Last changed {patientData.lastShared}</p>
              </CardContent>
              <CardContent className="flex items-center justify-center pt-0">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/patient/doctor-access">
                    Manage Access
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Uploaded Documents</CardTitle>
                <CardDescription>Your uploaded files</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-3xl font-bold">{patientData.uploadedDocs}</div>
                <p className="text-xs text-muted-foreground">Last uploaded {patientData.lastUploaded}</p>
              </CardContent>
              <CardContent className="flex items-center justify-center pt-0">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/patient/document-upload">
                    Upload More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest updates to your medical records</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionLog />
            </CardContent>
          </Card>
          <Card className="lg:row-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" asChild>
                <Link href="/patient/medical-records">
                  <File className="mr-2 h-4 w-4" />
                  View Medical Records
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link href="/patient/doctor-access">
                  <User className="mr-2 h-4 w-4" />
                  Manage Doctor Access
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link href="/patient/document-upload">
                  <FileUp className="mr-2 h-4 w-4" />
                  Upload Documents
                </Link>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href="/patient/blockchain-logs">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Access Logs
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}