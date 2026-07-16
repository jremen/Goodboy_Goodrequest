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

const Divider = () => {
  return (
    <div
      style={{
        borderTop: "1px solid var(--color-quintarny)",
        paddingTop: "1em",
        marginTop: "1em",
      }}
    />
  );
};

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
        <Stack gap="md" pt="3em">
          <Stack gap="xs">
            <Text fw={600}>{t("review.summary")}</Text>
            <Group justify="space-between">
              <Text c="var(--color-gray)">{t("review.type")}</Text>
              <Text fw={600}>
                {type === "general"
                  ? t("review.generalType")
                  : t("review.specificType")}
              </Text>
            </Group>

            {type === "specific" && (
              <Group justify="space-between">
                <Text c="var(--color-gray)">{t("review.shelter")}</Text>
                <Text fw={600}>{shelter?.name ?? t("review.notSelected")}</Text>
              </Group>
            )}

            <Group justify="space-between">
              <Text c="var(--color-gray)">{t("review.amount")}</Text>
              <Text fw={600}>{amount.toLocaleString()} €</Text>
            </Group>
          </Stack>

          <Divider />

          <Text fw={600}>{t("review.contributors")}</Text>
          <div
            style={{ overflowY: "auto", maxHeight: "10em" }}
            className="NiceScrollbar"
          >
            {contributors.map((donor, i) => (
              <>
                {i > 0 && <Divider />}
                <Stack gap="xs">
                  <Text fw={600}>
                    {t("review.contributor", { index: i + 1 })}
                  </Text>
                  <Group justify="space-between">
                    <Text c="var(--color-gray)">{t("details.firstName")}</Text>
                    <Text size="sm">{donor.firstName}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text c="var(--color-gray)">{t("details.lastName")}</Text>
                    <Text size="sm">{donor.lastName}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text c="var(--color-gray)">{t("details.email")}</Text>
                    <Text size="sm">{donor.email}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text c="var(--color-gray)">{t("details.phone")}</Text>
                    <Text size="sm">{donor.phone}</Text>
                  </Group>
                </Stack>
              </>
            ))}
          </div>

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
