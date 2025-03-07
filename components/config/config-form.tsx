"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"

// This would come from your database in a real app
const mockConfigData = {
    id: "1",
    description: "Full-stack developer with expertise in React, Node.js, and TypeScript.",
    whoami: "I'm a passionate developer who loves building web applications.",
    journey: "Started coding at 15, graduated with a CS degree, and have been working professionally for 5 years.",
    yearsExperience: 5,
    projectCompleted: 25,
    happyClient: 15,
    technologies: 12,
    socialMedia: {
        github: "https://github.com/username",
        linkedin: "https://linkedin.com/in/username",
        twitter: "https://twitter.com/username",
    },
    contactInfo: {
        email: "email@example.com",
        phone: "+1234567890",
        location: "New York, NY",
    },
    allowRegister: false,
    code: 100,
}

export function ConfigForm() {
    const [config, setConfig] = useState(mockConfigData)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        toast("Configuration updated", {
            description: "Your portfolio configuration has been updated.",
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setConfig((prev) => ({ ...prev, [name]: value }))
    }

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setConfig((prev) => ({ ...prev, [name]: Number.parseInt(value) || 0 }))
    }

    const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setConfig((prev) => ({
            ...prev,
            socialMedia: {
                ...prev.socialMedia,
                [name]: value,
            },
        }))
    }

    const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setConfig((prev) => ({
            ...prev,
            contactInfo: {
                ...prev.contactInfo,
                [name]: value,
            },
        }))
    }

    const handleSwitchChange = (checked: boolean) => {
        setConfig((prev) => ({
            ...prev,
            allowRegister: checked,
        }))
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <Tabs defaultValue="general">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="social">Social Media</TabsTrigger>
                    <TabsTrigger value="contact">Contact Info</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4 pt-4">
                    <div className="grid gap-4">
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="description" className="text-right pt-2">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={config.description}
                                onChange={handleChange}
                                className="col-span-3"
                                rows={2}
                            />
                        </div>

                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="whoami" className="text-right pt-2">
                                Who Am I
                            </Label>
                            <Textarea
                                id="whoami"
                                name="whoami"
                                value={config.whoami}
                                onChange={handleChange}
                                className="col-span-3"
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="journey" className="text-right pt-2">
                                Journey
                            </Label>
                            <Textarea
                                id="journey"
                                name="journey"
                                value={config.journey}
                                onChange={handleChange}
                                className="col-span-3"
                                rows={4}
                            />
                        </div>
                    </div>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="yearsExperience">Years Experience</Label>
                                    <Input
                                        id="yearsExperience"
                                        name="yearsExperience"
                                        type="number"
                                        value={config.yearsExperience}
                                        onChange={handleNumberChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="projectCompleted">Projects Completed</Label>
                                    <Input
                                        id="projectCompleted"
                                        name="projectCompleted"
                                        type="number"
                                        value={config.projectCompleted}
                                        onChange={handleNumberChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="happyClient">Happy Clients</Label>
                                    <Input
                                        id="happyClient"
                                        name="happyClient"
                                        type="number"
                                        value={config.happyClient}
                                        onChange={handleNumberChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="technologies">Technologies</Label>
                                    <Input
                                        id="technologies"
                                        name="technologies"
                                        type="number"
                                        value={config.technologies}
                                        onChange={handleNumberChange}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="code" className="text-right">
                            Security Code
                        </Label>
                        <Input
                            id="code"
                            name="code"
                            type="number"
                            value={config.code}
                            onChange={handleNumberChange}
                            className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="allowRegister" className="text-right">
                            Allow Registration
                        </Label>
                        <div className="flex items-center space-x-2">
                            <Switch id="allowRegister" checked={config.allowRegister} onCheckedChange={handleSwitchChange} />
                            <span className="text-sm text-muted-foreground">{config.allowRegister ? "Enabled" : "Disabled"}</span>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="social" className="space-y-4 pt-4">
                    <div className="grid gap-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="github" className="text-right">
                                GitHub
                            </Label>
                            <Input
                                id="github"
                                name="github"
                                value={config.socialMedia?.github || ""}
                                onChange={handleSocialMediaChange}
                                className="col-span-3"
                                placeholder="https://github.com/username"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="linkedin" className="text-right">
                                LinkedIn
                            </Label>
                            <Input
                                id="linkedin"
                                name="linkedin"
                                value={config.socialMedia?.linkedin || ""}
                                onChange={handleSocialMediaChange}
                                className="col-span-3"
                                placeholder="https://linkedin.com/in/username"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="twitter" className="text-right">
                                Twitter
                            </Label>
                            <Input
                                id="twitter"
                                name="twitter"
                                value={config.socialMedia?.twitter || ""}
                                onChange={handleSocialMediaChange}
                                className="col-span-3"
                                placeholder="https://twitter.com/username"
                            />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4 pt-4">
                    <div className="grid gap-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={config.contactInfo?.email || ""}
                                onChange={handleContactInfoChange}
                                className="col-span-3"
                                placeholder="email@example.com"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">
                                Phone
                            </Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={config.contactInfo?.phone || ""}
                                onChange={handleContactInfoChange}
                                className="col-span-3"
                                placeholder="+1234567890"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="location" className="text-right">
                                Location
                            </Label>
                            <Input
                                id="location"
                                name="location"
                                value={config.contactInfo?.location || ""}
                                onChange={handleContactInfoChange}
                                className="col-span-3"
                                placeholder="New York, NY"
                            />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            <div className="flex justify-end">
                <Button type="submit">Save Changes</Button>
            </div>
        </form>
    )
}

