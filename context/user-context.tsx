"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "patient" | "doctor" | "government"

export interface User {
  id?: string
  address?: string
  age?: number
  email?: string
  medicalDetails?: {
    bloodGroup?: string
    allergies?: string[]
    emergencyContact?: string
    vaccinationHistory?: string[]
  }
  contact?: string
  name: string
  photoUrl?: string
  role: UserRole

}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage or session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    // Redirect to login page would happen in the component using this function
  }

  return <UserContext.Provider value={{ user, setUser, isLoading, logout }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

