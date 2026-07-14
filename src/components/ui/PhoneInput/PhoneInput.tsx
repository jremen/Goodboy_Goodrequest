"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { Group, Input, Select, TextInput } from "@mantine/core";

const countryCodes = [
  { value: "+421", label: "🇸🇰 +421" },
  { value: "+420", label: "🇨🇿 +420" },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
}

export function PhoneInput({ value, onChange, error, label }: PhoneInputProps) {
  const { t } = useTranslation();
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
    const clean = newNumber.replace(/\D/g, "");
    onChange(`${prefix}${clean}`);
  };

  return (
    <Input.Wrapper label={label} error={error}>
      <Group gap={4} align="flex-start">
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
        <Group gap="0">
          <Group
            color="dark"
            align="center"
            p="md"
            pr="0"
            style={{
              height: "var(--brand-input-height)",
              background: "var(--color-input)",
              borderRadius: "0.5rem 0",
            }}
          >
            {prefix}
          </Group>
          <TextInput
            value={numberPart}
            size="regular"
            variant="filled"
            color="dark"
            onChange={(e) => handleNumberChange(e.currentTarget.value)}
            placeholder={t("phone.placeholder")}
            style={{ flex: 1 }}
            aria-label={t("phone.number")}
          />
        </Group>
      </Group>
    </Input.Wrapper>
  );
}
