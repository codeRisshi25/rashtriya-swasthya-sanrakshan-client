import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { TransactionLog } from "@/components/blockchain/transaction-log"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function BlockchainLogsPage() {
  return (
    <DashboardLayout userRole="patient" userName="Rahul Sharma">
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

