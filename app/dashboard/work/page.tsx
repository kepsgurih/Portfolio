import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { WorkTable } from "@/components/work/work-table"
import { AddWorkSheet } from "@/components/work/add-work-sheet"

export default function WorkPage() {
    return (
        <div className="space-y-6 p-4 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Work Experience</h1>
                    <p className="text-muted-foreground">Manage your work experience entries.</p>
                </div>
                <AddWorkSheet>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Work Experience
                    </Button>
                </AddWorkSheet>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Work Experience List</CardTitle>
                    <CardDescription>View and manage your work experience entries. Click on an entry to edit.</CardDescription>
                </CardHeader>
                <CardContent>
                    <WorkTable />
                </CardContent>
            </Card>
        </div>
    )
}

