"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Transaction {
  id: string
  timestamp: Date
  action: string
  actor: string
  actorRole: string
  details: string
}

// Sample transaction data
const transactions: Transaction[] = [
  {
    id: "tx_001",
    timestamp: new Date(2023, 5, 15, 9, 30),
    action: "View",
    actor: "Dr. Rajesh Kumar",
    actorRole: "Doctor",
    details: "Viewed patient medical history",
  },
  {
    id: "tx_002",
    timestamp: new Date(2023, 5, 15, 10, 45),
    action: "Update",
    actor: "Dr. Rajesh Kumar",
    actorRole: "Doctor",
    details: "Added new diagnosis: Seasonal allergies",
  },
  {
    id: "tx_003",
    timestamp: new Date(2023, 5, 15, 10, 50),
    action: "Update",
    actor: "Dr. Rajesh Kumar",
    actorRole: "Doctor",
    details: "Prescribed medication: Cetirizine 10mg",
  },
  {
    id: "tx_004",
    timestamp: new Date(2023, 5, 16, 14, 20),
    action: "Upload",
    actor: "Patient",
    actorRole: "Self",
    details: "Uploaded document: Blood test results",
  },
  {
    id: "tx_005",
    timestamp: new Date(2023, 5, 18, 11, 15),
    action: "View",
    actor: "Dr. Priya Sharma",
    actorRole: "Doctor",
    details: "Viewed patient prescriptions",
  },
]

export function TransactionLog() {
  const [visibleTransactions, setVisibleTransactions] = useState(transactions.slice(0, 3))
  const [showAll, setShowAll] = useState(false)

  const toggleShowAll = () => {
    if (showAll) {
      setVisibleTransactions(transactions.slice(0, 3))
    } else {
      setVisibleTransactions(transactions)
    }
    setShowAll(!showAll)
  }

  const getActionBadge = (action: string) => {
    switch (action) {
      case "View":
        return <Badge variant="outline">View</Badge>
      case "Update":
        return <Badge variant="default">Update</Badge>
      case "Upload":
        return <Badge variant="secondary">Upload</Badge>
      default:
        return <Badge variant="outline">{action}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blockchain Transaction Log</CardTitle>
        <CardDescription>Immutable record of all activities on your medical data</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead className="hidden md:table-cell">Details</TableHead>
              <TableHead className="text-right">Transaction ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleTransactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-medium">{format(tx.timestamp, "MMM dd, yyyy HH:mm")}</TableCell>
                <TableCell>{getActionBadge(tx.action)}</TableCell>
                <TableCell>
                  {tx.actor}
                  <div className="text-xs text-muted-foreground">{tx.actorRole}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{tx.details}</TableCell>
                <TableCell className="text-right font-mono text-xs">{tx.id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-center">
          <Button variant="outline" onClick={toggleShowAll}>
            {showAll ? "Show Less" : "Show All Transactions"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

