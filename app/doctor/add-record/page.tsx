'use client'

import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { AddMedicalRecordForm } from "@/components/doctor/add-medical-record-form"

export default function AddRecordPage() {
  return (
    <DashboardLayout userRole="doctor" userName="Dr. Rajesh Kumar">
      <AddMedicalRecordForm />
    </DashboardLayout>
  )
}

