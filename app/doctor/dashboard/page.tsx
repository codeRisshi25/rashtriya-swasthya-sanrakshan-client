import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, FileText, ClipboardList } from "lucide-react"

export default function DoctorDashboard() {
  return (
    <DashboardLayout userRole="doctor" userName="Dr. Rajesh Kumar">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold tracking-tight">Welcome back, Dr. Rajesh</h2>
          <p className="text-muted-foreground">Manage your patients, add medical records, and view transaction logs</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">My Patients</CardTitle>
              <CardDescription>Patients under your care</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-3xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Last changed 3 days ago</p>
            </CardContent>
            <CardContent className="flex items-center justify-center pt-0">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/doctor/patients">
                  View Patients
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Records Added</CardTitle>
              <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-3xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
            <CardContent className="flex items-center justify-center pt-0">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/doctor/add-record">
                  Add Record
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Upcoming Appointments</CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-3xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">2 appointments today</p>
            </CardContent>
            <CardContent className="flex items-center justify-center pt-0">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/doctor/appointments">
                  View Calendar
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Patients</CardTitle>
              <CardDescription>Recently accessed patient records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: "PAT001", name: "Rahul Sharma", date: "2 days ago", condition: "Hypertension" },
                  { id: "PAT002", name: "Priya Patel", date: "5 days ago", condition: "Diabetes Type 2" },
                  { id: "PAT003", name: "Amit Kumar", date: "1 week ago", condition: "Asthma" },
                ].map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-sm text-muted-foreground">{patient.condition}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-muted-foreground">{patient.date}</div>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/doctor/patients/${patient.id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" asChild>
                <Link href="/doctor/patients">
                  <Users className="mr-2 h-4 w-4" />
                  View All Patients
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link href="/doctor/add-record">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Add Medical Record
                </Link>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href="/doctor/blockchain-logs">
                  <FileText className="mr-2 h-4 w-4" />
                  View Transaction Logs
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

