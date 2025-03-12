"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { TagInput } from "@/components/ui/tag-input"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { IProject as IProjectInput } from "@/types"
import { UploadButton } from "@/utils/uploadthing"
import Image from "next/image"

export function EditProjectSheet({
  children,
  project,
}: {
  children: React.ReactNode
  project: IProjectInput
}) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(project.title)
  const [description, setDescription] = useState(project.description)
  const [tags, setTags] = useState<string[]>(project.tags)
  const [image, setImage] = useState(project.image)
  const [githubLink, setGithubLink] = useState(project.githubLink)
  const [demoLink, setDemoLink] = useState(project.demoLink)

  const { mutate: updateProject, isPending } = useMutation({
    mutationFn: async ({ id, title, description, tags, image, githubLink, demoLink }: IProjectInput) => {
      if (!title || !description || tags.length === 0 || !githubLink || !demoLink) {
        throw new Error("All fields are required")
      }

      return fetch("/api/project/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, tags, image, githubLink, demoLink }),
      })
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['projects'] })
      toast.success("Project updated successfully")
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  useEffect(() => {
    setTitle(project.title)
    setDescription(project.description)
    setTags(project.tags)
    setImage(project.image)
    setGithubLink(project.githubLink)
    setDemoLink(project.demoLink)
  }, [project])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    updateProject({
      id: project.id,
      title,
      description,
      tags,
      image,
      githubLink,
      demoLink,
    })
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Project</SheetTitle>
          <SheetDescription>Update the details of this project.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-6 p-4">
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
              <Label htmlFor="edit-description" className="text-right">
                Description
              </Label>
              <Input
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            {image && (
              <div className="col-span-3">
                <Image src={image} alt="Project preview" className="rounded-lg mx-auto" width={100} height={100} />
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-image" className="text-right">
                Image
              </Label>
              <div className="col-span-3">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res[0]?.ufsUrl) {
                      setImage(res[0].ufsUrl)
                      toast.success("Image uploaded successfully")
                    }
                  }}
                  onUploadError={(error) => {
                    toast.error(`Upload failed: ${error.message}`)
                  }}
                />
              </div>
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
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
