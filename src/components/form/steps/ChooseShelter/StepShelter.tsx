"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { useShelters } from "@/lib/query/queries";
import { useDonationStore } from "@/lib/store";
import { Select, Skeleton, Stack, Text } from "@mantine/core";

export function StepShelter() {
  const { t } = useTranslation("form");
  const { data, isLoading } = useShelters();
  const { shelterId, setShelterId, type } = useDonationStore();

  if (isLoading) {
    return <Skeleton h={48} radius="sm" />;
  }

  const shelterOptions = (data?.shelters ?? []).map((s) => ({
    value: String(s.id),
    label: s.name,
  }));

  return (
    <Stack gap="md">
      <Text fw={600} size="md">
        {t("shelter.title")}
      </Text>
      <Select
        size="lg"
        label={t("shelter.label")}
        labelProps={{ size: "md" }}
        placeholder={t("shelter.placeholder")}
        data={shelterOptions}
        value={shelterId ? String(shelterId) : undefined}
        onChange={(val) => setShelterId(val ? Number(val) : undefined)}
        searchable
        clearable
        aria-required
        disabled={type !== "specific"}
      />
    </Stack>
  );
}
