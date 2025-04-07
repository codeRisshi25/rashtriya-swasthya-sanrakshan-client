"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
import { useUser } from "@/context/user-context"
import Image from "next/image"

export function PatientProfileForm() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, setUser, isLoading: userLoading } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState<Date>()
  const [photoUrl, setPhotoUrl] = useState<string>("")

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    emergencyContact: "",
    address: "",
    gender: "male",
    height: "175",
    weight: "70",
    bloodType: "B+",
    hasAllergies: "yes",
    allergiesDetails: "",
    surgeries: "",
    familyHistory: "",
    photoUrl: "",
    medications: "",
  })

  
  // Load user data into form when available
  useEffect(() => {
    if (user && !userLoading) {
      // Process the photo URL if it exists
      if (user.photoUrl && user.photoUrl.trim() !== "") {
        // Make sure we don't have quotes in the photoUrl
        const cleanPhotoUrl = user.photoUrl.replace(/"/g, '');
        
        if (cleanPhotoUrl && cleanPhotoUrl.trim() !== "") {
          if (cleanPhotoUrl.startsWith('data:') || cleanPhotoUrl.startsWith('http')) {
            // It's already a complete URL
            setPhotoUrl(cleanPhotoUrl);
          } else {
            // It's a base64 string without the data URI prefix
            setPhotoUrl(`data:image/jpeg;base64,${cleanPhotoUrl}`);
          }
        }
      }
      
      setFormData({
        fullName: user.name || "",
        photoUrl: user.photoUrl || "",
        email: user.email || "",
        phone: user.contact || "",
        address: user.address || "",
        gender: "male", // Default since not in user model
        height: "175", // Default 
        weight: "70",  // Default
        bloodType: user.medicalDetails?.bloodGroup || "B+",
        hasAllergies: user.medicalDetails?.allergies && 
        user.medicalDetails.allergies.length > 0 ? "yes" : "no",
        emergencyContact: user.medicalDetails?.emergencyContact || "",
        allergiesDetails: user.medicalDetails?.allergies ? 
        user.medicalDetails.allergies.join(", ") : "",
        medications: user.currentMedications || "", // Not in our user model
        surgeries: "",   // Not in our user model
        familyHistory: "" // Not in our user model
      })
      
      // Set birth date based on age if available
      if (user.age) {
        const currentYear = new Date().getFullYear()
        const birthYear = currentYear - user.age
        setDate(new Date(birthYear, 0, 1)) // January 1st of birth year as a default
      }
    }
  }, [user, userLoading])

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle radio button changes
  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    // Calculate age from birthdate if available
    let age = user?.age || 0
    if (date) {
      const today = new Date()
      age = today.getFullYear() - date.getFullYear()
      const m = today.getMonth() - date.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
        age--
      }
    }

    // In a real app, this would call an API endpoint
    try {
      // Create updated user object
      const updatedUser = {
        ...user,
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
        address: formData.address,
        age: age,
        medicalDetails: {
          ...user?.medicalDetails,
          bloodGroup: formData.bloodType,
          emergencyContact: formData.emergencyContact,
          allergies: formData.hasAllergies === "yes" 
            ? formData.allergiesDetails.split(",").map(item => item.trim())
            : []
        }
      }

      // Mock API call
      setTimeout(() => {
        // Update the user in context and localStorage
        if (setUser) {
          setUser(updatedUser)
          localStorage.setItem("user", JSON.stringify(updatedUser))
        }

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

  // Show loading state while user data is being fetched
  if (userLoading) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Loading profile...</CardTitle>
          <CardDescription>Please wait while we load your profile data</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center min-h-[300px]">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </CardContent>
      </Card>
    )
  }

  // Show error if no user or not a patient
  if (!user || user.role !== "patient") {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>You need to be logged in as a patient to view this page</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => router.push("/login")}>Go to Login</Button>
        </CardContent>
      </Card>
    )
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
                    {photoUrl && photoUrl.trim() !== "" ? (
                    <Image
                      src={photoUrl}
                      alt={user.name ? user.name.charAt(0) : "U"}
                      width={96}
                      height={96}
                      className="object-cover h-full w-full"
                    />
                    ) : (
                    <div className="h-full w-full flex items-center justify-center bg-primary text-primary-foreground rounded-full">
                      <span className="text-3xl font-semibold">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </span>
                    </div>
                    )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-muted-foreground">Patient ID: {user.aadharId || "Not set"}</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Change Photo
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleChange}
                    required 
                  />
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
                  <RadioGroup 
                    value={formData.gender}
                    onValueChange={(value) => handleRadioChange("gender", value)}
                    name="gender"
                  >
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
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input 
                    id="emergencyContact" 
                    name="emergencyContact" 
                    value={formData.emergencyContact} 
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea 
                    id="address" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="medical" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input 
                    id="height" 
                    name="height" 
                    type="number" 
                    value={formData.height} 
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input 
                    id="weight" 
                    name="weight" 
                    type="number" 
                    value={formData.weight} 
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <Select 
                    value={formData.bloodType}
                    onValueChange={(value) => handleSelectChange("bloodType", value)}
                  >
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
                  <RadioGroup 
                    value={formData.hasAllergies}
                    onValueChange={(value) => handleRadioChange("hasAllergies", value)}
                    name="hasAllergies"
                  >
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
                    value={formData.allergiesDetails}
                    onChange={handleChange}
                    disabled={formData.hasAllergies === "no"}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="medications">Current Medications</Label>
                  <Textarea
                    id="medications"
                    name="medications"
                    placeholder="List any medications you're currently taking..."
                    value={formData.medications}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="surgeries">Previous Surgeries</Label>
                  <Textarea
                    id="surgeries"
                    name="surgeries"
                    placeholder="List any surgeries you've had with approximate dates..."
                    value={formData.surgeries}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="familyHistory">Family Medical History</Label>
                  <Textarea
                    id="familyHistory"
                    name="familyHistory"
                    placeholder="Any significant medical conditions in your immediate family..."
                    value={formData.familyHistory}
                    onChange={handleChange}
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

