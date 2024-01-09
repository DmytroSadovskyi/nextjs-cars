"use client";
import styles from "./Header.module.css";
import { useTranslations } from "next-intl";
import NavigationLink from "@/app/[locale]/components/NavigationLink";
import LocaleSwitcher from "../LocaleSwitcher";
import { useState } from "react";

export default function Header() {
  const t = useTranslations("header");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <header className={styles.header}>
      <button className={styles.burgerButton} onClick={toggleMenu}>
        {isMenuOpen ? "X" : "☰"}
      </button>

      <nav className={styles.nav}>
        <NavigationLink href="/">{t("home")}</NavigationLink>
        <NavigationLink href="/catalog">{t("catalog")}</NavigationLink>
        <NavigationLink href="/favorites">{t("favorites")}</NavigationLink>
        <LocaleSwitcher />
      </nav>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <NavigationLink href="/" onClick={closeMenu}>
            {t("home")}
          </NavigationLink>
          <NavigationLink href="/catalog" onClick={closeMenu}>
            {t("catalog")}
          </NavigationLink>
          <NavigationLink href="/favorites" onClick={closeMenu}>
            {t("favorites")}
          </NavigationLink>
          <LocaleSwitcher />
        </div>
      )}
    </header>
  );
}
