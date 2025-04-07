"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function MedicalHistoryForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  const commonConditions = [
    { id: "diabetes", label: "Diabetes" },
    { id: "hypertension", label: "Hypertension" },
    { id: "asthma", label: "Asthma" },
    { id: "heart_disease", label: "Heart Disease" },
    { id: "cancer", label: "Cancer" },
    { id: "thyroid", label: "Thyroid Disorder" },
  ]

  const commonVaccines = [
    { id: "covid19", label: "COVID-19" },
    { id: "tetanus", label: "Tetanus" },
    { id: "hepatitisB", label: "Hepatitis B" },
    { id: "influenza", label: "Influenza (Flu)" },
    { id: "mmr", label: "MMR (Measles, Mumps, Rubella)" },
    { id: "polio", label: "Polio" },
  ]

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    // In a real app, this would call an API endpoint to save to Firestore
    try {
      // Mock success
      setTimeout(() => {
        toast({
          title: "Medical history saved",
          description: "Your medical history has been saved successfully",
        })
        router.push("/login")
      }, 1500)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to save",
        description: "There was a problem saving your medical history",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl w-full shadow-lg border-blue-100">
      <CardHeader className="space-y-1 bg-blue-50 rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-primary">Medical History</CardTitle>
        <CardDescription>Please provide your medical information to help us serve you better</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-6 pt-6">
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary">Important</AlertTitle>
            <AlertDescription>
              This information will be securely stored and only shared with healthcare providers you authorize.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                name="height"
                type="number"
                required
                className="border-blue-200 focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                required
                className="border-blue-200 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bloodType">Blood Type</Label>
            <Select name="bloodType">
              <SelectTrigger className="border-blue-200 focus-visible:ring-primary">
                <SelectValue placeholder="Select blood type" />
              </SelectTrigger>
              <SelectContent>
                {bloodTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Do you have any allergies?</Label>
            <RadioGroup defaultValue="no" name="hasAllergies">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="allergies-yes" className="text-primary border-blue-200" />
                <Label htmlFor="allergies-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="allergies-no" className="text-primary border-blue-200" />
                <Label htmlFor="allergies-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="allergiesDetails">If yes, please specify</Label>
            <Textarea
              id="allergiesDetails"
              name="allergiesDetails"
              placeholder="List any allergies..."
              className="border-blue-200 focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-3">
            <Label>Pre-existing medical conditions</Label>
            <div className="grid grid-cols-2 gap-2">
              {commonConditions.map((condition) => (
                <div key={condition.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={condition.id}
                    name="conditions"
                    value={condition.id}
                    className="text-primary border-blue-200"
                  />
                  <Label htmlFor={condition.id}>{condition.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Vaccination History</Label>
            <div className="grid grid-cols-2 gap-2">
              {commonVaccines.map((vaccine) => (
                <div key={vaccine.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={vaccine.id}
                    name="vaccines"
                    value={vaccine.id}
                    className="text-primary border-blue-200"
                  />
                  <Label htmlFor={vaccine.id}>{vaccine.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="medications">Current Medications</Label>
            <Textarea
              id="medications"
              name="medications"
              placeholder="List any medications you're currently taking..."
              className="border-blue-200 focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="surgeries">Previous Surgeries</Label>
            <Textarea
              id="surgeries"
              name="surgeries"
              placeholder="List any surgeries you've had with approximate dates..."
              className="border-blue-200 focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="familyHistory">Family Medical History</Label>
            <Textarea
              id="familyHistory"
              name="familyHistory"
              placeholder="Any significant medical conditions in your immediate family..."
              className="border-blue-200 focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Emergency Contact</Label>
            <Input
              id="emergencyContact"
              name="emergencyContact"
              placeholder="Name and phone number"
              className="border-blue-200 focus-visible:ring-primary"
            />
          </div>
        </CardContent>
        <CardFooter className="bg-blue-50 rounded-b-lg">
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
            {isLoading ? "Saving..." : "Complete Registration"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

