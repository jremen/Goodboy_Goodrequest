"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { LangSwitcher } from "../LangSwitcher/LangSwitcher";
import classes from "./Footer.module.css";

const Footer = () => {
  const t = useTranslations("common");

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
        <LangSwitcher />
      </nav>
    </footer>
  );
};

export default memo(Footer);
