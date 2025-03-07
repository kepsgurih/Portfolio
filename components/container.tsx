export default function ContainerCard({ children }: { children: React.ReactNode }) {
    return (
        <section className="md:py-24 bg-muted/10 background-blend-multiply backdrop-filter backdrop-blur-md rounded-xl my-12">
            {children}
        </section>
    )
}