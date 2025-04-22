import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Edit } from "lucide-react"
import Link from "next/link"

interface ProfileCardProps {
  name: string
  patientId: string
  age: number
  bloodType: string
  gender: string
  photoUrl?: string
}

export function ProfileCard({ name, patientId, age, bloodType, gender , photoUrl}: ProfileCardProps) {
  const photo = `data:image/jpeg;base64,${photoUrl?.replace(/"/g, '')}`
  return (
    <Card className="border-blue-100 shadow-sm">
      <CardHeader className="pb-2 bg-blue-50 rounded-t-lg">
        <CardTitle className="text-base text-primary">My Profile</CardTitle>
        <CardDescription>Your personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
            {photoUrl ? (
              <img src={photo} alt={`${name}'s photo`} className="h-full w-full object-cover" />
            ) : (
              <User className="h-8 w-8 text-primary" />
            )}
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-gray-500">Patient ID: {patientId}</p>
            <div className="flex gap-2 mt-1">
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-primary">
                {age} years
              </span>
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-primary">
                {gender}
              </span>
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-primary">
                {bloodType}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" asChild className="border-primary text-primary hover:bg-primary/10">
            <Link href="/patient/profile">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

