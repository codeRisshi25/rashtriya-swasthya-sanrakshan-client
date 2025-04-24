'use client'

import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { DocumentUploader } from "@/components/patient/document-uploader"
import { useUser } from "@/context/user-context"

export default function DocumentUploadPage() {
  const { user } = useUser()
  const name = user?.name
  return (
    <DashboardLayout userRole="patient" userName={name}>
      <DocumentUploader />
    </DashboardLayout>
  )
}

