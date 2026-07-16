"use client";

import { useStats } from "@/lib/query/queries";
import { Group, Skeleton, Stack, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import { memo } from "react";
import classes from "./StatsWidget.module.css";

const StatsWidget = () => {
  const t = useTranslations("subpages");
  const { data, isLoading } = useStats();

  if (isLoading) {
    return (
      <Group gap="lg" grow>
        <Skeleton h={100} radius="md" />
        <Skeleton h={100} radius="md" />
      </Group>
    );
  }

  return (
    <Group gap="lg" grow py="3.5em" className={classes.stats}>
      <Stack align="center">
        <Text size="3.75rem" c="brand" fw={600}>
          {data?.contribution != null
            ? `${data.contribution.toLocaleString()} €`
            : "—"}
        </Text>
        <Text size="1.125rem" fw={500} style={{ textAlign: "center" }}>
          {t("about.statsAmount")}
        </Text>
      </Stack>
      <Stack align="center">
        <Text size="3.75rem" c="brand" fw={600}>
          {data?.contributors != null
            ? data.contributors.toLocaleString()
            : "—"}
        </Text>
        <Text size="1.125rem" fw={500}>
          {t("about.statsContributors")}
        </Text>
      </Stack>
    </Group>
  );
};

export default memo(StatsWidget);
