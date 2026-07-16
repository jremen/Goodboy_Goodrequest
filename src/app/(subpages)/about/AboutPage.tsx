"use client";

import StatsWidget from "@/components/ui/StatsWidget/StatsWidget";
import { Stack, Title } from "@mantine/core";
import { useTranslations } from "next-intl";
import { memo } from "react";

const AboutPage = () => {
  const t = useTranslations("subpages");
  return (
    <Stack gap="xl">
      <Title variant="h1">{t("about.title")}</Title>

      <p>{t("about.text1")}</p>
      <StatsWidget />

      <p style={{ marginBottom: "3em" }}>{t("about.text2")}</p>
    </Stack>
  );
};

export default memo(AboutPage);
