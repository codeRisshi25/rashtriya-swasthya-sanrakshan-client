"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { FileText, PlusCircle, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/user-context";

interface Patient {
  userId: string;
  name: string;
  age: number;
  gender: string;
}

export function PatientList() {
  const { toast } = useToast();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoading: userLoading } = useUser();
  const userId = user?.userId;
  // Fetch patients from API and store in localStorage
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const doctorId = userId; // Assuming doctor ID is stored in localStorage
        if (!doctorId) {
          throw new Error("Doctor ID is missing");
        }
        const response = await fetch(`http://localhost:6420/doctors/access/patients/${doctorId}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }

        const data = await response.json();
        const filteredPatients = data.patients.map((patient: any) => ({
          id: patient.id,
          name: patient.name,
          age: patient.age,
          gender: patient.gender,
        }));

        setPatients(filteredPatients);
        localStorage.setItem("patients", JSON.stringify(filteredPatients));
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to fetch patients",
        });
      } finally {
        setIsLoading(false);
      }
    };

    const storedPatients = localStorage.getItem("patients");
    if (storedPatients) {
      setPatients(JSON.parse(storedPatients));
      setIsLoading(false);
    } else {
      fetchPatients();
    }
  }, [toast]);

  if (isLoading) {
    return <p>Loading patients...</p>;
  }

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
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell className="hidden md:table-cell">{patient.age}</TableCell>
                <TableCell className="hidden md:table-cell">{patient.gender}</TableCell>
                <TableCell className="text-right">
                  <Button variant="default" size="sm" asChild>
                    <Link href={`/doctor/add-record?patientId=${patient.id}`}>
                      <FileText className="h-4 w-4 mr-1" />
                      Add Record
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}