// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
    title: "My App",
    description: "Some description",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Keep the NavBar at the top */}
        <Navbar />

        {/* Main content grows to fill the available space */}
        <main style={{ flex: "1" }}>{children}</main>

        {/* Footer at the bottom */}
        <Footer />
        </body>
        </html>
    );
}
