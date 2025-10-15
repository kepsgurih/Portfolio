"use client"

import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TagInput } from "@/components/ui/tag-input"
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/ui/shadcn-io/dropzone"
import Image from "next/image"
import { toast } from "sonner"
import { createNewProject } from "@/services/project"

// Zod schema: title string, description string, tags as a single string,
// image is a File, githubLink string, demoLink string
const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  description: z.string().min(1, { message: "Description is required" }),
  tags: z.string().min(1, { message: "Please provide at least one tag" }),
  image: z
    .instanceof(File)
    .refine((f) => f.size > 0, { message: "Image is required" }),
  githubLink: z.string().min(1, { message: "GitHub link is required" }),
  demoLink: z.string().min(1, { message: "Demo link is required" }),
})

type FormValues = z.infer<typeof formSchema>

export function AddProjectSheet({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tagsArray, setTagsArray] = useState<string[]>([]) // UI tag input expects array
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: "",
      image: undefined as unknown as File,
      githubLink: "",
      demoLink: "",
    },
  })

  // Keep watch on image to update preview
  const watchedImage = watch("image")

  useEffect(() => {
    if (watchedImage instanceof File) {
      const url = URL.createObjectURL(watchedImage)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPreviewUrl(null)
    }
  }, [watchedImage])

  // Dropzone handler: picks first file and set to form
  const handleDrop = (files: File[]) => {
    if (!files || files.length === 0) return
    const file = files[0]
    setValue("image", file, { shouldValidate: true, shouldDirty: true })
  }

  // Convert tags array (UI) into comma separated string for zod schema
  useEffect(() => {
    setValue("tags", tagsArray.join(","))
  }, [tagsArray, setValue])

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    try {
      // Example: build FormData for upload or prepare payload
      const payload = new FormData()
      payload.append("title", data.title)
      payload.append("description", data.description)
      payload.append("tags", data.tags)
      payload.append("image", data.image)
      payload.append("githubLink", data.githubLink)
      payload.append("demoLink", data.demoLink)

      // Replace the following with your upload/api call
      await createNewProject(payload)

      toast?.success?.("Project added") 
      reset()
      setTagsArray([])
      setOpen(false)
    } catch (err) {
      console.error(err)
      toast?.error?.("Failed to add project")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-md overflow-y-auto mx-4">
        <SheetHeader>
          <SheetTitle>Add Project</SheetTitle>
          <SheetDescription>Add a new project to your portfolio.</SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 mx-2">
            <Label>Title</Label>
            <Input {...register("title")} aria-invalid={!!errors.title} />
            {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}

            <Label>Description</Label>
            <Input {...register("description")} aria-invalid={!!errors.description} />
            {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}

            <Label>Tags</Label>
            <TagInput
              placeholder="Add tags (press Enter)"
              tags={tagsArray}
              setTags={setTagsArray}
            />
            {errors.tags && <p className="text-sm text-red-600">{errors.tags.message}</p>}

            <Label>Image</Label>
            <Dropzone
              accept={{ "image/*": [] }}
              maxFiles={1}
              maxSize={1024 * 1024 * 10}
              minSize={1024}
              onDrop={handleDrop}
              onError={console.error}
            >
              <DropzoneEmptyState />
              <DropzoneContent />
            </Dropzone>
            {previewUrl && (
              <div className="mt-2">
                <Image
                  src={previewUrl}
                  alt="Uploaded preview"
                  className="w-full h-auto rounded-lg"
                  width={150}
                  height={150}
                />
              </div>
            )}
            {errors.image && <p className="text-sm text-red-600">{errors.image.message}</p>}

            <Label>GitHub Link</Label>
            <Input {...register("githubLink")} aria-invalid={!!errors.githubLink} />
            {errors.githubLink && <p className="text-sm text-red-600">{errors.githubLink.message}</p>}

            <Label>Demo Link</Label>
            <Input {...register("demoLink")} aria-invalid={!!errors.demoLink} />
            {errors.demoLink && <p className="text-sm text-red-600">{errors.demoLink.message}</p>}

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