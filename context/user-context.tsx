"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

// Define the user type
export interface User {
  id: string;
  role: "patient" | "doctor" | "admin";
  // Common properties
  email: string;
  photoUrl?: string;
  contact?: string;
  address?: string;
  walletAddress?: string;
  privateKey?: string; // NEVER store this in production
  name?: string;
  loggedIn?: boolean;
  sharedWith?: number;

  // Doctor-specific properties
  userId?: string,
  gender?: string;
  dob?: string;
  license_number?: string;
  department?: string;
  hospital_affiliation?: string;
  years_of_experience?: number;
  specialization?: string;
  qualification?: string;

  // Patient-specific properties (optional, can be extended)
  aadharId?: string;
  age?: number;
  currentMedications?: string;
  medicalDetails?: {
    bloodGroup?: string;
    emergencyContact?: string;
    allergies?: string[];
  };
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on initial render
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}