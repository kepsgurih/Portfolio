"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { TagInput } from "@/components/ui/tag-input"
import { toast } from "sonner"


interface SkillData {
  id: string
  title: string
  icon: string
  tags: string[]
}

export function EditSkillSheet({
  children,
  skill,
}: {
  children: React.ReactNode
  skill: SkillData
}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(skill.title)
  const [icon, setIcon] = useState(skill.icon)
  const [tags, setTags] = useState<string[]>(skill.tags)

  // Update form when skill prop changes
  useEffect(() => {
    setTitle(skill.title)
    setIcon(skill.icon)
    setTags(skill.tags)
  }, [skill])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically update your database
    console.log({
      id: skill.id,
      title,
      icon,
      tags,
    })

    toast('Skill updated', {
      description: `${title} has been updated.`,
    })

    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Skill</SheetTitle>
          <SheetDescription>Update the details of this skill.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-6">
          <div className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-title" className="text-right">
                Title
              </Label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-icon" className="text-right">
                Icon
              </Label>
              <Input
                id="edit-icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="edit-tags" className="text-right pt-2">
                Tags
              </Label>
              <div className="col-span-3">
                <TagInput placeholder="Add tags (press Enter)" tags={tags} setTags={setTags} className="w-full" />
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}

