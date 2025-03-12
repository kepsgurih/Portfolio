import { AddProjectSheet } from "@/components/projects/add-project-sheet"
import { ProjectTable } from "@/components/projects/project-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { Suspense } from "react"

export default function Page() {
    return (
        <div className="space-y-6 p-4 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Project</h1>
                    <p className="text-muted-foreground">Manage your projects</p>
                </div>
                <AddProjectSheet>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Project
                    </Button>
                </AddProjectSheet>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Project List</CardTitle>
                    <CardDescription>View and manage your projects. Click on a project to edit.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ProjectTable />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    )
}

