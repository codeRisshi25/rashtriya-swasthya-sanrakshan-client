'use client'

import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { HealthTrendsDashboard } from "@/components/gov/health-trends-dashboard"

export default function GovernmentDashboard() {
  return (
    <DashboardLayout userRole="government" userName="Ministry Official">
      <HealthTrendsDashboard />
    </DashboardLayout>
  )
}

