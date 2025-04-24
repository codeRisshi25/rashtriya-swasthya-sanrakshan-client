'use client'

import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { MedicalRecordsViewer } from "@/components/patient/medical-records-viewer"
import { useUser } from "@/context/user-context"

export default function MedicalRecordsPage() {
    const { user } = useUser()
    const name = user?.name
  return (
    <DashboardLayout userRole="patient" userName={name}>
      <MedicalRecordsViewer />
    </DashboardLayout>
  )
}

