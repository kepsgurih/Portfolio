"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Code, Settings, Users, FileCheck, Laptop } from "lucide-react"
import Link from "next/link"

export default function Home() {
    const stats = {
        yearsExperience: 5,
        projectCompleted: 25,
        happyClient: 15,
        technologies: 12,
    }

    return (
        <div className="space-y-6 p-4 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight ">Dashboard</h1>
                    <p className="">Manage your portfolio data from here.</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className=" ">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-white">Years Experience</CardTitle>
                        <Briefcase className="h-4 w-4 " />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.yearsExperience}</div>
                    </CardContent>
                </Card>
                <Card className=" ">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-white">Projects Completed</CardTitle>
                        <FileCheck className="h-4 w-4 " />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.projectCompleted}</div>
                    </CardContent>
                </Card>
                <Card className=" ">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-white">Happy Clients</CardTitle>
                        <Users className="h-4 w-4 " />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.happyClient}</div>
                    </CardContent>
                </Card>
                <Card className=" ">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-white">Technologies</CardTitle>
                        <Laptop className="h-4 w-4 " />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.technologies}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className=" ">
                    <CardHeader>
                        <CardTitle>Work Experience</CardTitle>
                        <CardDescription className="">Manage your work experience entries</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-end">
                        <Button asChild>
                            <Link href="/work">
                                <Briefcase className="mr-2 h-4 w-4" />
                                Manage Work
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className=" ">
                    <CardHeader>
                        <CardTitle>Skills</CardTitle>
                        <CardDescription className="">Manage your skills and technologies</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-end">
                        <Button asChild>
                            <Link href="/skill">
                                <Code className="mr-2 h-4 w-4" />
                                Manage Skills
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className=" ">
                    <CardHeader>
                        <CardTitle>Configuration</CardTitle>
                        <CardDescription className="">Update your portfolio configuration</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-end">
                        <Button asChild>
                            <Link href="/config">
                                <Settings className="mr-2 h-4 w-4" />
                                Edit Config
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

