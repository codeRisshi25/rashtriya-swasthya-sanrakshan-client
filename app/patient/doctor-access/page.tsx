import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { DoctorAccessManager } from "@/components/patient/doctor-access-manager"

export default function DoctorAccessPage() {
  return (
    <DashboardLayout userRole="patient" userName="Rahul Sharma">
      <DoctorAccessManager />
    </DashboardLayout>
  )
}

