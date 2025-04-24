"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, X } from "lucide-react";
import { useUser } from "@/context/user-context";

export function AddMedicalRecordForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [medications, setMedications] = useState<string[]>([]);
  const [newMedication, setNewMedication] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [patients, setPatients] = useState<{ id: string; name: string }[]>([]);
  const { user } = useUser(); // Assuming you have a user context to get the logged-in user
  const userId = user?.userId;
  const privateKey = user?.privateKey; // NEVER store this in production

  // Reference to the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load patients from localStorage
  useEffect(() => {
    const storedPatients = localStorage.getItem("patients");
    if (storedPatients) {
      setPatients(JSON.parse(storedPatients));
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No patients found in local storage. Please refresh the patient list.",
      });
    }
  }, [toast]);

  const addMedication = () => {
    if (newMedication.trim()) {
      setMedications([...medications, newMedication.trim()]);
      setNewMedication("");
    }
  };

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleUploadClick = () => {
    // Trigger the click event on the hidden file input
    fileInputRef.current?.click();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Create FormData object to hold both file and text fields
      const formData = new FormData();

      // Add all form fields
      formData.append("patientId", selectedPatient);
      formData.append("description", event.currentTarget.diagnosis.value);
      formData.append("privateKey", privateKey || "");

      // Add metadata as JSON string
      const metadata = {
        medications: medications,
        additionalNotes: event.currentTarget.additionalNotes?.value || "",
      };
      formData.append("metadata", JSON.stringify(metadata));

      // Add file (can handle multiple files if needed)
      if (files.length > 0) {
        files.forEach((file) => {
          formData.append("recordFiles", file);
        });
      } else {
        throw new Error("Please select a file to upload");
      }

      const doctorId = userId; // From your authentication context

      // Use the correct endpoint with doctorId
      const response = await fetch(`http://localhost:6420/doctors/addrecord/${doctorId}`, {
        method: "POST",
        // Don't set Content-Type - browser will set it with boundary
        body: formData,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to add record");
      }

      toast({
        title: "Medical record added",
        description: `Record added successfully. IPFS CID: ${result.cid.substring(0, 8)}...`,
      });

      // Reset form
      event.currentTarget.reset();
      setMedications([]);
      setFiles([]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to add record",
        description: error instanceof Error ? error.message : "There was a problem adding the medical record",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Add Medical Record</CardTitle>
        <CardDescription>Create a new medical record for a patient</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="patientId">Patient</Label>
            <Select name="patientId" required onValueChange={setSelectedPatient}>
              <SelectTrigger>
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name} - {patient.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="diagnosis">Diagnosis</Label>
            <Input id="diagnosis" name="diagnosis" placeholder="Enter primary diagnosis" required />
          </div>

          <div className="space-y-2">
            <Label>Prescription</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add medication with dosage"
                value={newMedication}
                onChange={(e) => setNewMedication(e.target.value)}
              />
              <Button type="button" variant="outline" onClick={addMedication}>
                <PlusCircle className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            {medications.length > 0 && (
              <div className="mt-2 space-y-2">
                {medications.map((med, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                    <span>{med}</span>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeMedication(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <input type="hidden" name="medications" value={JSON.stringify(medications)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="documentUpload">Attach Documents</Label>
            <div className="border-2 border-dashed rounded-md p-4 text-center">
              <input
                id="documentUpload"
                name="documentUpload"
                type="file"
                className="hidden"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <Button type="button" variant="outline" size="sm" onClick={handleUploadClick}>
                Upload Files
              </Button>
            </div>
            {files.length > 0 && (
              <div className="mt-2 space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                    <span>{file.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Adding Record..." : "Add Medical Record"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

