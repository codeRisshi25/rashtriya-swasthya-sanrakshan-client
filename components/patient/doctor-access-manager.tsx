"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

interface Doctor {
  id: string
  name: string
  specialty: string
  hospital: string
  accessGrantedOn: Date
}

// Sample doctor data
const doctors: Doctor[] = [
  {
    id: "DOC001",
    name: "Dr. Rajesh Kumar",
    specialty: "Cardiology",
    hospital: "City General Hospital",
    accessGrantedOn: new Date(2023, 4, 10),
  },
  {
    id: "DOC002",
    name: "Dr. Priya Sharma",
    specialty: "Neurology",
    hospital: "Medical Institute of India",
    accessGrantedOn: new Date(2023, 5, 15),
  },
]

export function DoctorAccessManager() {
  const { toast } = useToast()
  const [authorizedDoctors, setAuthorizedDoctors] = useState<Doctor[]>(doctors)
  const [doctorId, setDoctorId] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddDoctor = () => {
    if (!doctorId.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid Doctor ID",
      })
      return
    }

    // In a real app, this would verify the doctor ID against a database
    // For demo purposes, we'll simulate adding a new doctor
    const newDoctor: Doctor = {
      id: doctorId,
      name: "Dr. Amit Patel",
      specialty: "General Medicine",
      hospital: "Community Health Center",
      accessGrantedOn: new Date(),
    }

    setAuthorizedDoctors([...authorizedDoctors, newDoctor])
    setDoctorId("")
    setIsDialogOpen(false)

    toast({
      title: "Doctor added",
      description: `Dr. Amit Patel now has access to your medical records`,
    })
  }

  const handleRevokeAccess = (doctorId: string) => {
    setAuthorizedDoctors(authorizedDoctors.filter((doctor) => doctor.id !== doctorId))

    toast({
      title: "Access revoked",
      description: "The doctor no longer has access to your records",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctor Access Management</CardTitle>
        <CardDescription>Control which doctors have access to your medical records</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Grant Access to Doctor</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Grant Access</DialogTitle>
                <DialogDescription>
                  Enter the Doctor ID or scan QR code to grant access to your medical records.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Input
                    id="doctorId"
                    placeholder="Enter Doctor ID"
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                  />
                  <div className="text-center text-sm text-muted-foreground">or</div>
                  <div className="border-2 border-dashed rounded-md p-8 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      Scan QR Code
                      <br />
                      (Camera functionality would be implemented here)
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddDoctor}>Grant Access</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead className="hidden md:table-cell">Specialty</TableHead>
              <TableHead className="hidden md:table-cell">Hospital</TableHead>
              <TableHead>Access Since</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {authorizedDoctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell className="font-medium">
                  {doctor.name}
                  <div className="text-xs text-muted-foreground md:hidden">{doctor.specialty}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{doctor.specialty}</TableCell>
                <TableCell className="hidden md:table-cell">{doctor.hospital}</TableCell>
                <TableCell>{doctor.accessGrantedOn.toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button variant="destructive" size="sm" onClick={() => handleRevokeAccess(doctor.id)}>
                    Revoke
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {authorizedDoctors.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No doctors have been granted access yet</div>
        )}
      </CardContent>
    </Card>
  )
}

