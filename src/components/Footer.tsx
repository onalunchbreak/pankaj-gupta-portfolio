import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-muted/30 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        {/* Footer Brand / Text */}
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Projects
          </Link>
          <Link href="#blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Blog
          </Link>
          <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </div>

        {/* Copyright notice */}
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {currentYear} Pankaj Gupta. All rights reserved. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
