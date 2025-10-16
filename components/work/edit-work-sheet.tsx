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
import { IWork } from "@/types"
import { swapWorkPosition, updateWork } from "@/services/work"



export function EditWorkSheet({
  children,
  work,
  totalWorks
}: {
  children: React.ReactNode
  work: IWork,
  totalWorks: number
}) {

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState(work.title)
  const [period, setPeriod] = useState(work.period)
  const [company, setCompany] = useState(work.company)
  const [location, setLocation] = useState(work.location)
  const [description, setDescription] = useState(work.description)
  const [tags, setTags] = useState<string[]>(work.tags)
  const [pos, setPos] = useState(work.pos)
  const [achievements, setAchievements] = useState<string[]>(work.achievement)

  useEffect(() => {
    setTitle(work.title)
    setPeriod(work.period)
    setCompany(work.company)
    setLocation(work.location)
    setDescription(work.description)
    setTags(work.tags)
    setAchievements(work.achievement)
    setPos(work.pos)
  }, [work])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("company", company)
    formData.append("title", title)
    formData.append("period", period)
    formData.append("location", location)
    formData.append("description", description)
    formData.append("tags", tags.join(","))
    formData.append("achievements", achievements.join(","))
    setLoading(true)
    const updates = await updateWork(work.id as string, formData)
    if (updates.success) {
      setOpen(false)
      setLoading(false)
      window.location.reload()
    } else {
      toast.error(updates.message)
      setLoading(false)
    }
  }

  const swapPosition = async (direction: "up" | "down") => {
    const newPos = direction === "up" ? pos - 1 : pos + 1
    const swap = await swapWorkPosition(work.id as string, newPos)
    if (swap.success) {
      setPos(newPos)
      toast.success("Position swapped")
    } else {
      toast.error(swap.message)
    }

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
              <Label htmlFor="title" className="text-right">
                Position
              </Label>
              <Input
                id="title"
                value={title}
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
                value={period}
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Position Order</Label>
              <div className="col-span-3 flex space-x-2">
                {pos > 1 && (
                  <Button variant="outline" onClick={() => swapPosition("up")}>▲ Up</Button>
                )}
                {pos < totalWorks && (
                  <Button variant="outline" onClick={() => swapPosition("down")}>▼ Down</Button>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button disabled={loading} type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button disabled={loading} type="submit">{loading ? "Updating..." : "Update"}</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}

