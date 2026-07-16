"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { Group, Input, TextInput } from "@mantine/core";
import { memo, useCallback, useState } from "react";
import { CountryCodeSelect } from "./CountryCodeSelect";

interface PhoneInputProps {
  defaultValue: string;
  onChange: (value: string, source: "prefix" | "number") => void;
  error?: string;
  label?: string;
}

function splitDefault(value: string) {
  const prefix = value.startsWith("+420") ? "+420" : "+421";
  const number =
    value.startsWith("+420") || value.startsWith("+421")
      ? value.slice(4)
      : value;
  return { prefix, number };
}

const PhoneInput = ({
  defaultValue,
  onChange,
  error,
  label,
}: PhoneInputProps) => {
  const { t } = useTranslation();
  const [{ prefix, number }, setState] = useState(() =>
    splitDefault(defaultValue),
  );

  const handlePrefixChange = useCallback(
    (newPrefix: string) => {
      setState((s) => ({ ...s, prefix: newPrefix }));
      onChange(`${newPrefix}${number}`, "prefix");
    },
    [number, onChange],
  );

  const handleNumberChange = useCallback(
    (raw: string) => {
      const clean = raw.replace(/\D/g, "");
      setState((s) => ({ ...s, number: raw }));
      onChange(`${prefix}${clean}`, "number");
    },
    [prefix, onChange],
  );

  return (
    <Input.Wrapper label={label} error={error}>
      <Group gap={4} align="flex-start" wrap="nowrap">
        <CountryCodeSelect
          name="phone-prefix"
          value={prefix}
          onChange={handlePrefixChange}
          ariaLabel={t("phone.countryCode")}
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
            pr="0.5em"
            style={{
              height: "var(--brand-input-height)",
            }}
          >
            {prefix}
          </Group>
          <TextInput
            value={number}
            size="regular"
            variant="filled"
            color="dark"
            maxLength={9}
            onChange={(e) => handleNumberChange(e.target.value)}
            placeholder={t("phone.placeholder")}
            styles={{ input: { paddingLeft: "0.5em" } }}
            style={{ flex: 1 }}
            aria-label={t("phone.number")}
          />
        </Group>
      </Group>
    </Input.Wrapper>
  );
};

export default memo(PhoneInput);
