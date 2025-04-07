"use client"

import type React from "react"

import { useState } from "react"
import { Upload, File, FileText, Image, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  uploadDate: Date
}

// Sample uploaded files
const sampleFiles: UploadedFile[] = [
  {
    id: "file1",
    name: "blood_test_results.pdf",
    size: 2500000,
    type: "application/pdf",
    uploadDate: new Date(2023, 5, 10),
  },
  {
    id: "file2",
    name: "x_ray_chest.jpg",
    size: 4200000,
    type: "image/jpeg",
    uploadDate: new Date(2023, 5, 15),
  },
]

export function DocumentUploader() {
  const { toast } = useToast()
  const [files, setFiles] = useState<UploadedFile[]>(sampleFiles)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (fileList: FileList) => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)

          // Add the file after "upload" completes
          const file = fileList[0]
          const newFile: UploadedFile = {
            id: `file${Date.now()}`,
            name: file.name,
            size: file.size,
            type: file.type,
            uploadDate: new Date(),
          }

          setFiles([...files, newFile])

          toast({
            title: "Upload complete",
            description: `${file.name} has been successfully uploaded`,
          })

          return 0
        }
        return prev + 10
      })
    }, 300)
  }

  const handleDelete = (id: string) => {
    setFiles(files.filter((file) => file.id !== id))
    toast({
      title: "File deleted",
      description: "The selected file has been deleted",
    })
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) {
      return <Image className="h-5 w-5" />
    } else if (type === "application/pdf") {
      return <FileText className="h-5 w-5" />
    } else {
      return <File className="h-5 w-5" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Medical Documents</CardTitle>
        <CardDescription>Securely upload and store your medical documents</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? "border-primary bg-muted/50" : "border-muted-foreground/20"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">Drag files here or click to upload</h3>
          <p className="text-sm text-muted-foreground mb-4">Support for PDF, JPG, PNG, DICOM files up to 10MB</p>
          <input
            type="file"
            id="fileUpload"
            className="hidden"
            onChange={handleFileInput}
            accept=".pdf,.jpg,.jpeg,.png,.dcm"
          />
          <Button asChild>
            <label htmlFor="fileUpload">Select Files</label>
          </Button>
        </div>

        {isUploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Uploaded Documents</h3>

          {files.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">No documents uploaded yet</div>
          ) : (
            <div className="space-y-3">
              {files.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.type)}
                    <div>
                      <div className="font-medium">{file.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)} • {file.uploadDate.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{file.type.split("/")[1].toUpperCase()}</Badge>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(file.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

