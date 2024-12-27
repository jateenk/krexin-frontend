// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
    const pathname = usePathname();
    const isActive = (href: string) => pathname === href;

    return (
        <nav className="flex items-center justify-between p-4 bg-brand text-white">
            {/* Navigation Links */}
            <div className="flex gap-4">
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
            </div>

            {/* Logo */}
            <div className="flex-shrink-0">
                <Link href="/">
                    <Image
                        src="/logo.jpg" // Replace with your logo path
                        alt="Company Logo"
                        width={40} // Adjust width as needed
                        height={40} // Adjust height as needed
                        className="h-10 w-auto"
                    />
                </Link>
            </div>
        </nav>
    );
}
