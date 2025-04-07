import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { MedicalRecordsViewer } from "@/components/patient/medical-records-viewer"

export default function MedicalRecordsPage() {
  return (
    <DashboardLayout userRole="patient" userName="Rahul Sharma">
      <MedicalRecordsViewer />
    </DashboardLayout>
  )
}

