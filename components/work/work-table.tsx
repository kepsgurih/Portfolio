"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { EditWorkSheet } from "./edit-work-sheet"
import { useState } from "react"
import { DeleteWorkDialog } from "./delete-work-dialog"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { IWork } from "@/types"
import { toast } from "sonner"

export function WorkTable() {
  const queryClient = useQueryClient()
  const { data: workData, isPending: pendingWork, error } = useQuery({
    queryKey: ['works'],
    queryFn: () => fetch('/api/work').then(res => res.json()).then(data => data.allWork)
  })

  const { mutate: deleteWork, isPending } = useMutation({
    mutationFn: (id: string) => {
      return fetch("/api/work/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      })
    },
    onSuccess: () => {
      toast.success("Skill removed successfully")
      queryClient.invalidateQueries({ queryKey: ['works'] })
    },
  })
  const [selectedWork, setSelectedWork] = useState<IWork | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleDelete = (id: string) => {
    deleteWork(id)
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
          {error ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                {error.message}
              </TableCell>
            </TableRow>
          ) : isPending || pendingWork ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : !workData || workData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No work experience found.
              </TableCell>
            </TableRow>
          ) : (
            workData.map((work: IWork) => (
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
          )}
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

