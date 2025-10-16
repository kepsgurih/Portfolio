"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { IConfig } from "@/types"
import Image from "next/image"
import { Trash } from "lucide-react"
import { getConfig, updateConfig } from "@/services/config"

export function ConfigForm() {
  const [confPending, setConfPending] = useState(false)

  const [config, setConfig] = useState<IConfig>({
    description: "",
    whoami: "",
    journey: "",
    yearsExperience: 0,
    projectCompleted: 0,
    happyClient: 0,
    technologies: 0,
    socialMedia: [],
    contactInfo: [],
    image: "",
    banner: "",
    allowRegister: false,
    code: 100,
  })

  // state untuk file & preview
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [bannerPreview, setBannerPreview] = useState<string>("")

  useEffect(() => {
    const fetchConfig = async () => {
      const config = await getConfig()
      if (config.error) {
        toast.error(config.message)
      } else {
        const { config: dataConfig } = config
        setConfig({
          description: dataConfig?.description ?? "",
          whoami: dataConfig?.whoami ?? "",
          journey: dataConfig?.journey ?? "",
          yearsExperience: dataConfig?.yearsExperience ?? 0,
          projectCompleted: dataConfig?.projectCompleted ?? 0,
          happyClient: dataConfig?.happyClient ?? 0,
          technologies: dataConfig?.technologies ?? 0,
          socialMedia: (dataConfig?.socialMedia as { url: string; icon: string }[]) ?? [],
          contactInfo: (dataConfig?.contactInfo as { label: string; icon: string; value: string }[]) ?? [],
          image: dataConfig?.image ?? "",
          banner: dataConfig?.banner ?? "",
          allowRegister: dataConfig?.allowRegister ?? false,
          code: dataConfig?.code ?? 100,
        })
        setImagePreview(dataConfig?.image ?? "")
        setBannerPreview(dataConfig?.banner ?? "")
      }
    }
    fetchConfig()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.append('description', config.description)
    formData.append('whoami', config.whoami)
    formData.append('journey', config.journey)
    formData.append('yearsExperience', config.yearsExperience.toString())
    formData.append('projectCompleted', config.projectCompleted.toString())
    formData.append('happyClient', config.happyClient.toString())
    formData.append('technologies', config.technologies.toString())
    formData.append('allowRegister', config.allowRegister.toString())
    formData.append('code', config.code.toString())
    if (imageFile) formData.append("image", imageFile)
    if (bannerFile) formData.append("banner", bannerFile)
    formData.append('contactInfo', JSON.stringify(config.contactInfo))
    formData.append('socialMedia', JSON.stringify(config.socialMedia))

    setConfPending(true)

    const res = await updateConfig(formData)
    if (res.error) {
      toast.error(res.message)
      setConfPending(false)
    } else {
      toast.success(res.message)
      setConfPending(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setConfig((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setConfig((prev) => ({ ...prev, [name]: Number(value) || 0 }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "banner") => {
    const file = e.target.files?.[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      if (type === "image") {
        setImageFile(file)
        setImagePreview(previewUrl)
      } else {
        setBannerFile(file)
        setBannerPreview(previewUrl)
      }
    }
  }

  const handleSwitchChange = (checked: boolean) => {
    setConfig((prev) => ({ ...prev, allowRegister: checked }))
  }

  const handleSocialMediaChange = (index: number, field: "icon" | "url", value: string) => {
    setConfig((prev) => {
      const updated = [...(prev.socialMedia ?? [])]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, socialMedia: updated }
    })
  }

  const handleContactInfoChange = (index: number, field: "icon" | "value" | "label", value: string) => {
    setConfig((prev) => {
      const updated = [...(prev.contactInfo ?? [])]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, contactInfo: updated }
    })
  }

  const addSocialMedia = () => {
    setConfig((prev) => ({
      ...prev,
      socialMedia: [...(prev.socialMedia ?? []), { icon: "", url: "" }],
    }))
  }

  const addContactInfo = () => {
    setConfig((prev) => ({
      ...prev,
      contactInfo: [...(prev.contactInfo ?? []), { label: "", icon: "", value: "" }],
    }))
  }

  const removeSocialMedia = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      socialMedia: prev.socialMedia.filter((_, i) => i !== index),
    }))
  }

  const removeContactInfo = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      contactInfo: prev.contactInfo.filter((_, i) => i !== index),
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="media">Images</TabsTrigger>
        </TabsList>

        {/* TAB GENERAL */}
        <TabsContent value="general" className="space-y-4 pt-4">
          <Label>Description</Label>
          <Textarea name="description" value={config.description} onChange={handleChange} />

          <Label>Who Am I</Label>
          <Textarea name="whoami" value={config.whoami} onChange={handleChange} />

          <Label>Journey</Label>
          <Textarea name="journey" value={config.journey} onChange={handleChange} />

          <Card>
            <CardContent className="space-y-2">
              <Label>Years Experience</Label>
              <Input name="yearsExperience" type="number" value={config.yearsExperience} onChange={handleNumberChange} />

              <Label>Projects Completed</Label>
              <Input name="projectCompleted" type="number" value={config.projectCompleted} onChange={handleNumberChange} />

              <Label>Happy Clients</Label>
              <Input name="happyClient" type="number" value={config.happyClient} onChange={handleNumberChange} />

              <Label>Technologies</Label>
              <Input name="technologies" type="number" value={config.technologies} onChange={handleNumberChange} />
            </CardContent>
          </Card>

          <Label>Security Code</Label>
          <Input name="code" type="number" value={config.code} onChange={handleNumberChange} />

          <Label>Allow Registration</Label>
          <Switch checked={config.allowRegister} onCheckedChange={handleSwitchChange} />
        </TabsContent>

        {/* TAB CONTACT */}
        <TabsContent value="contact" className="space-y-4 pt-4">
          {config.contactInfo?.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                placeholder="Label"
                value={item.label}
                onChange={(e) => handleContactInfoChange(index, "label", e.target.value)}
              />
              <Input
                placeholder="Icon name (e.g., github)"
                value={item.icon}
                onChange={(e) => handleContactInfoChange(index, "icon", e.target.value)}
              />
              <Input
                placeholder="URL / Value"
                value={item.value}
                onChange={(e) => handleContactInfoChange(index, "value", e.target.value)}
              />
              <Button size="icon" variant="destructive" type="button" onClick={() => removeContactInfo(index)}>
                <Trash />
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addContactInfo}>
            + Add Contact Info
          </Button>
        </TabsContent>

        {/* TAB SOCIAL */}
        <TabsContent value="social" className="space-y-4 pt-4">
          {config.socialMedia?.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                placeholder="Icon name (e.g., github)"
                value={item.icon}
                onChange={(e) => handleSocialMediaChange(index, "icon", e.target.value)}
              />
              <Input
                placeholder="URL"
                value={item.url}
                onChange={(e) => handleSocialMediaChange(index, "url", e.target.value)}
              />
              <Button size="icon" variant="destructive" type="button" onClick={() => removeSocialMedia(index)}>
                <Trash />
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addSocialMedia}>
            + Add Social Media
          </Button>
        </TabsContent>

        {/* TAB MEDIA */}
        <TabsContent value="media" className="space-y-6 pt-4">
          <div>
            <Label>Profile Picture</Label>
            {imagePreview && (
              <div className="mt-2">
                <Image
                  src={imagePreview}
                  alt="Profile preview"
                  width={150}
                  height={150}
                  className="rounded-md border"
                />
              </div>
            )}
            <Input type="file" name="image" accept="image/*" onChange={(e) => handleFileChange(e, "image")} />
          </div>

          <div>
            <Label>Banner Image</Label>
            {bannerPreview && (
              <div className="mt-2">
                <Image
                  src={bannerPreview}
                  alt="Banner preview"
                  width={300}
                  height={150}
                  className="rounded-md border"
                />
              </div>
            )}
            <Input type="file" name="banner" accept="image/*" onChange={(e) => handleFileChange(e, "banner")} />
          </div>
        </TabsContent>
      </Tabs>

      <Button disabled={confPending} type="submit">
        {confPending ? "Saving..." : "Save"}
      </Button>
    </form>
  )
}
