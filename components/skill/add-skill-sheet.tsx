"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { TagInput } from "@/components/ui/tag-input"
import { toast } from "sonner"

export function AddSkillSheet({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [icon, setIcon] = useState("")
  const [tags, setTags] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically save to your database
    console.log({
      title,
      icon,
      tags,
    })

    toast("Skill added", {
      description: `${title} has been added to your skills.`,
    })

    // Reset form and close sheet
    setTitle("")
    setIcon("")
    setTags([])
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-md overflow-y-auto mx-4">
        <SheetHeader>
          <SheetTitle>Add Skill</SheetTitle>
          <SheetDescription>Add a new skill or technology to your portfolio.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-6">
          <div className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                placeholder="React"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="icon" className="text-right">
                Icon
              </Label>
              <Input
                id="icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="col-span-3"
                placeholder="react"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="tags" className="text-right pt-2">
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
            <Button type="submit">Save</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}

