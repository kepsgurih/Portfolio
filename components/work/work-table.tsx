"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { EditWorkSheet } from "./edit-work-sheet"
import { useState } from "react"
import { DeleteWorkDialog } from "./delete-work-dialog"

// This would come from your database in a real app
const mockWorkData = [
  {
    id: "1",
    company: "Acme Inc",
    location: "New York, NY",
    description: "Developed and maintained web applications using React and Node.js",
    tags: ["React", "Node.js", "TypeScript"],
    achievement: ["Improved site performance by 40%", "Implemented CI/CD pipeline"],
    pos: 1,
  },
  {
    id: "2",
    company: "Tech Solutions",
    location: "San Francisco, CA",
    description: "Led a team of developers to build a new e-commerce platform",
    tags: ["Next.js", "MongoDB", "AWS"],
    achievement: ["Increased sales by 25%", "Reduced server costs by 30%"],
    pos: 2,
  },
]

export function WorkTable() {
  const [workData, setWorkData] = useState(mockWorkData)
  const [selectedWork, setSelectedWork] = useState<(typeof mockWorkData)[0] | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleDelete = (id: string) => {
    setWorkData(workData.filter((work) => work.id !== id))
    setDeleteDialogOpen(false)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Position</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="hidden md:table-cell">Location</TableHead>
            <TableHead className="hidden md:table-cell">Tags</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No work experience entries found.
              </TableCell>
            </TableRow>
          ) : (
            workData.map((work) => (
              <TableRow key={work.id}>
                <TableCell className="font-medium">{work.pos}</TableCell>
                <TableCell>{work.company}</TableCell>
                <TableCell className="hidden md:table-cell">{work.location}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {work.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                    {work.tags.length > 2 && <Badge variant="outline">+{work.tags.length - 2}</Badge>}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <EditWorkSheet work={work}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </EditWorkSheet>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedWork(work)
                        setDeleteDialogOpen(true)
                      }}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {selectedWork && (
        <DeleteWorkDialog
          work={selectedWork}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onDelete={() => handleDelete(selectedWork.id)}
        />
      )}
    </div>
  )
}

