import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ConfigForm } from "@/components/config/config-form"

export default function ConfigPage() {
    return (
        <div className="space-y-6 p-4 md:p-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Configuration</h1>
                <p className="text-muted-foreground">Manage your portfolio configuration.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Portfolio Configuration</CardTitle>
                    <CardDescription>Update your portfolio details, social media links, and other settings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ConfigForm />
                </CardContent>
            </Card>
        </div>
    )
}