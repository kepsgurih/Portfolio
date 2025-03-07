import { Badge } from "../ui/badge";
import { ScrollAnimation } from "../ui/scroll-animation";

export default function HeaderDiv({ title, description, tag }: { title: string, description: string, tag: string }) {
    return (
        <ScrollAnimation>
            <div className="flex flex-col items-center text-center mb-12">
                <Badge variant="outline" className="mb-4 text-primary border-primary">
                    {tag}
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">{title}</h2>
                <p className="mt-4 max-w-[700px] text-secondary md:text-xl">
                    {description}
                </p>
            </div>
        </ScrollAnimation>
    )
}