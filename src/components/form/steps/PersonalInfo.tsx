"use client";

import { PhoneInput } from "@/components/ui/PhoneInput/PhoneInput";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { useDonationStore } from "@/lib/store";
import {
  createPersonalInfoSchema,
  type DonorFormValues,
} from "@/schemas/donation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ActionIcon,
  Button,
  Group,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { forwardRef, useCallback, useImperativeHandle, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export interface PersonalInfoHandle {
  submit: () => void;
}

interface PersonalInfoProps {
  onNext: () => void;
}

type FormValues = { contributors: DonorFormValues[] };

function createContributor(): DonorFormValues {
  return {
    key: crypto.randomUUID(),
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };
}

const PersonalInfo = forwardRef<PersonalInfoHandle, PersonalInfoProps>(
  ({ onNext }, ref) => {
    const { t } = useTranslation("form");
    const { t: tc } = useTranslation();
    const { contributors, setContributors } = useDonationStore();

    const schema = useMemo(() => createPersonalInfoSchema(tc), [tc]);

    const {
      register,
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        contributors:
          contributors.length > 0
            ? contributors.map((d) => ({ ...d }))
            : [createContributor()],
      },
    });

    const { fields, append, remove } = useFieldArray({
      control,
      name: "contributors",
    });

    const onSubmit = useCallback(
      (data: FormValues) => {
        setContributors(
          data.contributors.map((c) => ({
            key: c.key,
            firstName: c.firstName ?? "",
            lastName: c.lastName ?? "",
            email: c.email ?? "",
            phone: c.phone ?? "",
          })),
        );
        onNext();
      },
      [onNext, setContributors],
    );

    useImperativeHandle(
      ref,
      () => ({
        submit: handleSubmit(onSubmit),
      }),
      [handleSubmit, onSubmit],
    );

    const handleAddDonor = () => {
      append(createContributor());
    };

    return (
      <>
        <Title variant="h1">{t("details.title")}</Title>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack gap="lg">
            {fields.map((field, index) => (
              <>
                <Group justify="space-between" mb="sm">
                  <Text fw={500} size="sm">
                    {t("details.contributorLabel")}
                  </Text>
                  {fields.length > 1 && (
                    <ActionIcon
                      color="red"
                      variant="subtle"
                      type="button"
                      onClick={() => remove(index)}
                      aria-label={t("details.removeContributor")}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  )}
                </Group>

                <Stack gap="sm">
                  <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="md">
                    <TextInput
                      label={t("details.firstName")}
                      size="regular"
                      variant="filled"
                      color="dark"
                      required
                      placeholder={t("details.firstNamePlaceholder")}
                      {...register(`contributors.${index}.firstName`)}
                      error={errors.contributors?.[index]?.firstName?.message}
                      aria-invalid={!!errors.contributors?.[index]?.firstName}
                    />

                    <TextInput
                      label={t("details.lastName")}
                      size="regular"
                      variant="filled"
                      color="dark"
                      placeholder={t("details.lastNamePlaceholder")}
                      required
                      {...register(`contributors.${index}.lastName`)}
                      error={errors.contributors?.[index]?.lastName?.message}
                      aria-invalid={!!errors.contributors?.[index]?.lastName}
                    />
                  </SimpleGrid>

                  <TextInput
                    label={t("details.email")}
                    size="regular"
                    variant="filled"
                    color="dark"
                    placeholder={t("details.emailPlaceholder")}
                    required
                    type="email"
                    {...register(`contributors.${index}.email`)}
                    error={errors.contributors?.[index]?.email?.message}
                    aria-invalid={!!errors.contributors?.[index]?.email}
                  />

                  <PhoneInput
                    label={t("details.phone")}
                    value={field.phone || ""}
                    onChange={(val) => {
                      const syntheticEvent = {
                        target: {
                          value: val,
                          name: `contributors.${index}.phone`,
                        },
                      } as React.ChangeEvent<HTMLInputElement>;
                      register(`contributors.${index}.phone`).onChange(
                        syntheticEvent,
                      );
                    }}
                    error={errors.contributors?.[index]?.phone?.message}
                  />
                </Stack>
              </>
            ))}

            <Button
              variant="outline"
              leftSection={<IconPlus size={16} />}
              onClick={handleAddDonor}
              type="button"
              fullWidth
            >
              {t("details.addContributor")}
            </Button>
          </Stack>
        </form>
      </>
    );
  },
);

PersonalInfo.displayName = "PersonalInfo";
export default PersonalInfo;
