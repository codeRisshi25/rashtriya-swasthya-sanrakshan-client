import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { DocumentUploader } from "@/components/patient/document-uploader"

export default function DocumentUploadPage() {
  return (
    <DashboardLayout userRole="patient" userName="Rahul Sharma">
      <DocumentUploader />
    </DashboardLayout>
  )
}

