"use client";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useMemo } from "react";
import styles from "./Contact.module.css";

const ContactPage = () => {
  const { t } = useTranslation("subpages");

  const contactBoxes = useMemo(
    () => [
      {
        icon: <IconMail size={24} color="var(--mantine-color-brand-6)" />,
        label: t("contact.email.label"),
        text: t("contact.email.text"),
        value: t("contact.email.value"),
        link: `mailto:${t("contact.email.value")}`,
      },
      {
        icon: <IconMapPin size={24} color="var(--mantine-color-brand-6)" />,
        label: t("contact.office.label"),
        text: t("contact.office.text"),
        value: t("contact.office.address"),
        link: ` https://www.google.com/maps/search/?api=1&query=${encodeURI(t("contact.office.address"))}`,
      },
      {
        icon: <IconPhone size={24} color="var(--mantine-color-brand-6)" />,
        label: t("contact.phone.label"),
        text: t("contact.phone.text"),
        value: t("contact.phone.value"),
        link: `tel:${t("contact.phone.value")}`,
      },
    ],
    [t],
  );

  return (
    <Stack gap="3em">
      <Title variant="h1">{t("contact.title")}</Title>

      <SimpleGrid cols={{ base: 1, xs: 3 }} spacing="md">
        {contactBoxes.map((box) => {
          return (
            <Stack key={box.label} align="center">
              <div className={styles.iconBox}>{box.icon}</div>
              <Text fw={600} size="1.25rem">
                {box.label}
              </Text>
              <Text fw={400} mb="0.5em" c="var(--color-tertiary)">
                {box.text}
              </Text>
              <Text fw={500} c="brand">
                <Link href={box.link}>{box.value}</Link>
              </Text>
            </Stack>
          );
        })}
      </SimpleGrid>
      <div className={styles.doggyContact}>
        <Image src="/dog_contact.jpg" alt="Doggy" width={1120} height={376} />
      </div>
    </Stack>
  );
};

export default memo(ContactPage);
