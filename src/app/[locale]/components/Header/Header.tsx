"use client";
import { useTranslations } from "next-intl";
import NavigationLink from "@/app/[locale]/components/NavigationLink";
import LocaleSwitcher from "../LocaleSwitcher";
import { useState } from "react";
import { Link } from "@/navigation";
import CloseIcon from "../../../../icons/close-bold-svgrepo-com.svg";
import BurgerIcon from "../../../../icons/menu-burger-horizontal-svgrepo-com.svg";
import logo from "../../../../images/car.png";
import Image from "next/image";
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
    <header className={styles.header}>
      <Link href="/">
        <Image src={logo} alt="logo" width={48} height={48} />
      </Link>
      <button className={styles.burgerButton} onClick={toggleMenu}>
        {isMenuOpen ? (
          <CloseIcon width={30} height={30} />
        ) : (
          <BurgerIcon width={30} height={30} />
        )}
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
