"use client";

import { useDisclosure } from "@mantine/hooks";
import { IconMenu2 } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useRef } from "react";
import { LangSwitcher } from "../LangSwitcher/LangSwitcher";
import classes from "./Header.module.css";

const Header = () => {
  const t = useTranslations("common");
  const [opened, { toggle, close }] = useDisclosure(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!opened) return;
    const listener = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        wrapperRef.current?.contains(target) ||
        listboxRef.current?.contains(target)
      ) {
        return;
      }
      close();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [opened, close]);

  useEffect(() => {
    if (!opened) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [opened, close]);

  return (
    <header className={classes.header}>
      <Link href="/" onClick={close}>
        <div>
          <Image
            src="/logo.svg"
            alt={t("footer.logoAlt")}
            width={124}
            height={32}
          />
        </div>
      </Link>
      <div ref={wrapperRef} className={classes.header__menuWrapper}>
        <button
          type="button"
          className={classes.header__menuBtn}
          onClick={toggle}
          aria-label={t("header.menuToggle")}
          aria-expanded={opened}
          aria-controls="primary-menu"
        >
          <IconMenu2 />
        </button>
        {opened && (
          <nav
            id="primary-menu"
            className={classes.header__menu}
            aria-hidden={!opened}
          >
            <Link href="/contact" onClick={close}>
              {t("footer.contact")}
            </Link>
            <Link href="/about" onClick={close}>
              {t("footer.about")}
            </Link>
            <LangSwitcher listboxRef={listboxRef} />
          </nav>
        )}
      </div>
    </header>
  );
};

export default memo(Header);
