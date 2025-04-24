'use client'

import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { DoctorAccessManager } from "@/components/patient/doctor-access-manager"
import { useUser } from "@/context/user-context"

export default function DoctorAccessPage() {
  const { user } = useUser()
  const name = user?.name
  return (
    <DashboardLayout userRole="patient" userName={name}>
      <DoctorAccessManager />
    </DashboardLayout>
  )
}

