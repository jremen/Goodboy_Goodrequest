"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { useDonationStore } from "@/lib/store";
import { Button, Group, Stepper, StepperStep } from "@mantine/core";
import { Footer } from "../layout/Footer/Footer";
import style from "./DonationWizard.module.css";

const stepLabels = ["shelter", "details", "review"] as const;

export function DonationWizard() {
  const { t } = useTranslation("form");
  const { t: tc } = useTranslation();
  const { step, nextStep, prevStep } = useDonationStore();

  const steps = stepLabels.map((key) => ({
    label: t(`steps.${key}`),
  }));

  return (
    <div className={style.donationWrapper}>
      <Stepper
        active={step}
        color="brand"
        size="xs"
        onStepClick={step < 4 ? () => {} : undefined}
        allowNextStepsSelect={false}
      >
        {steps.map((s, i) => (
          <StepperStep key={i} label={s.label} />
        ))}
      </Stepper>
      {step < 2 && (
        <Group justify="space-between" mt="xl">
          <Button
            variant="outline"
            size="regular"
            onClick={prevStep}
            disabled={step === 0}
          >
            {tc("common.back")}
          </Button>
          <Button onClick={nextStep} size="regular">
            {tc("common.next")}
          </Button>
        </Group>
      )}
      <Footer />
    </div>
  );
}
