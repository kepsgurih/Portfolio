"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TagInput } from "@/components/ui/tag-input"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UploadButton } from "@/utils/uploadthing"
import Image from "next/image"

export function AddProjectSheet({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [imageUrl, setImageUrl] = useState("")
  const [githubLink, setGithubLink] = useState("")
  const [demoLink, setDemoLink] = useState("")

  const mutation = useMutation({
    mutationFn: async () => {
      if (!title || !description || !githubLink || !demoLink) {
        toast.error("Please fill in all fields")
        return
      }

      const res = await fetch("/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, tags, image: imageUrl, githubLink, demoLink }),
      })

      if (!res.ok) throw new Error("Failed to add project")
    },
    onMutate: () => setLoading(true),
    onSuccess: () => {
      toast.success("Project added successfully")
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      setOpen(false)
      setTitle("")
      setDescription("")
      setTags([])
      setImageUrl("")
      setGithubLink("")
      setDemoLink("")
    },
    onError: (error) => {
      toast.error(error.message)
      setImageUrl("") // Hapus gambar jika gagal
    },
    onSettled: () => setLoading(false),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-md overflow-y-auto mx-4">
        <SheetHeader>
          <SheetTitle>Add Project</SheetTitle>
          <SheetDescription>Add a new project to your portfolio.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mx-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required />

            <Label>Description</Label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} required />

            <Label>Tags</Label>
            <TagInput placeholder="Add tags (press Enter)" tags={tags} setTags={setTags} />

            <Label>Image</Label>
            <UploadButton endpoint="imageUploader" 
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].ufsUrl)
              toast.success("Image uploaded successfully")
            }} 
            onUploadError={(error) => {
              toast.error(`Upload failed: ${error.message}`)
            }}
             />

            {imageUrl && (
              <div className="mt-2">
                <Image src={imageUrl} alt="Uploaded preview" className="w-full h-auto rounded-lg" width={150} height={150} />
              </div>
            )}

            <Label>GitHub Link</Label>
            <Input value={githubLink} onChange={(e) => setGithubLink(e.target.value)} required />

            <Label>Demo Link</Label>
            <Input value={demoLink} onChange={(e) => setDemoLink(e.target.value)} required />

            <div className="flex justify-end space-x-2">
              <Button disabled={loading} type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                {loading ? "Adding..." : "Add"}
              </Button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
