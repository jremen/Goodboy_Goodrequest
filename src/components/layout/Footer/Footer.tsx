"use client";

import Image from "next/image";
import Link from "next/link";
import classes from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={classes.footer}>
      <Image
        src="/logo.svg"
        alt="GoodBoy foundation logo"
        width={124}
        height={32}
      />
      <nav>
        <Link href="/contact">Kontakt</Link>
        <Link href="/about">O projekte</Link>
      </nav>
    </footer>
  );
}
