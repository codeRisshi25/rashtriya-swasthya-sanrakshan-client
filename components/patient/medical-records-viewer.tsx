"use client"

import { useState } from "react"
import { format } from "date-fns"
import { FileText, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MedicalRecord {
  id: string
  patientId: string
  doctorId: string
  doctorName: string
  date: Date
  diagnosis: string
  prescription: string[]
  notes: string
  documents: {
    id: string
    name: string
    type: string
  }[]
}

// Sample medical records
const records: MedicalRecord[] = [
  {
    id: "REC001",
    patientId: "PAT001",
    doctorId: "DOC001",
    doctorName: "Dr. Rajesh Kumar",
    date: new Date(2023, 5, 15),
    diagnosis: "Seasonal Allergic Rhinitis",
    prescription: [
      "Cetirizine 10mg - Take once daily for 10 days",
      "Fluticasone Nasal Spray - Use as directed twice daily",
    ],
    notes:
      "Patient presented with nasal congestion, sneezing, and itchy eyes. Symptoms are consistent with seasonal allergies. Recommended to avoid outdoor activities during high pollen count days.",
    documents: [
      {
        id: "DOC001",
        name: "Allergy Test Results",
        type: "PDF",
      },
    ],
  },
  {
    id: "REC002",
    patientId: "PAT001",
    doctorId: "DOC002",
    doctorName: "Dr. Priya Sharma",
    date: new Date(2023, 4, 10),
    diagnosis: "Hypertension - Stage 1",
    prescription: ["Amlodipine 5mg - Take once daily", "Hydrochlorothiazide 12.5mg - Take once daily in the morning"],
    notes:
      "Blood pressure readings: 145/95 mmHg. Recommended lifestyle modifications including reduced sodium intake, regular exercise, and weight loss. Follow-up in 4 weeks to assess medication effectiveness.",
    documents: [
      {
        id: "DOC002",
        name: "Blood Pressure Chart",
        type: "PDF",
      },
      {
        id: "DOC003",
        name: "ECG Results",
        type: "PDF",
      },
    ],
  },
]

export function MedicalRecordsViewer() {
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Records</CardTitle>
        <CardDescription>View your complete medical history</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {records.map((record, index) => (
            <AccordionItem key={record.id} value={record.id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-1 items-center justify-between pr-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div className="text-left">
                      <div>{record.diagnosis}</div>
                      <div className="text-xs text-muted-foreground">
                        {format(record.date, "MMMM d, yyyy")} • Dr. {record.doctorName.split(" ")[1]}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">{format(record.date, "MMM yyyy")}</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Diagnosis</h4>
                      <p className="text-sm">{record.diagnosis}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Doctor</h4>
                      <p className="text-sm">{record.doctorName}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Prescription</h4>
                    <ul className="text-sm list-disc pl-5">
                      {record.prescription.map((med, idx) => (
                        <li key={idx}>{med}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Clinical Notes</h4>
                    <p className="text-sm">{record.notes}</p>
                  </div>

                  {record.documents.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Documents</h4>
                      <div className="flex flex-wrap gap-2">
                        {record.documents.map((doc) => (
                          <div key={doc.id} className="flex items-center gap-2 p-2 border rounded-md text-sm">
                            <FileText className="h-4 w-4" />
                            <span>{doc.name}</span>
                            <Badge variant="secondary" className="ml-1">
                              {doc.type}
                            </Badge>
                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedRecord(record)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View Full Record
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Medical Record Details</DialogTitle>
                        </DialogHeader>
                        {selectedRecord && (
                          <Tabs defaultValue="overview">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="overview">Overview</TabsTrigger>
                              <TabsTrigger value="prescription">Prescription</TabsTrigger>
                              <TabsTrigger value="documents">Documents</TabsTrigger>
                            </TabsList>
                            <TabsContent value="overview" className="space-y-4 mt-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <div className="text-sm font-medium">Patient ID</div>
                                  <div>{selectedRecord.patientId}</div>
                                </div>
                                <div>
                                  <div className="text-sm font-medium">Record ID</div>
                                  <div>{selectedRecord.id}</div>
                                </div>
                                <div>
                                  <div className="text-sm font-medium">Date</div>
                                  <div>{format(selectedRecord.date, "MMMM d, yyyy")}</div>
                                </div>
                                <div>
                                  <div className="text-sm font-medium">Doctor</div>
                                  <div>{selectedRecord.doctorName}</div>
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-medium">Diagnosis</div>
                                <div className="p-2 bg-muted rounded-md mt-1">{selectedRecord.diagnosis}</div>
                              </div>
                              <div>
                                <div className="text-sm font-medium">Clinical Notes</div>
                                <div className="p-2 bg-muted rounded-md mt-1">{selectedRecord.notes}</div>
                              </div>
                            </TabsContent>
                            <TabsContent value="prescription" className="space-y-4 mt-4">
                              <div className="text-sm font-medium">Prescribed Medications</div>
                              <ul className="space-y-2">
                                {selectedRecord.prescription.map((med, idx) => (
                                  <li key={idx} className="p-2 bg-muted rounded-md">
                                    {med}
                                  </li>
                                ))}
                              </ul>
                            </TabsContent>
                            <TabsContent value="documents" className="space-y-4 mt-4">
                              <div className="text-sm font-medium">Related Documents</div>
                              {selectedRecord.documents.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {selectedRecord.documents.map((doc) => (
                                    <div key={doc.id} className="flex items-center p-3 border rounded-md">
                                      <FileText className="h-8 w-8 mr-3" />
                                      <div className="flex-1">
                                        <div>{doc.name}</div>
                                        <div className="text-xs text-muted-foreground">{doc.type} Document</div>
                                      </div>
                                      <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4 mr-1" />
                                        Download
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-muted-foreground text-center py-8">
                                  No documents attached to this record
                                </div>
                              )}
                            </TabsContent>
                          </Tabs>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}

