"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { TagInput } from "../ui/tag-input"
import { toast } from "sonner"

interface WorkData {
  id: string
  company: string
  location: string
  description: string
  tags: string[]
  achievement: string[]
  pos: number
}

export function EditWorkSheet({
  children,
  work,
}: {
  children: React.ReactNode
  work: WorkData
}) {
  const [open, setOpen] = useState(false)
  const [company, setCompany] = useState(work.company)
  const [location, setLocation] = useState(work.location)
  const [description, setDescription] = useState(work.description)
  const [position, setPosition] = useState(work.pos.toString())
  const [tags, setTags] = useState<string[]>(work.tags)
  const [achievements, setAchievements] = useState<string[]>(work.achievement)

  // Update form when work prop changes
  useEffect(() => {
    setCompany(work.company)
    setLocation(work.location)
    setDescription(work.description)
    setPosition(work.pos.toString())
    setTags(work.tags)
    setAchievements(work.achievement)
  }, [work])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically update your database
    console.log({
      id: work.id,
      company,
      location,
      description,
      pos: Number.parseInt(position),
      tags,
      achievement: achievements,
    })

    toast("Work experience updated", {
      description: `${company} has been updated.`,
    })

    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Work Experience</SheetTitle>
          <SheetDescription>Update the details of this work experience entry.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-6">
          <div className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-position" className="text-right">
                Position
              </Label>
              <Input
                id="edit-position"
                type="number"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-company" className="text-right">
                Company
              </Label>
              <Input
                id="edit-company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-location" className="text-right">
                Location
              </Label>
              <Input
                id="edit-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="edit-description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="edit-achievements" className="text-right pt-2">
                Achievements
              </Label>
              <div className="col-span-3">
                <TagInput
                  placeholder="Add achievements (press Enter)"
                  tags={achievements}
                  setTags={setAchievements}
                  className="w-full"
                />
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

