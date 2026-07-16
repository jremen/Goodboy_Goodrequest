"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { useDonationStore } from "@/lib/store";
import {
  createChooseShelterSchema,
  type ChooseShelterFormValues,
} from "@/schemas/donation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Stack, Title } from "@mantine/core";
import { forwardRef, memo, useImperativeHandle, useMemo } from "react";
import { useForm } from "react-hook-form";
import StepAmount from "./StepAmount";
import StepShelter from "./StepShelter";
import StepType from "./StepType";

export interface ChooseShelterHandle {
  submit: () => void;
}

interface ChooseShelterProps {
  onNext: () => void;
}

const ChooseShelter = forwardRef<ChooseShelterHandle, ChooseShelterProps>(
  ({ onNext }, ref) => {
    const { t } = useTranslation("form");
    const { t: tc } = useTranslation();
    const { type, shelterId, value } = useDonationStore();
    const amount = Number(value) || 0;

    const schema = useMemo(() => createChooseShelterSchema(tc), [tc]);

    const {
      handleSubmit,
      formState: { errors },
    } = useForm<ChooseShelterFormValues>({
      resolver: zodResolver(schema),
      values: { type, shelterId, amount },
    });

    useImperativeHandle(
      ref,
      () => ({
        submit: handleSubmit(() => onNext()),
      }),
      [handleSubmit, onNext],
    );

    return (
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          if (data.type === "specific") {
            // shelterId is already set in store via StepShelter
          }
          // amount is already set in store via StepAmount
          onNext();
        })}
      >
        <Stack gap="2.5em">
          <Title variant="h1">{t("type.title")}</Title>
          <Stack gap="2em">
            <StepType />
            <StepShelter />
            {errors.shelterId && (
              <Alert color="red" variant="light">
                {errors.shelterId.message}
              </Alert>
            )}
            <div>
              <StepAmount />
              {errors.amount && (
                <Alert color="red" variant="light">
                  {errors.amount.message}
                </Alert>
              )}
            </div>
          </Stack>
        </Stack>
      </form>
    );
  },
);

ChooseShelter.displayName = "ChooseShelter";
export default memo(ChooseShelter);
