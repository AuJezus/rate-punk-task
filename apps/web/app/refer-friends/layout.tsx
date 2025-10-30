import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MenuNav } from "@/components/menu-nav";
import type React from "react";

export default function ReferFriendsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="px-4">
        <div className="mx-auto flex max-w-280 items-start gap-16">
          <aside className="hidden w-64 shrink-0 rounded-[0.5rem] bg-white lg:block">
            <MenuNav />
          </aside>

          <main className="flex w-full flex-col gap-12 md:gap-16">
            {children}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
