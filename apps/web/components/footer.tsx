import Link from "next/link";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "lucide-react";
import { Typography } from "./ui/typography";
import AppQrCode from "@/public/app-qr-code.svg";
import DownloadAppStoreIcon from "@/public/download-app-store.svg";
import DownloadGooglePlayIcon from "@/public/download-google-play.svg";
import RPLogoWhite from "@/public/logo/rp-logo-white.svg";
import TrustpilotLogo from "@/public/logo/trustpilot-logo.svg";
import TrustpilotReview from "@/public/trustpilot-review.svg";
import TrustpilotStars from "@/public/trustpilot-stars.svg";
import { cn } from "@/lib/utils";

const SITEMAP = [
  { href: "/flight-deals", label: "Flight Deals" },
  { href: "/hotels", label: "Hotels" },
  { href: "/extension", label: "Extension" },
  { href: "/press", label: "Press" },
  { href: "/blog", label: "Blog" },
  { href: "/reviews", label: "Reviews" },
];

const FOLLOW_US = [
  {
    href: "https://www.facebook.com/ratepunk",
    label: "Facebook",
    icon: FacebookIcon,
  },
  {
    href: "https://www.instagram.com/ratepunk",
    label: "Instagram",
    icon: InstagramIcon,
  },
  {
    href: "https://www.youtube.com/ratepunk",
    label: "YouTube",
    icon: YoutubeIcon,
  },
];

const CONTACT_US = [
  {
    href: "mailto:hi@ratepunk.com",
    label: "hi@ratepunk.com",
  },
];

const EXTENSIONS = [
  { href: "/chrome-extension", label: "Chrome Extension" },
  { href: "/safari-extension", label: "Safari Extension" },
  { href: "/firefox-extension", label: "Firefox Extension" },
];

const APP_DOWNLOADS = [
  { href: undefined, svg: AppQrCode },
  {
    href: "/download-app-store",
    svg: DownloadAppStoreIcon,
    showOnMobile: true,
  },
  { href: "/download-google-play", svg: DownloadGooglePlayIcon },
];

const POLICIES = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-conditions", label: "Terms & Conditions" },
];

const FooterList = ({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string; icon?: React.ElementType }[];
}) => {
  return (
    <div>
      <Typography className="text-muted-foreground mb-4">{title}</Typography>

      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.href} className="flex items-center gap-2">
            {item.icon && <item.icon className="size-6" />}
            <Link
              href={item.href}
              className="text-base leading-6 transition-colors hover:text-white/80"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export function Footer() {
  return (
    <footer className="mt-16 bg-black px-8 pt-16 pb-12 text-white md:pt-24 md:pb-16">
      <div className="mx-auto max-w-280">
        <div className="mb-16 grid grid-cols-1 gap-y-8 md:mb-24 md:grid-cols-2 lg:grid-cols-4">
          <FooterList title="Sitemap" items={SITEMAP} />

          <div className="flex flex-col gap-8 md:gap-14">
            <FooterList title="Follow us" items={FOLLOW_US} />
            <FooterList title="Contact us" items={CONTACT_US} />
          </div>

          <FooterList title="Get the extension" items={EXTENSIONS} />

          <div>
            <Typography className="text-muted-foreground mb-4">
              Get the app
            </Typography>

            <div className="flex flex-col">
              {APP_DOWNLOADS.map((item, index) =>
                item.href ? (
                  <Link
                    href={item.href}
                    key={item.href}
                    className={cn(
                      "mb-2 hidden last-of-type:mb-0 md:block",
                      item.showOnMobile && "block",
                    )}
                  >
                    <item.svg key={item.href} />
                  </Link>
                ) : (
                  <item.svg
                    key={index}
                    className={cn(
                      "mb-4 hidden md:block",
                      item.showOnMobile && "block",
                    )}
                  />
                ),
              )}
            </div>
          </div>
        </div>

        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <RPLogoWhite />

          <div className="flex items-center gap-4 md:flex-row-reverse">
            <TrustpilotLogo />
            <TrustpilotStars />
            <TrustpilotReview className="hidden md:block" />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-8 md:flex-row-reverse md:items-center md:gap-4">
          <div className="flex items-center gap-4">
            {POLICIES.map((policy) => (
              <Link href={policy.href} key={policy.href}>
                <Typography className="text-muted-foreground text-[0.875rem]">
                  {policy.label}
                </Typography>
              </Link>
            ))}
          </div>

          <Typography className="text-muted-foreground text-[0.875rem]">
            © 2025 RatePunk. All Rights Reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
}
