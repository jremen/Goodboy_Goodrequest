"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { Group } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { memo } from "react";

const Backbutton = () => {
  const { t } = useTranslation("common");

  return (
    <Link href="/">
      <Group
        gap="0.25em"
        pb="3em"
        style={{ color: "var(--mantine-color-brand-6)" }}
      >
        <IconArrowLeft />
        {t("common.back")}
      </Group>
    </Link>
  );
};

export default memo(Backbutton);
