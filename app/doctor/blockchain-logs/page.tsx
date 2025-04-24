'use client'

import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { TransactionLog } from "@/components/blockchain/transaction-log"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function BlockchainLogsPage() {
  return (
    <DashboardLayout userRole="doctor" userName="Dr. Rajesh Kumar">
      <Card>
        <CardHeader>
          <CardTitle>Transaction Logs</CardTitle>
          <CardDescription>Blockchain records of all your interactions with patient data</CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionLog />
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

