"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@/context/user-context"
import { Eye, EyeOff } from "lucide-react"

export function LoginForm() {
  
  const router = useRouter()
  const { toast } = useToast()
  const { setUser } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function onPatientSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const userID = formData.get("aadhaarId") as string
    const password = formData.get("password") as string
    const role = "patients"

    try {
      // Make API call to authentication endpoint
      const response = await fetch('http://localhost:6420/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: userID.replace(/\s+/g, ''),
          password,
          role,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const userData = await response.json();
      console.log("User data from API:", userData);


      toast({
        title: "Login successful",
        description: "Welcome back to Rashtriya Swasthya Sanrakshan",
      });

      setUser(userData.data);
      
      // Redirect to dashboard
      router.push("/patient/dashboard");
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid Aadhaar ID or password",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onProfessionalSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const userID = formData.get("userId") as string
    const password = formData.get("password") as string
    const userRole = formData.get("userRole") as "doctor" | "government"

    try {
      if (userRole === "doctor") {
        // Make API call to authentication endpoint for doctor login
        const response = await fetch('http://localhost:6420/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userID,
            password,
            role: 'doctors', // The backend expects 'doctors' for the doctor role
          }),
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const userData = await response.json();
        console.log("Doctor data from API:", userData);
        
        // Map API response to our User interface structure
        const doctorData = {
          ...userData.data,
          role: "doctor", // Ensure role is set correctly
          // Add any additional mapping needed to match the User interface
          full_name: userData.data.full_name || userData.data.name,
        };

        // Set user with the data from API
        setUser(doctorData);
        
        // Store in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(doctorData));

        toast({
          title: "Login successful",
          description: "Welcome back to Rashtriya Swasthya Sanrakshan",
        });

        router.push("/doctor/dashboard");
      } else {
        // Government official login
        // Make API call to authentication endpoint for government official
        const response = await fetch('http://localhost:6420/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userID,
            password,
            role: 'government', // The backend expects 'government' for admin role
          }),
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const userData = await response.json();
        console.log("Government official data from API:", userData);
        
        // Map API response to our User interface structure
        const adminData = {
          ...userData.data,
          role: "admin", // Map to 'admin' role in our app
        };

        // Set user with the data from API
        setUser(adminData);
        
        // Store in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(adminData));

        toast({
          title: "Login successful",
          description: "Welcome back to Rashtriya Swasthya Sanrakshan",
        });

        router.push("/government/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid credentials",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-md w-full shadow-lg border-blue-100">
      <CardHeader className="space-y-1 bg-blue-50 rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-primary">Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <Tabs defaultValue="patient" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-blue-50 rounded-none border-b border-blue-100">
          <TabsTrigger value="patient" className="data-[state=active]:bg-white data-[state=active]:text-primary">
            Patient
          </TabsTrigger>
          <TabsTrigger value="professional" className="data-[state=active]:bg-white data-[state=active]:text-primary">
            Doctor/Official
          </TabsTrigger>
        </TabsList>

        <TabsContent value="patient">
          <form onSubmit={onPatientSubmit}>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="aadhaarId">Aadhaar ID</Label>
                <Input
                  id="aadhaarId"
                  name="aadhaarId"
                  placeholder="XXXX XXXX XXXX"
                  required
                  className="border-blue-200 focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="border-blue-200 focus-visible:ring-primary pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="text-right text-sm">
                  <Link href="/forgot-password" className="text-primary hover:underline">
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 bg-blue-50 rounded-b-lg">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Register
                </Link>
              </div>
            </CardFooter>
          </form>
        </TabsContent>

        <TabsContent value="professional">
          <form onSubmit={onProfessionalSubmit}>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="userId">User ID</Label>
                <Input
                  id="userId"
                  name="userId"
                  placeholder="Enter your ID"
                  required
                  className="border-blue-200 focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="professionalPassword">Password</Label>
                <div className="relative">
                  <Input
                    id="professionalPassword"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="border-blue-200 focus-visible:ring-primary pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Account Type</Label>
                <RadioGroup defaultValue="doctor" name="userRole">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="doctor" id="login-doctor" className="text-primary border-blue-200" />
                    <Label htmlFor="login-doctor">Doctor</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="government" id="login-government" className="text-primary border-blue-200" />
                    <Label htmlFor="login-government">Government Official</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 bg-blue-50 rounded-b-lg">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <div className="text-center text-sm">
                For professional registration, please contact the administrator.
              </div>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

