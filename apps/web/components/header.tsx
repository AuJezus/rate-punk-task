"use client";

import Link from "@/components/ui/link";
import { Menu } from "lucide-react";
import { MobileMenu } from "./mobile-menu";
import { useState } from "react";
import RPLogo from "@/public/logo/rp-logo.svg";

const LINKS = [
  { href: "/hotels", label: "Hotels" },
  { href: "/extension", label: "Extension" },
  { href: "/press", label: "Press" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center lg:px-4">
        <header className="mb-12 flex w-full max-w-280 items-center justify-between bg-white p-4 lg:mt-4 lg:mb-12 lg:rounded-[0.5rem] lg:px-6 lg:py-3">
          <div className="flex gap-8">
            <Link href="/">
              <RPLogo />
            </Link>

            <nav className="hidden items-center md:flex">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-foreground/80 mx-4"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </header>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
