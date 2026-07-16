"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { useDonationStore } from "@/lib/store";
import { Button, Group, Stack, Text } from "@mantine/core";
import { IconCurrencyEuro } from "@tabler/icons-react";
import { memo } from "react";
import stepStyles from "./StepStyles.module.css";

const presets = [5, 10, 20, 30, 50, 100];

const StepAmount = () => {
  const { t } = useTranslation("form");
  const { value, setValue } = useDonationStore();

  return (
    <Stack gap="md">
      <Text fw={600} size="md">
        {t("amount.title")}
      </Text>
      <Group
        className={stepStyles.amount}
        gap="0"
        align="flex-end"
        justify="center"
      >
        <input
          placeholder="0"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          min={1}
          size={2}
          required
          aria-label={t("amount.title")}
        />
        {/* <span className={stepStyles.splitter}></span> */}
        <IconCurrencyEuro size="2em" />
      </Group>
      <Group className={stepStyles.amountButtons}>
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
