import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { PatientProfileForm } from "@/components/patient/profile-form"

export default function PatientProfilePage() {
  return (
    <DashboardLayout userRole="patient" userName="Rahul Sharma">
      <PatientProfileForm />
    </DashboardLayout>
  )
}

