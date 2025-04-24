"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, X } from "lucide-react"

export function AddMedicalRecordForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [medications, setMedications] = useState<string[]>([])
  const [newMedication, setNewMedication] = useState("")

  // Sample patients list
  const patients = [
    { id: "PAT001", name: "Rahul Sharma" },
    { id: "PAT002", name: "Priya Patel" },
    { id: "PAT003", name: "Amit Kumar" },
  ]

  const addMedication = () => {
    if (newMedication.trim()) {
      setMedications([...medications, newMedication.trim()])
      setNewMedication("")
    }
  }

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // In a real app, this would call an API endpoint
    try {
      // Mock success
      setTimeout(() => {
        toast({
          title: "Medical record added",
          description: "The patient's record has been successfully added",
        })
        // Reset form
        event.currentTarget.reset()
        setMedications([])
      }, 1500)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to add record",
        description: "There was a problem adding the medical record",
      })
    } finally {
      setIsLoading(false)
    }
  }

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
            <Select name="patientId" required>
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
              <input id="documentUpload" name="documentUpload" type="file" className="hidden" multiple />
              <Label htmlFor="documentUpload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <span className="text-sm text-muted-foreground mb-2">Drop files here or click to upload</span>
                  <Button type="button" variant="outline" size="sm">
                    Upload Files
                  </Button>
                </div>
              </Label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Adding Record..." : "Add Medical Record"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

