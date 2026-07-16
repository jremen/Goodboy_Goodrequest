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
  Badge,
  Button,
  Group,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconArrowRight,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useFieldArray, useForm } from "react-hook-form";
import classes from "./personalInfo.module.css";

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

function countContributorErrors(
  contributorErrors: Record<string, unknown> | undefined,
): number {
  if (!contributorErrors) return 0;
  return Object.keys(contributorErrors).filter(
    (k) => k !== "key" && !!contributorErrors[k],
  ).length;
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
      setValue,
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

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
      if (activeIndex >= fields.length) {
        setActiveIndex(Math.max(0, fields.length - 1));
      }
    }, [activeIndex, fields.length]);

    const handleAddContributor = () => {
      append(createContributor());
      setActiveIndex(fields.length);
    };

    const handleRemoveContributor = () => {
      const current = activeIndex;
      remove(current);
      if (current === fields.length - 1) {
        setActiveIndex(Math.max(0, fields.length - 2));
      }
    };

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

    return (
      <Stack gap="3em">
        <Title variant="h1">{t("details.title")}</Title>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={classes.viewport}>
            <div
              className={classes.track}
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {fields.map((field, index) => {
                const contributorErrors = errors.contributors?.[index];
                const errorCount = countContributorErrors(
                  contributorErrors as Record<string, unknown> | undefined,
                );
                return (
                  <div key={field.id} className={classes.slide}>
                    <Group
                      justify="space-between"
                      mb="sm"
                      className={classes.deleteBar}
                    >
                      <Group gap="xs" mr="auto">
                        <Text fw={600}>{t("details.contributorLabel")}</Text>
                        {errorCount > 0 && (
                          <Badge size="sm" color="red" circle>
                            {errorCount}
                          </Badge>
                        )}
                      </Group>
                      {fields.length > 1 && (
                        <Tooltip label={t("details.removeContributor")}>
                          <ActionIcon
                            color="red"
                            variant="subtle"
                            type="button"
                            onClick={handleRemoveContributor}
                            aria-label={t("details.removeContributor")}
                          >
                            <IconTrash size={16} />
                          </ActionIcon>
                        </Tooltip>
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
                          error={
                            errors.contributors?.[index]?.firstName?.message
                          }
                          aria-invalid={
                            !!errors.contributors?.[index]?.firstName
                          }
                        />

                        <TextInput
                          label={t("details.lastName")}
                          size="regular"
                          variant="filled"
                          color="dark"
                          placeholder={t("details.lastNamePlaceholder")}
                          required
                          {...register(`contributors.${index}.lastName`)}
                          error={
                            errors.contributors?.[index]?.lastName?.message
                          }
                          aria-invalid={
                            !!errors.contributors?.[index]?.lastName
                          }
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
                        defaultValue={field.phone || ""}
                        onChange={(val, source) => {
                          setValue(`contributors.${index}.phone`, val, {
                            shouldValidate: source === "number",
                            shouldDirty: true,
                          });
                        }}
                        error={errors.contributors?.[index]?.phone?.message}
                      />
                    </Stack>
                  </div>
                );
              })}
            </div>
          </div>

          <Group justify="space-between" wrap="nowrap" mt="xl">
            <Button
              variant="outline"
              color="dark"
              leftSection={<IconArrowLeft size={16} />}
              onClick={() => setActiveIndex((i) => i - 1)}
              style={{ visibility: activeIndex === 0 ? "hidden" : "visible" }}
            >
              {t("details.prev")}
            </Button>
            <Button
              variant="outline"
              leftSection={<IconPlus size={16} />}
              onClick={handleAddContributor}
              type="button"
            >
              {t("details.addContributor")}
            </Button>
            <Button
              variant="outline"
              color="dark"
              rightSection={<IconArrowRight size={16} />}
              onClick={() => setActiveIndex((i) => i + 1)}
              style={{
                visibility:
                  activeIndex === fields.length - 1 ? "hidden" : "visible",
              }}
            >
              {t("details.next")}
            </Button>
          </Group>
        </form>
      </Stack>
    );
  },
);

PersonalInfo.displayName = "PersonalInfo";
export default PersonalInfo;
