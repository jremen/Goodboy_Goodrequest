"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { useSubmitContribution } from "@/lib/query/mutations";
import { useShelters } from "@/lib/query/queries";
import { useDonationStore } from "@/lib/store";
import {
  createDonationSchema,
  type DonationFormValues,
} from "@/schemas/donation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Checkbox, Group, Stack, Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { memo, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

const ReviewForm = () => {
  const { t } = useTranslation("form");
  const { t: tc } = useTranslation();
  const { type, shelterId, value, contributors, reset } = useDonationStore();
  const { data: sheltersData } = useShelters();
  const { mutateAsync: submit } = useSubmitContribution();

  const schema = useMemo(() => createDonationSchema(tc), [tc]);

  const amount = Number(value) || 0;
  const shelter = sheltersData?.shelters.find((s) => s.id === shelterId);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DonationFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type,
      shelterId,
      amount,
      contributors,
      gdprConsent: false,
    },
  });

  const onSubmit = async () => {
    try {
      await submit({
        shelterID: type === "specific" ? (shelterId ?? null) : null,
        value: amount,
        contributors: contributors.map((d) => ({
          firstName: d.firstName,
          lastName: d.lastName,
          email: d.email,
          phone: d.phone || undefined,
        })),
      });
      notifications.show({
        title: tc("common.success"),
        message: t("review.submitSuccess"),
        color: "green",
        icon: <IconCheck size={18} />,
      });
      reset();
    } catch {
      notifications.show({
        title: tc("common.error"),
        message: t("review.submitError"),
        color: "red",
        icon: <IconX size={18} />,
      });
    }
  };

  return (
    <>
      <Title variant="h1">{t("review.title")}</Title>
      <form onSubmit={handleSubmit(onSubmit)} id="reviewform" noValidate>
        <Stack gap="md">
          <Stack gap="xs">
            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                {t("review.type")}
              </Text>
              <Text size="sm" fw={500}>
                {type === "general"
                  ? t("review.generalType")
                  : t("review.specificType")}
              </Text>
            </Group>

            {type === "specific" && (
              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  {t("review.shelter")}
                </Text>
                <Text size="sm" fw={500}>
                  {shelter?.name ?? t("review.notSelected")}
                </Text>
              </Group>
            )}

            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                {t("review.amount")}
              </Text>
              <Text size="sm" fw={500}>
                {amount.toLocaleString()} €
              </Text>
            </Group>
          </Stack>

          <Text fw={500}>{t("review.contributors")}</Text>
          {contributors.map((donor, i) => (
            <>
              <Stack gap="xs">
                <Text size="sm" fw={500}>
                  {t("review.contributor", { index: i + 1 })}
                </Text>
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    {t("details.firstName")}
                  </Text>
                  <Text size="sm">{donor.firstName}</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    {t("details.lastName")}
                  </Text>
                  <Text size="sm">{donor.lastName}</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    {t("details.email")}
                  </Text>
                  <Text size="sm">{donor.email}</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    {t("details.phone")}
                  </Text>
                  <Text size="sm">{donor.phone}</Text>
                </Group>
              </Stack>
            </>
          ))}

          <Controller
            name="gdprConsent"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={!!field.value}
                onChange={(e) => field.onChange(e.currentTarget.checked)}
                label={t("review.gdpr")}
                error={errors.gdprConsent?.message}
              />
            )}
          />

          {errors.shelterId && (
            <Alert color="red" variant="light">
              {errors.shelterId.message}
            </Alert>
          )}
        </Stack>
      </form>
    </>
  );
};

export default memo(ReviewForm);
