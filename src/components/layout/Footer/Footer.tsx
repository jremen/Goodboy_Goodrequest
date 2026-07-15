"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import Image from "next/image";
import Link from "next/link";
import classes from "./Footer.module.css";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={classes.footer}>
      <Link href="/">
        <div>
          <Image
            src="/logo.svg"
            alt={t("footer.logoAlt")}
            width={124}
            height={32}
          />
        </div>
      </Link>
      <nav>
        <Link href="/contact">{t("footer.contact")}</Link>
        <Link href="/about">{t("footer.about")}</Link>
      </nav>
    </footer>
  );
}
