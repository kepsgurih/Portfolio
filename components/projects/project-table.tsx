"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { EditProjectSheet } from "./edit-project-sheet"
import { useState } from "react"
import { DeleteProjectDialog } from "./delete-project-dialog"
import { IProject } from "@/types"
import Image from "next/image"

export function ProjectTable({ project }: { project: IProject[] }) {
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="hidden md:table-cell">Tags</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {project.length > 0 && project.map((project: IProject) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium"><Image src={project.image} alt={project.title} width={100} height={100} className="rounded-md" /></TableCell>
              <TableCell className="font-medium">{project.title}</TableCell>
              <TableCell>{project?.description.length > 50
                ? project?.description.slice(0, 50) + "..."
                : project?.description}</TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 2 && (
                    <Badge variant="outline">+{project.tags.length - 2}</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <EditProjectSheet project={project}>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </EditProjectSheet>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedProject(project);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedProject && (
        <DeleteProjectDialog
          project={selectedProject}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        />
      )}
    </div>
  )
}
