import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { SkillTable } from "@/components/skill/skill-table"
import { AddSkillSheet } from "@/components/skill/add-skill-sheet"

export default function SkillPage() {
    return (
        <div className="space-y-6 p-4 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
                    <p className="text-muted-foreground">Manage your skills and technologies.</p>
                </div>
                <AddSkillSheet>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Skill
                    </Button>
                </AddSkillSheet>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Skills List</CardTitle>
                    <CardDescription>View and manage your skills. Click on a skill to edit.</CardDescription>
                </CardHeader>
                <CardContent>
                    <SkillTable />
                </CardContent>
            </Card>
        </div>
    )
}

