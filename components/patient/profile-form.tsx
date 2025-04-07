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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, User } from "lucide-react"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function PatientProfileForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState<Date>()

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    // In a real app, this would call an API endpoint
    try {
      // Mock success
      setTimeout(() => {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully",
        })
        router.push("/patient/dashboard")
      }, 1500)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to update",
        description: "There was a problem updating your profile",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Patient Profile</CardTitle>
        <CardDescription>Manage your personal and medical information</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="medical">Medical Information</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6 mt-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border">
                  <User className="h-12 w-12 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Rahul Sharma</h3>
                  <p className="text-muted-foreground">Patient ID: PAT001</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Change Photo
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" name="fullName" defaultValue="Rahul Sharma" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <RadioGroup defaultValue="male" name="gender">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" defaultValue="rahul.sharma@example.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" defaultValue="+91 98765 43210" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input id="emergencyContact" name="emergencyContact" defaultValue="+91 87654 32109" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" name="address" defaultValue="123 Main Street, Mumbai, Maharashtra, 400001" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="medical" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input id="height" name="height" type="number" defaultValue="175" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input id="weight" name="weight" type="number" defaultValue="70" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <Select name="bloodType" defaultValue="B+">
                    <SelectTrigger>
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
                  <RadioGroup defaultValue="yes" name="hasAllergies">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="allergies-yes" />
                      <Label htmlFor="allergies-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="allergies-no" />
                      <Label htmlFor="allergies-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="allergiesDetails">Allergies Details</Label>
                  <Textarea
                    id="allergiesDetails"
                    name="allergiesDetails"
                    placeholder="List any allergies..."
                    defaultValue="Peanuts, Penicillin"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="medications">Current Medications</Label>
                  <Textarea
                    id="medications"
                    name="medications"
                    placeholder="List any medications you're currently taking..."
                    defaultValue="Amlodipine 5mg - Once daily"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="surgeries">Previous Surgeries</Label>
                  <Textarea
                    id="surgeries"
                    name="surgeries"
                    placeholder="List any surgeries you've had with approximate dates..."
                    defaultValue="Appendectomy - 2015"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="familyHistory">Family Medical History</Label>
                  <Textarea
                    id="familyHistory"
                    name="familyHistory"
                    placeholder="Any significant medical conditions in your immediate family..."
                    defaultValue="Father - Hypertension, Mother - Diabetes"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Profile"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

