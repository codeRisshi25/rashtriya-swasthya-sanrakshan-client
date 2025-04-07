"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { FileText, PlusCircle, Search, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  lastVisit: Date | null
  condition?: string
}

// Sample patients data
const patients: Patient[] = [
  {
    id: "PAT001",
    name: "Rahul Sharma",
    age: 45,
    gender: "Male",
    lastVisit: new Date(2023, 5, 15),
    condition: "Hypertension",
  },
  {
    id: "PAT002",
    name: "Priya Patel",
    age: 35,
    gender: "Female",
    lastVisit: new Date(2023, 5, 10),
    condition: "Diabetes Type 2",
  },
  {
    id: "PAT003",
    name: "Amit Kumar",
    age: 28,
    gender: "Male",
    lastVisit: new Date(2023, 4, 20),
    condition: "Asthma",
  },
  {
    id: "PAT004",
    name: "Sunita Singh",
    age: 52,
    gender: "Female",
    lastVisit: null,
  },
]

export function PatientList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Patients</CardTitle>
        <CardDescription>Patients who have granted you access to their medical records</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search patients..." className="pl-8" />
          </div>
          <Button asChild>
            <Link href="/doctor/add-record">
              <PlusCircle className="h-4 w-4 mr-1" />
              Add Record
            </Link>
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Age</TableHead>
              <TableHead className="hidden md:table-cell">Gender</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.id}</TableCell>
                <TableCell>
                  {patient.name}
                  {patient.condition && (
                    <div className="md:hidden">
                      <Badge variant="outline" className="mt-1">
                        {patient.condition}
                      </Badge>
                    </div>
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">{patient.age}</TableCell>
                <TableCell className="hidden md:table-cell">{patient.gender}</TableCell>
                <TableCell>
                  {patient.lastVisit ? (
                    patient.lastVisit.toLocaleDateString()
                  ) : (
                    <span className="text-muted-foreground">No visits yet</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/doctor/patients/${patient.id}`}>
                        <User className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button variant="default" size="sm" asChild>
                      <Link href={`/doctor/add-record?patientId=${patient.id}`}>
                        <FileText className="h-4 w-4 mr-1" />
                        Add Record
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

