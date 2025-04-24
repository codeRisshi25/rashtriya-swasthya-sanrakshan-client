'use client'

import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { TransactionLog } from "@/components/blockchain/transaction-log"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@/context/user-context"

export default function BlockchainLogsPage() {
  const { user, isLoading } = useUser()
  const name = user?.name
  return (
    <DashboardLayout userRole="patient" userName={name}>
      <Card>
        <CardHeader>
          <CardTitle>Blockchain Access Logs</CardTitle>
          <CardDescription>Immutable record of all access and modifications to your medical data</CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionLog />
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

