"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff, Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function RegisterForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState<"aadhaar" | "otp" | "verification">("aadhaar")
  const [aadhaarId, setAadhaarId] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [aadhaarError, setAadhaarError] = useState("")
  const [referenceId, setReferenceId] = useState("")
  const [verifyData, setVerifyData] = useState({
    name: "",
    gender: "",
    dob: "",
    address: "",
    photoUrl: "",
  })
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(true);

  const handleAcceptTerms = () => {
    localStorage.setItem("termsAccepted", "true"); // Store acceptance in localStorage
    setIsTermsModalOpen(false); // Close the modal
    toast({
      title: "Terms Accepted",
      description: "Thank you for accepting the terms and conditions.",
    });
  };

  const handleDenyTerms = () => {
    toast({
      variant: "destructive",
      title: "Terms Denied",
      description: "You must accept the terms and conditions to proceed.",
    });
    router.push("/"); // Redirect to root
  };

  const validateAadhaar = (value: string) => {
    // Remove spaces for validation
    const cleanedValue = value.replace(/\s/g, "")
    if (cleanedValue.length !== 12 || !/^\d+$/.test(cleanedValue)) {
      setAadhaarError("Aadhaar ID must be 12 digits")
      return false
    }
    setAadhaarError("")
    return true
  }

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      return false
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return false
    }
    setPasswordError("")
    return true
  }

  const formatAadhaar = (value: string) => {
    // Remove all spaces first
    const cleaned = value.replace(/\s/g, "")
    // Format as XXXX XXXX XXXX
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ")
    return formatted
  }

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow digits and spaces
    if (/^[\d\s]*$/.test(value)) {
      const formatted = formatAadhaar(value)
      setAadhaarId(formatted)
      if (formatted.replace(/\s/g, "").length === 12) {
        validateAadhaar(formatted)
      }
    }
  }

  const handleAadhaarSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateAadhaar(aadhaarId) || !validatePassword()) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:6420/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          aadhaarId: aadhaarId.replace(/\s/g, ""),
          password: password
        }),
      });

      const data = await response.json(); //sends back the reference id
      setReferenceId(data.reference_id);


      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
      }

      setStep("otp")
      toast({
        title: "OTP Sent",
        description: "A verification code has been sent to your registered mobile number",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send OTP",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:6420/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reference_id: referenceId,
          otp: otp
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify OTP');
      }

      // Handle photo data if it exists
      if (data.photo && data.photo.trim() !== "") {
        // Clean any quotes from the photo string
        const cleanPhotoUrl = data.photo.replace(/"/g, '');

        if (cleanPhotoUrl && cleanPhotoUrl.trim() !== "") {
          // Check if it's already a data URL or http URL
          const photoUrl = cleanPhotoUrl.startsWith('data:') || cleanPhotoUrl.startsWith('http')
            ? cleanPhotoUrl
            : `data:image/jpeg;base64,${cleanPhotoUrl}`;

          setVerifyData({
            name: data.name,
            gender: data.gender,
            dob: data.dob,
            address: data.address,
            photoUrl: photoUrl,
          });
        }
      } else {
        setVerifyData({
          name: data.name,
          gender: data.gender,
          dob: data.dob,
          address: data.address,
          photoUrl: "",
        });
      }
      // Show verification dialog with user data from response
      setStep("verification");
      setIsVerificationDialogOpen(true);

      // Here you would handle the user data returned from the API
      // For example: setUserData(data.userData);

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: error instanceof Error ? error.message : "Failed to verify OTP",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleVerificationConfirm = () => {
    setIsVerificationDialogOpen(false)
    toast({
      title: "Registration Successful",
      description: "Your account has been created. You will now be redirected to complete your medical profile.",
    })
    router.push("/onboarding/medical-history")
  }

  return (
    <Card className="max-w-md w-full shadow-lg border-blue-100">
      <CardHeader className="space-y-1 bg-blue-50 rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-primary">Create an account</CardTitle>
        <CardDescription>
          {step === "aadhaar" && "Enter your Aadhaar details to register"}
          {step === "otp" && "Verify your identity with OTP"}
          {step === "verification" && "Confirm your details"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        {step === "aadhaar" && (
          <form onSubmit={handleAadhaarSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="aadhaarId">Aadhaar ID</Label>
              <Input
                id="aadhaarId"
                value={aadhaarId}
                onChange={handleAadhaarChange}
                placeholder="XXXX XXXX XXXX"
                maxLength={14} // 12 digits + 2 spaces
                required
                className="border-blue-200 focus-visible:ring-primary"
              />
              {aadhaarError && <p className="text-red-500 text-sm">{aadhaarError}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="border-blue-200 focus-visible:ring-primary pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Continue
            </Button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Enter OTP</Label>
              <div className="flex gap-2 justify-between">
                {[...Array(6)].map((_, index) => (
                  <Input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={otp[index] || ''}
                    onChange={(e) => {
                      const newOtp = otp.split('');
                      newOtp[index] = e.target.value;
                      setOtp(newOtp.join(''));

                      // Auto-focus next input
                      if (e.target.value && index < 5) {
                        const nextInput = e.target.parentElement?.querySelector(
                          `input:nth-child(${index + 2})`
                        ) as HTMLInputElement;
                        if (nextInput) nextInput.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      // Handle backspace
                      if (e.key === 'Backspace' && !otp[index] && index > 0) {
                        const prevInput = e.currentTarget.parentElement?.querySelector(
                          `input:nth-child(${index})`
                        ) as HTMLInputElement;
                        if (prevInput) prevInput.focus();
                      }
                    }}
                    className="w-12 h-12 text-center text-lg border-blue-200 focus-visible:ring-primary"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Info className="h-4 w-4" />
                OTP sent to the mobile number linked with your Aadhaar
              </p>
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary/10"
              onClick={() => setStep("aadhaar")}
            >
              Back
            </Button>
          </form>
        )}

        <Dialog open={isVerificationDialogOpen} onOpenChange={setIsVerificationDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Your Details</DialogTitle>
              <DialogDescription>
                Please verify that the following details from your Aadhaar are correct.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-start gap-4">
                <div className="h-20 w-20 rounded-md bg-blue-100 flex items-center justify-center overflow-hidden">
                  {verifyData.photoUrl ? (
                    <img
                      src={verifyData.photoUrl}
                      alt="Aadhaar Photo"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-blue-500 text-xs text-center">No photo available</div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{verifyData.name}</h3>
                  <p className="text-sm text-gray-500">DOB: {verifyData.dob}</p>
                  <p className="text-sm text-gray-500">Gender: {verifyData.gender}</p>
                  <p className="text-sm text-gray-500 mt-1">{verifyData.address}</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => setIsVerificationDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="button" className="bg-primary hover:bg-primary/90" onClick={handleVerificationConfirm}>
                Confirm & Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 bg-blue-50 rounded-b-lg">
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </CardFooter>

      {/* Terms and Conditions Modal */}
      <Dialog open={isTermsModalOpen} onOpenChange={setIsTermsModalOpen}>
        <DialogContent className="sm:max-w-lg" aria-describedby="terms-description">
          <DialogHeader>
            <DialogTitle>Terms and Conditions</DialogTitle>
          </DialogHeader>
          <div id="terms-description" className="space-y-4">
            <p>
              By using our platform, you agree to the following terms and conditions:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Your Aadhaar card is used solely for identity verification purposes. We do not store or share your Aadhaar details with third parties.
              </li>
              <li>
                Your personal data will not be sold or used for marketing purposes. It is securely stored and used only for providing our services.
              </li>
              <li>
                A wallet address will be created for you on the Ethereum network as part of our blockchain-based project.
              </li>
              <li>
                Our platform uses blockchain technology to ensure the security and transparency of your medical records.
              </li>
              <li>
                By accepting these terms, you consent to the use of your data as described above.
              </li>
            </ul>
            <p>
              If you do not agree to these terms, you will not be able to use our platform.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleDenyTerms}>
              Deny
            </Button>
            <Button onClick={handleAcceptTerms}>Accept</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </Card>

  )
}

