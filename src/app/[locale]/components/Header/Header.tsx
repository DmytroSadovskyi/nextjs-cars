"use client";
import styles from "./Header.module.css";
import { useTranslations } from "next-intl";
import NavigationLink from "@/app/[locale]/components/NavigationLink";
import LocaleSwitcher from "../LocaleSwitcher";

export default function Header() {
  const t = useTranslations("header");

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavigationLink href="/">{t("home")}</NavigationLink>
        <NavigationLink href="/catalog">{t("catalog")}</NavigationLink>
        <NavigationLink href="/favorites">{t("favorites")}</NavigationLink>
        <LocaleSwitcher />
      </nav>
    </header>
  );
}
