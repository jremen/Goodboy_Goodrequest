"use client";

import type { DonationType } from "@/lib/store";
import { useDonationStore } from "@/lib/store";
import { Button, Card, Group } from "@mantine/core";
import { useTranslations } from "next-intl";
import { memo } from "react";

const StepType = () => {
  const t = useTranslations("form");
  const { type, setType } = useDonationStore();

  const options: { value: DonationType; label: string }[] = [
    { value: "specific", label: t("type.specific") },
    { value: "general", label: t("type.general") },
  ];

  return (
    <Card withBorder shadow="none" radius="12px" padding="0.25em">
      <Group gap="0" justify="stretch" aria-label={t("type.title")}>
        {options.map((opt) => (
          <Button
            key={opt.value}
            radius="md"
            size="regular-small"
            style={{ width: "50%" }}
            variant={type === opt.value ? "filled" : "brandWhite"}
            color={type === opt.value ? "brand" : "var(--color-white)"}
            aria-pressed={type === opt.value}
            tabIndex={0}
            onClick={() => setType(opt.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setType(opt.value);
            }}
          >
            {opt.label}
          </Button>
        ))}
      </Group>
    </Card>
  );
};

export default memo(StepType);
