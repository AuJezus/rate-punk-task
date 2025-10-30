"use client";

import { cn } from "@/lib/utils";
import {
  MapPinIcon,
  PackageIcon,
  PlaneIcon,
  RotateCcwIcon,
  TrendingUpIcon,
  TargetIcon,
  DollarSignIcon,
  UserIcon,
  WalletIcon,
  UsersIcon,
  CalendarIcon,
  TicketIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINK_SECTIONS = [
  {
    title: "Travel Deals",
    items: [
      { name: "Flight Deals", icon: PlaneIcon, href: "/flight-deals" },
      { name: "Bundle Deals", icon: PackageIcon, href: "/bundle-deals" },
      {
        name: "Departure Airports",
        icon: MapPinIcon,
        href: "/departure-airports",
      },
      { name: "Deals Upgrades", icon: TrendingUpIcon, href: "/deals-upgrades" },
    ],
  },
  {
    title: "Saving Tools",
    items: [
      { name: "Price Tracking", icon: TargetIcon, href: "/price-tracking" },
      { name: "Rebooking", icon: RotateCcwIcon, href: "/rebooking" },
      { name: "Cashback", icon: DollarSignIcon, href: "/cashback" },
    ],
  },
  {
    title: "Account",
    items: [
      { name: "My Profile", icon: UserIcon, href: "/profile" },
      { name: "My Wallet", icon: WalletIcon, href: "/wallet" },
      { name: "Refer Friends", icon: UsersIcon, href: "/refer-friends" },
      { name: "My Bookings", icon: CalendarIcon, href: "/bookings" },
      { name: "My Vouchers", icon: TicketIcon, href: "/vouchers" },
    ],
  },
];

export function MenuNav({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 p-4 lg:p-0">
      {LINK_SECTIONS.map((section) => (
        <div key={section.title}>
          <p className="text-muted-foreground px-2 py-3 text-[0.75rem] leading-4 font-semibold lg:px-6">
            {section.title}
          </p>

          <ul>
            {section.items.map((item) => (
              <li
                key={item.name}
                className={cn(
                  "px-2 py-3 transition-colors hover:bg-gray-50 lg:px-6",
                  pathname === item.href && "bg-secondary pl-8 lg:pl-12",
                )}
              >
                <Link
                  href={item.href}
                  onClick={onLinkClick}
                  className="flex gap-4 leading-6 font-semibold"
                >
                  <item.icon className="h-6 w-6" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
