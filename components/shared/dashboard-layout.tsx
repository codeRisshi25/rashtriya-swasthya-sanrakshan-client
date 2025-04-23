"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  ChevronDown,
  FileText,
  Home,
  LogOut,
  Settings,
  User,
  Users,
  FileUp,
  Heart,
  Database,
  ClipboardList,
  BarChart,
  Activity,
} from "lucide-react"
import type { UserRole } from "@/lib/auth-utils"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@/context/user-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole?: UserRole
  userName?: string
}

export function DashboardLayout({ children, userRole = "patient", userName = "User" }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const { logout , user } = useUser()
  const handleLogout = () => {
    const response = fetch("http://localhost:6420/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },body: JSON.stringify({
        userID: user?.id,
        role: user?.role,
      }),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Logout failed")
      }
      return res.json()
    })
    .then(() => {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      })
    })
    .catch((error) => {
        toast({
          variant: "destructive",
          title: "Logout failed",
          description: error instanceof Error ? error.message : "There was a problem logging you out",
        })
      }
    )
    logout()
    router.push("/")
  }
  
  const isActivePath = (path: string) => {
    return pathname === path
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="border-r border-blue-100">
          <SidebarHeader className="border-b border-blue-100">
            <div className="flex items-center gap-2 px-4 py-2">
              <Heart className="h-6 w-6 text-primary fill-primary" />
              <span className="text-lg font-bold text-primary">Swasthya Sanrakshan</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            {userRole === "patient" && (
              <>
                <SidebarGroup>
                  <SidebarGroupLabel className="text-primary">Patient Portal</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActivePath(`/patient/dashboard`)}
                          className="text-gray-700 hover:text-primary hover:bg-blue-50"
                        >
                          <Link href="/patient/dashboard">
                            <Home className={isActivePath(`/patient/dashboard`) ? "text-primary" : ""} />
                            <span>Dashboard</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActivePath(`/patient/profile`)}
                          className="text-gray-700 hover:text-primary hover:bg-blue-50"
                        >
                          <Link href="/patient/profile">
                            <User className={isActivePath(`/patient/profile`) ? "text-primary" : ""} />
                            <span>My Profile</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActivePath(`/patient/medical-records`)}
                          className="text-gray-700 hover:text-primary hover:bg-blue-50"
                        >
                          <Link href="/patient/medical-records">
                            <FileText className={isActivePath(`/patient/medical-records`) ? "text-primary" : ""} />
                            <span>Medical Records</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActivePath(`/patient/doctor-access`)}
                          className="text-gray-700 hover:text-primary hover:bg-blue-50"
                        >
                          <Link href="/patient/doctor-access">
                            <Users className={isActivePath(`/patient/doctor-access`) ? "text-primary" : ""} />
                            <span>Doctor Access</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActivePath(`/patient/document-upload`)}
                          className="text-gray-700 hover:text-primary hover:bg-blue-50"
                        >
                          <Link href="/patient/document-upload">
                            <FileUp className={isActivePath(`/patient/document-upload`) ? "text-primary" : ""} />
                            <span>Upload Documents</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActivePath(`/patient/blockchain-logs`)}
                          className="text-gray-700 hover:text-primary hover:bg-blue-50"
                        >
                          <Link href="/patient/blockchain-logs">
                            <Database className={isActivePath(`/patient/blockchain-logs`) ? "text-primary" : ""} />
                            <span>Access Logs</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </>
            )}

            {userRole === "doctor" && (
              <>
                <SidebarGroup>
                  <SidebarGroupLabel className="text-primary">Doctor Portal</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActivePath(`/doctor/dashboard`)}
                          className="text-gray-700 hover:text-primary hover:bg-blue-50"
                        >
                          <Link href="/doctor/dashboard">
                            <Home className={isActivePath(`/doctor/dashboard`) ? "text-primary" : ""} />
                            <span>Dashboard</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActivePath(`/doctor/patients`)}
                          className="text-gray-700 hover:text-primary hover:bg-blue-50"
                        >
                          <Link href="/doctor/patients">
                            <Users className={isActivePath(`/doctor/patients`) ? "text-primary" : ""} />
                            <span>My Patients</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActivePath(`/doctor/add-record`)}
                          className="text-gray-700 hover:text-primary hover:bg-blue-50"
                        >
                          <Link href="/doctor/add-record">
                            <ClipboardList className={isActivePath(`/doctor/add-record`) ? "text-primary" : ""} />
                            <span>Add Medical Record</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActivePath(`/doctor/blockchain-logs`)}
                          className="text-gray-700 hover:text-primary hover:bg-blue-50"
                        >
                          <Link href="/doctor/blockchain-logs">
                            <Database className={isActivePath(`/doctor/blockchain-logs`) ? "text-primary" : ""} />
                            <span>Transaction Logs</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </>
            )}

            {userRole === "government" && (
              <>
                <SidebarGroup>
                  <SidebarGroupLabel className="text-primary">Government Portal</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActivePath(`/government/dashboard`)}
                          className="text-gray-700 hover:text-primary hover:bg-blue-50"
                        >
                          <Link href="/government/dashboard">
                            <Home className={isActivePath(`/government/dashboard`) ? "text-primary" : ""} />
                            <span>Dashboard</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActivePath(`/government/health-trends`)}
                          className="text-gray-700 hover:text-primary hover:bg-blue-50"
                        >
                          <Link href="/government/health-trends">
                            <BarChart className={isActivePath(`/government/health-trends`) ? "text-primary" : ""} />
                            <span>Health Trends</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActivePath(`/government/statistics`)}
                          className="text-gray-700 hover:text-primary hover:bg-blue-50"
                        >
                          <Link href="/government/statistics">
                            <Activity className={isActivePath(`/government/statistics`) ? "text-primary" : ""} />
                            <span>Statistics</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActivePath(`/government/reports`)}
                          className="text-gray-700 hover:text-primary hover:bg-blue-50"
                        >
                          <Link href="/government/reports">
                            <FileText className={isActivePath(`/government/reports`) ? "text-primary" : ""} />
                            <span>Reports</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </>
            )}
          </SidebarContent>
          <SidebarFooter className="border-t border-blue-100">
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="text-gray-700 hover:text-primary hover:bg-blue-50">
                      <User />
                      <span>{userName}</span>
                      <ChevronDown className="ml-auto h-4 w-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href={`/${userRole}/profile`}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/${userRole}/settings`}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <div className="flex h-16 items-center gap-4 border-b border-blue-100 bg-white px-6 shadow-sm">
            <SidebarTrigger />
            <div className="font-semibold text-primary">
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard
            </div>
          </div>
          <main className="flex-1 p-6 bg-blue-50/30">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

