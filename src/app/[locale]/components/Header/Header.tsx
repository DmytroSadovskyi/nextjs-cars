"use client";
import { Squash as Hamburger } from "hamburger-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import { Link } from "@/navigation";
import NavigationLink from "@/app/[locale]/components/NavigationLink";
import logo from "../../../../images/icons8-car-windows-11-color-96.png";
import LocaleSwitcher from "../LocaleSwitcher";
import styles from "./Header.module.css";

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
    <>
      <header className={styles.header}>
        <Link href="/">
          <Image
            priority={true}
            className={styles.logo}
            src={logo}
            alt="logo"
            width={30}
            height={30}
          />
        </Link>

        <Hamburger
          toggled={isMenuOpen}
          toggle={toggleMenu}
          size={28}
          hideOutline={false}
          label="menu-icon"
        />

        <nav className={styles.nav}>
          <NavigationLink href="/">{t("home")}</NavigationLink>
          <NavigationLink href="/catalog">{t("catalog")}</NavigationLink>
          <NavigationLink href="/favorites">{t("favorites")}</NavigationLink>
          <LocaleSwitcher />
        </nav>
      </header>
      <AnimatePresence initial={false} onExitComplete={() => null}>
        {isMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: "-100%" }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
