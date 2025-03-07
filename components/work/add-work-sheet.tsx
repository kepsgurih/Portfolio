"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { TagInput } from "../ui/tag-input"
import { toast } from "sonner"

export function AddWorkSheet({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [company, setCompany] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [position, setPosition] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [achievements, setAchievements] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically save to your database
    console.log({
      company,
      location,
      description,
      pos: Number.parseInt(position),
      tags,
      achievement: achievements,
    })

    toast("Work experience added", {
      description: `${company} has been added to your work experience.`,
    })

    // Reset form and close sheet
    setCompany("")
    setLocation("")
    setDescription("")
    setPosition("")
    setTags([])
    setAchievements([])
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add Work Experience</SheetTitle>
          <SheetDescription>Add a new work experience entry to your portfolio.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-6">
          <div className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Position
              </Label>
              <Input
                id="position"
                type="number"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="col-span-3"
                placeholder="1"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">
                Company
              </Label>
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="col-span-3"
                placeholder="Acme Inc"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="col-span-3"
                placeholder="New York, NY"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                placeholder="Describe your role and responsibilities"
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
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="achievements" className="text-right pt-2">
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
            <Button type="submit">Save</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}

