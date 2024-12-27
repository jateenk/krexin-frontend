// components/Footer.tsx
"use client";

import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-brand py-4 mt-auto">
            {/*
        bg-brand  -> uses your Tailwind-defined brand color
        py-4      -> vertical padding
        mt-auto   -> pushes footer to bottom if using flex layout in the parent
      */}
            <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4">
                <Image
                    src="/logo.jpg" // or /logo.jpeg if that's your file
                    alt="My Logo"
                    width={100}
                    height={50}
                />
                <p className="text-white">© {new Date().getFullYear()} My Company Name</p>
            </div>
        </footer>
    );
}
