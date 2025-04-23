"use client"

import { useState , useEffect } from "react"
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
import { useUser } from "@/context/user-context"

interface Doctor {
  id: string
  name: string
  specialty: string
  hospital: string
  accessGrantedOn: Date
}


export function DoctorAccessManager() {
  const { toast } = useToast()
  const [authorizedDoctors, setAuthorizedDoctors] = useState<Doctor[]>([])
  const [doctorId, setDoctorId] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)


  const { user } = useUser()
  const userWalletAddress = user?.walletAddress;
  const userId = user?.id;


  const fetchAuthorizedDoctors = async () => {
    try {
      const response = await fetch(`http://localhost:6420/access/doctors?uid=${userId}`, {
        method: "GET",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch authorized doctors")
      }
      const data = await response.json()
      setAuthorizedDoctors(data.doctors)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch authorized doctors",
      })
    }
  }

  useEffect(() => {
    fetchAuthorizedDoctors()
  }, [])

  const handleAddDoctor = async () => {
    if (!doctorId.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid Doctor ID",
      })
      return
    }

    try {
      // Send request to backend to grant access
      const response = await fetch("http://localhost:6420/access/grant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: userWalletAddress,
          doctorId: doctorId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to grant access")
      }

      const data = await response.json();
      const newDoctor: Doctor = data.doctor;
      
      // Add the doctor to the list
      setAuthorizedDoctors([...authorizedDoctors, newDoctor]);
      setDoctorId("");
      setIsDialogOpen(false);

      toast({
        title: "Doctor added",
        description: `${data.name} now has access to your medical records`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to grant access",
      })
    }
  }

  const handleRevokeAccess = async (doctorId: string) => {
    try {
      // Send request to backend to revoke access
      const response = await fetch("http://localhost:6420/access/revoke", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: userWalletAddress,
          doctorId: doctorId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to revoke access")
      }

      // Remove doctor from the list
      setAuthorizedDoctors(authorizedDoctors.filter((doctor) => doctor.id !== doctorId))

      toast({
        title: "Access revoked",
        description: "The doctor no longer has access to your records",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to revoke access",
      })
    }
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

