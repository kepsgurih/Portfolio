"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { EditSkillSheet } from "./edit-skill-sheet"
import { useState } from "react"
import { DeleteSkillDialog } from "./delete-skill-dialog"

// This would come from your database in a real app
const mockSkillData = [
  {
    id: "1",
    title: "React",
    icon: "react",
    tags: ["Frontend", "JavaScript", "UI"],
  },
  {
    id: "2",
    title: "Node.js",
    icon: "nodejs",
    tags: ["Backend", "JavaScript", "Server"],
  },
  {
    id: "3",
    title: "TypeScript",
    icon: "typescript",
    tags: ["Frontend", "Backend", "JavaScript"],
  },
]

export function SkillTable() {
  const [skillData, setSkillData] = useState(mockSkillData)
  const [selectedSkill, setSelectedSkill] = useState<(typeof mockSkillData)[0] | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleDelete = (id: string) => {
    setSkillData(skillData.filter((skill) => skill.id !== id))
    setDeleteDialogOpen(false)
  }

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
          {skillData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No skills found.
              </TableCell>
            </TableRow>
          ) : (
            skillData.map((skill) => (
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
                    {skill.tags.length > 2 && <Badge variant="outline">+{skill.tags.length - 2}</Badge>}
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
                        setSelectedSkill(skill)
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

