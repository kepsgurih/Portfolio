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
import { addWork } from "@/services/work"

export function AddWorkSheet({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [company, setCompany] = useState("")
  const [title, setTitle] = useState("")
  const [period, setPeriod] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [achievements, setAchievements] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append("company", company)
    formData.append("title", title)
    formData.append("period", period)
    formData.append("location", location)
    formData.append("description", description)
    formData.append("tags", tags.join(","))
    formData.append("achievements", achievements.join(","))

    const addWorks = await addWork(formData)
    if (addWorks.success) {
      setCompany("")
      setLocation("")
      setDescription("")
      setTags([])
      setAchievements([])
      setOpen(false)
      setLoading(false)
    } else {
      toast.error(addWorks.message)
      setLoading(false)
    }
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
              <Label htmlFor="title" className="text-right">
                Position
              </Label>
              <Input
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                placeholder="Full Stack Developer"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="period" className="text-right">
                Period
              </Label>
              <Input
                id="period"
                onChange={(e) => setPeriod(e.target.value)}
                className="col-span-3"
                placeholder="2022 - Present"
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
            <Button disabled={loading} type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button disabled={loading} type="submit">{loading ? "Saving..." : "Save"}</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}

