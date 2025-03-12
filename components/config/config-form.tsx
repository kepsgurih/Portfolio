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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { IConfig } from "@/types"
import { UploadButton } from "@/utils/uploadthing"
import Image from "next/image"
import { Trash } from "lucide-react"

export function ConfigForm() {
    const queryClient = useQueryClient()

    const { data: confData, isPending: confPending, isLoading } = useQuery<IConfig>({
        queryKey: ["config"],
        queryFn: async () => {
            const res = await fetch("/api/config")
            if (!res.ok) throw new Error("Failed to fetch config")
            return res.json()
        },
    })

    const [config, setConfig] = useState<IConfig>({
        description: "",
        whoami: "",
        journey: "",
        yearsExperience: 0,
        projectCompleted: 0,
        happyClient: 0,
        technologies: 0,
        socialMedia: [], // Pastikan ini array kosong
        contactInfo: [], // Pastikan ini array kosong
        image: "",
        banner: "",
        allowRegister: false,
        code: 100,
    })


    useEffect(() => {
        if (confData) {
            setConfig((prev) => ({
                ...prev,
                ...confData,
                socialMedia: confData.socialMedia ?? [], // Jika undefined, fallback ke []
                contactInfo: confData.contactInfo ?? [], // Jika undefined, fallback ke []
            }))
        }
    }, [confData])

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const filteredConfig = {
                ...config,
                socialMedia: config.socialMedia.filter(item => item.icon || item.url), // Hanya kirim jika ada isi
                contactInfo: config.contactInfo.filter(item => item.icon || item.value), // Hanya kirim jika ada isi
            }

            const res = await fetch(`/api/config`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(filteredConfig),
            })
            if (!res.ok) throw new Error("Failed to update config")
        },
        onSuccess: () => {
            toast.success("Configuration updated")
            queryClient.invalidateQueries({ queryKey: ["config"] })
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutate()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setConfig((prev) => ({ ...prev, [name]: value }))
    }

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setConfig((prev) => ({ ...prev, [name]: Number(value) || 0 }))
    }

    const handleSocialMediaChange = (index: number, field: 'icon' | 'url', value: string) => {
        setConfig((prev) => {
            const updated = [...(prev.socialMedia ?? [])]
            updated[index] = { ...updated[index], [field]: value }
            return { ...prev, socialMedia: updated }
        })
    }

    const handleContactInfoChange = (index: number, field: 'icon' | 'value' | 'label', value: string) => {
        setConfig((prev) => {
            const updated = [...(prev.contactInfo ?? [])]
            updated[index] = { ...updated[index], [field]: value }
            return { ...prev, contactInfo: updated }
        })
    }

    const removeSocialMedia = (index: number) => {
        setConfig(prev => ({
            ...prev,
            socialMedia: prev.socialMedia.filter((_, i) => i !== index)
        }))
    }

    const removeContactInfo = (index: number) => {
        setConfig(prev => ({
            ...prev,
            contactInfo: prev.contactInfo.filter((_, i) => i !== index)
        }))
    }

    const handleSwitchChange = (checked: boolean) => {
        setConfig((prev) => ({ ...prev, allowRegister: checked }))
    }

    const addSocialMedia = () => {
        setConfig((prev) => ({
            ...prev,
            socialMedia: [...prev.socialMedia, { icon: "", url: "" }],
        }))
    }

    const addContactInfo = () => {
        setConfig((prev) => ({
            ...prev,
            contactInfo: [...prev.contactInfo, { value: "", icon: "", label: "" }],
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
                        <CardContent>
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

                <TabsContent value="contact" className="space-y-4 pt-4">
                    {config?.contactInfo?.map((item, index) => (
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
                                placeholder="URL"
                                value={item.value}
                                onChange={(e) => handleContactInfoChange(index, "value", e.target.value)}
                            />
                            <Button
                                size={'icon'}
                                variant={'destructive'}
                                onClick={() => removeContactInfo(index)}
                            >
                                <Trash />
                            </Button>
                        </div>
                    ))}
                    <Button onClick={addContactInfo} type="button">+ Add Contact Info</Button>
                </TabsContent>

                <TabsContent value="social" className="space-y-4 pt-4">
                    {config?.socialMedia?.map((item, index) => (
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
                            <Button
                                size={'icon'}
                                variant={'destructive'}
                                onClick={() => removeSocialMedia(index)}
                            >
                                <Trash />
                            </Button>
                        </div>
                    ))}
                    <Button onClick={addSocialMedia} type="button">+ Add Social Media</Button>
                </TabsContent>

                <TabsContent value="media" className="space-y-4 pt-4">
                    <Label>Profile Picture</Label>
                    {config?.image && (
                        <div className="mt-2">
                            <Image src={config?.image} alt="Uploaded preview" width={150} height={150} />
                        </div>
                    )}
                    <UploadButton endpoint="avatarAndBanner"
                        onClientUploadComplete={(res) => {
                            if (res) {
                                setConfig((prev) => ({
                                    ...prev,
                                    image: res[0].ufsUrl,
                                }))
                            }
                        }}
                        onUploadError={(error) => {
                            toast.error(`Upload failed: ${error.message}`)
                        }}
                    />
                    <Label>Image Banner</Label>
                    {config?.banner && (
                        <div className="mt-2">
                            <Image src={config?.banner} alt="Uploaded preview" width={150} height={150} />
                        </div>
                    )}
                    <UploadButton endpoint="avatarAndBanner"
                        onClientUploadComplete={(res) => {
                            if (res) {
                                setConfig((prev) => ({
                                    ...prev,
                                    banner: res[0].ufsUrl,
                                }))
                            }
                        }}
                        onUploadError={(error) => {
                            toast.error(`Upload failed: ${error.message}`)
                        }}
                    />
                </TabsContent>
            </Tabs>

            <Button disabled={isPending || confPending || isLoading} type="submit">
                {confPending || isLoading ? "Saving..." : "Save"}
            </Button>
        </form>
    )
}
