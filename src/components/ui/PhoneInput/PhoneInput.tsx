"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { Group, Input, Select, TextInput } from "@mantine/core";
import { useState } from "react";

const countryCodes = [
  { value: "+421", label: "🇸🇰 +421" },
  { value: "+420", label: "🇨🇿 +420" },
];

interface PhoneInputProps {
  defaultValue: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
}

export function PhoneInput({
  defaultValue,
  onChange,
  error,
  label,
}: PhoneInputProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState(defaultValue || "");
  const prefix = value.startsWith("+420")
    ? "+420"
    : value.startsWith("+421")
      ? "+421"
      : "+421";
  const numberPart =
    value.startsWith("+420") || value.startsWith("+421")
      ? value.slice(4)
      : value;

  const handlePrefixChange = (newPrefix: string | null) => {
    onChange(`${newPrefix ?? "+421"}${numberPart}`);
  };

  const handleNumberChange = (newNumber: string) => {
    console.log(newNumber);
    // const clean = newNumber.replace(/\D/g, "");
    setValue(newNumber);
    onChange(`${prefix}${newNumber}`);
  };

  return (
    <Input.Wrapper label={label} error={error}>
      <Group gap={4} align="flex-start" wrap="nowrap">
        <Select
          data={countryCodes}
          // size="regular"
          variant="filled"
          color="dark"
          value={prefix}
          onChange={handlePrefixChange}
          aria-label={t("phone.countryCode")}
          style={{ width: 120 }}
          comboboxProps={{ withinPortal: true }}
        />
        <Group
          gap="0"
          w="100%"
          style={{
            background: "var(--color-input)",
            borderRadius: "0.5rem",
          }}
        >
          <Group
            color="dark"
            align="center"
            p="md"
            pr="0"
            style={{
              height: "var(--brand-input-height)",
            }}
          >
            {prefix}
          </Group>
          <TextInput
            value={numberPart}
            size="regular"
            variant="filled"
            color="dark"
            maxLength={9}
            onChange={(e) => handleNumberChange(e.target.value)}
            placeholder={t("phone.placeholder")}
            style={{ flex: 1 }}
            aria-label={t("phone.number")}
          />
        </Group>
      </Group>
    </Input.Wrapper>
  );
}
