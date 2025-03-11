export default function ContainerCard({ children }: { children: React.ReactNode }) {
    return (
        <section className="md:py-24 mx-8 md:mx-0 bg-card background-blend-multiply backdrop-filter backdrop-blur-md rounded-xl my-12">
            {children}
        </section>
    )
}