"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { useDonationStore } from "@/lib/store";
import { Button, Group, Stack, Text, TextInput } from "@mantine/core";
import { memo } from "react";

const presets = [5, 10, 20, 30, 50, 100];

const StepAmount = () => {
  const { t } = useTranslation("form");
  const { value, setValue } = useDonationStore();

  return (
    <Stack gap="md">
      <Text fw={600} size="md">
        {t("amount.title")}
      </Text>
      <TextInput
        type="number"
        placeholder="0"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        min={1}
        required
        aria-label={t("amount.title")}
      />
      <Group justify="space-between" gap="0">
        {presets.map((val) => (
          <Button
            key={val}
            variant={value === String(val) ? "filled" : "brandGray"}
            color={value === String(val) ? "brand" : "gray"}
            style={{ width: "6rem", height: "3rem", padding: "0.5em" }}
            size="lg"
            onClick={() => setValue(String(val))}
            aria-pressed={value === String(val)}
          >
            {t(`amount.preset.${val}`)}
          </Button>
        ))}
      </Group>
    </Stack>
  );
};

export default memo(StepAmount);
