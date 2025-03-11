"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { EditSkillSheet } from "./edit-skill-sheet"
import { useState } from "react"
import { DeleteSkillDialog } from "./delete-skill-dialog"
import { ISkill } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function SkillTable() {
  const queryClient = useQueryClient()
  const [selectedSkill, setSelectedSkill] = useState<ISkill | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
  const [page, setPage] = useState(1)
  const limit = 10

  const { data: skillData, error, isPending } = useQuery({
    queryKey: ['skills', page, limit],
    queryFn: () =>
      fetch(`/api/skill?page=${page}&limit=${limit}`)
        .then(res => res.json())
        .then(data => data),
  })

  
  const maxPage = skillData?.totalPage || 1;


  const { mutate: deleteSkill, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => {
      return fetch("/api/skill/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      })
    },
    onSuccess: () => {
      toast.success("Skill removed successfully")
      queryClient.invalidateQueries({ queryKey: ['skills', page, limit] })
    },
  })

  const handleDelete = (id: string) => {
    deleteSkill(id)
    setDeleteDialogOpen(false)
  }

  // Fetch skill data dengan pagination


  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Icon</TableHead>
            <TableHead className="hidden md:table-cell">Tags</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {error ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                {error.message}
              </TableCell>
            </TableRow>
          ) : isPending || isDeleting ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : !skillData?.allSkill || skillData.allSkill.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No skills found.
              </TableCell>
            </TableRow>
          ) : (
            skillData.allSkill.map((skill: ISkill) => (
              <TableRow key={skill.id}>
                <TableCell className="font-medium">{skill.title}</TableCell>
                <TableCell>{skill.icon}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {skill.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                    {skill.tags.length > 2 && (
                      <Badge variant="outline">+{skill.tags.length - 2}</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <EditSkillSheet skill={skill}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </EditSkillSheet>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedSkill(skill);
                        setDeleteDialogOpen(true);
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

      {/* Pagination Controls */}
      <div className="flex justify-between p-4">
        <Button
          variant="outline"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="text-sm">Page {page}</span>
        <Button
          variant="outline"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= maxPage} // Pastikan tidak melebihi halaman terakhir
        >
          Next
        </Button>

      </div>

      {selectedSkill && (
        <DeleteSkillDialog
          skill={selectedSkill}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onDelete={() => handleDelete(selectedSkill.id)}
        />
      )}
    </div>
  )
}
