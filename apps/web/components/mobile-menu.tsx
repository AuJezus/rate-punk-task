"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import RPLogo from "@/public/logo/rp-logo.svg";
import { MenuNav } from "./menu-nav";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 overflow-y-auto bg-white">
        <div className="flex items-center justify-between p-4">
          <RPLogo />
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <MenuNav onLinkClick={onClose} />
      </div>
    </div>
  );
}
