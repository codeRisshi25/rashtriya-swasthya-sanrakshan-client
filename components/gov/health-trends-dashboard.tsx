"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for disease prevalence
const diseaseData = [
  { name: "Hypertension", count: 1240 },
  { name: "Diabetes", count: 980 },
  { name: "Heart Disease", count: 750 },
  { name: "Respiratory", count: 690 },
  { name: "Mental Health", count: 580 },
  { name: "Cancer", count: 480 },
  { name: "Others", count: 920 },
]

// Sample data for monthly trends
const monthlyTrendsData = [
  { month: "Jan", cases: 450, vaccinations: 1200 },
  { month: "Feb", cases: 480, vaccinations: 1100 },
  { month: "Mar", cases: 520, vaccinations: 950 },
  { month: "Apr", cases: 490, vaccinations: 870 },
  { month: "May", cases: 470, vaccinations: 920 },
  { month: "Jun", cases: 510, vaccinations: 980 },
  { month: "Jul", cases: 530, vaccinations: 1050 },
  { month: "Aug", cases: 550, vaccinations: 1150 },
  { month: "Sep", cases: 520, vaccinations: 1250 },
  { month: "Oct", cases: 490, vaccinations: 1300 },
  { month: "Nov", cases: 470, vaccinations: 1400 },
  { month: "Dec", cases: 450, vaccinations: 1500 },
]

// Sample data for age distribution
const ageDistributionData = [
  { name: "0-18", value: 15 },
  { name: "19-35", value: 25 },
  { name: "36-50", value: 30 },
  { name: "51-65", value: 20 },
  { name: "65+", value: 10 },
]

// Colors for pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export function HealthTrendsDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Health Trends Dashboard</h2>
        <div className="flex gap-2">
          <Select defaultValue="national">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="national">National Level</SelectItem>
              <SelectItem value="north">Northern Region</SelectItem>
              <SelectItem value="south">Southern Region</SelectItem>
              <SelectItem value="east">Eastern Region</SelectItem>
              <SelectItem value="west">Western Region</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="2023">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Patients</CardTitle>
            <CardDescription>Across all healthcare facilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24,685</div>
            <p className="text-xs text-muted-foreground">+16% from previous year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Vaccination Rate</CardTitle>
            <CardDescription>Percentage of population vaccinated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78.5%</div>
            <p className="text-xs text-muted-foreground">+5.2% from previous year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Average Hospital Stay</CardTitle>
            <CardDescription>Duration in days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.3 days</div>
            <p className="text-xs text-muted-foreground">-0.5 days from previous year</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="diseases">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="diseases">Disease Prevalence</TabsTrigger>
          <TabsTrigger value="trends">Monthly Trends</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>

        <TabsContent value="diseases" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Common Disease Prevalence</CardTitle>
              <CardDescription>Distribution of major health conditions across the population</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ChartContainer
                  config={{
                    count: {
                      label: "Cases",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={diseaseData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="var(--color-count)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Health Trends</CardTitle>
              <CardDescription>Case counts and vaccination rates over the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ChartContainer
                  config={{
                    cases: {
                      label: "New Cases",
                      color: "hsl(var(--chart-1))",
                    },
                    vaccinations: {
                      label: "Vaccinations",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyTrendsData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="cases" stroke="var(--color-cases)" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="vaccinations" stroke="var(--color-vaccinations)" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Population Demographics</CardTitle>
              <CardDescription>Age distribution of patients across healthcare system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ageDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {ageDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

