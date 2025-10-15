"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { EditWorkSheet } from "./edit-work-sheet"
import { useState } from "react"
import { DeleteWorkDialog } from "./delete-work-dialog"
import { IWork } from "@/types"
import { deleteWork } from "@/services/work"
import { toast } from "sonner"

export function WorkTable({ workData }: { workData: IWork[] }) {
  const deletes = async (id: string) => {
    const del = await deleteWork(id)
    toast(del.message)
  }

  const [selectedWork, setSelectedWork] = useState<IWork | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleDelete = (id: string) => {
    deletes(id)
    setDeleteDialogOpen(false)
  }


  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="hidden md:table-cell">Location</TableHead>
            <TableHead className="hidden md:table-cell">Tags</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workData.length > 0 && workData.map((work: IWork) => (
            <TableRow key={work.id}>
              <TableCell className="font-medium">{work.pos}</TableCell>
              <TableCell>{work.title}</TableCell>
              <TableCell>{work.period}</TableCell>
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
                  <EditWorkSheet work={work} totalWorks={workData.length}>
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
          }
        </TableBody>
      </Table>
      {selectedWork && (
        <DeleteWorkDialog
          work={selectedWork}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onDelete={() => handleDelete(selectedWork.id || "")}
        />
      )}
    </div>
  )
}

