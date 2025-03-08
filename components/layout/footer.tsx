import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-8">
      <div className="container mx-auto p-[2rem] flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Kevin Adhi Krisma. All rights reserved.
        </p>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <Link href="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Sitemap
          </Link>
        </nav>
      </div>
    </footer>
  )
}

