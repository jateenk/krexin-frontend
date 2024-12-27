// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
    const pathname = usePathname();

    // A helper function to highlight the active link
    const isActive = (href: string) => pathname === href;

    return (
        <nav className={styles.navbar}>
            <Link href="/" className={isActive('/') ? styles.active : ''}>
                Home
            </Link>
            <Link
                href="/assets"
                className={isActive('/assets') ? styles.active : ''}>
                Assets
            </Link>
            <Link
                href="/liabilities"
                className={isActive('/liabilities') ? styles.active : ''}>
                Liabilities
            </Link>
            <Link
                href="/risk"
                className={isActive('/risk') ? styles.active : ''}>
                Risk
            </Link>
            <Link
                href="/credit-matrix"
                className={isActive('/credit-matrix') ? styles.active : ''}>
                Credit Matrix
            </Link>
        </nav>
    );
}
