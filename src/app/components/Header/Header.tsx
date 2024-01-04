"use client";
import styles from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link
          href="/"
          className={pathname === "/" ? styles.active : styles.navLink}
        >
          Home
        </Link>
        <Link
          href="/catalog"
          className={pathname === "/catalog" ? styles.active : styles.navLink}
        >
          Catalog
        </Link>
        <Link
          href="/favorites"
          className={pathname === "/favorites" ? styles.active : styles.navLink}
        >
          Favorites
        </Link>
      </nav>
    </header>
  );
}
