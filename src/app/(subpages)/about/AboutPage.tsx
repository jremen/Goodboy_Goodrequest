"use client";

import { StatsWidget } from "@/components/ui/StatsWidget/StatsWidget";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { Stack, Title } from "@mantine/core";
import { memo } from "react";

const AboutPage = () => {
  const { t } = useTranslation("subpages");
  return (
    <Stack gap="xl">
      <Title variant="h1">{t("about.title")}</Title>

      <p>{t("about.text1")}</p>
      <StatsWidget />

      <p>{t("about.text2")}</p>
    </Stack>
  );
};

export default memo(AboutPage);
