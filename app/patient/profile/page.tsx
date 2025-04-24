'use client'

import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { PatientProfileForm } from "@/components/patient/profile-form"
import { useUser } from "@/context/user-context"

export default function PatientProfilePage() {
  const { user } = useUser()
  const name = user?.name
  return (
    <DashboardLayout userRole="patient" userName={name}>
      <PatientProfileForm />
    </DashboardLayout>
  )
}

