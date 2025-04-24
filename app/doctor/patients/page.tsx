'use client'

import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { PatientList } from "@/components/doctor/patient-list"

export default function PatientsPage() {
  return (
    <DashboardLayout userRole="doctor" userName="Dr. Rajesh Kumar">
      <PatientList />
    </DashboardLayout>
  )
}

