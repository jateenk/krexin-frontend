// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const isActive = (href: string) => pathname === href;

    return (
        <nav className="flex gap-4 p-4 bg-brand text-white">
            <Link
                href="/"
                className={
                    isActive("/")
                        ? "font-bold border-b-2 border-white"
                        : ""
                }
            >
                Home
            </Link>
            <Link
                href="/assets"
                className={
                    isActive("/assets")
                        ? "font-bold border-b-2 border-white"
                        : ""
                }
            >
                Assets
            </Link>
            <Link
                href="/liabilities"
                className={
                    isActive("/liabilities")
                        ? "font-bold border-b-2 border-white"
                        : ""
                }
            >
                Liabilities
            </Link>
            <Link
                href="/risk"
                className={
                    isActive("/risk")
                        ? "font-bold border-b-2 border-white"
                        : ""
                }
            >
                Risk
            </Link>
            <Link
                href="/credit-matrix"
                className={
                    isActive("/credit-matrix")
                        ? "font-bold border-b-2 border-white"
                        : ""
                }
            >
                Credit Matrix
            </Link>
        </nav>
    );
}
