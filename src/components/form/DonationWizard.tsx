"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { useDonationStore } from "@/lib/store";
import { Button, Group, Stepper, StepperStep } from "@mantine/core";
import { useCallback } from "react";
import { Footer } from "../layout/Footer/Footer";
import style from "./DonationWizard.module.css";
import ChooseShelter from "./steps/ChooseShelter/ChooseShelter";
import PersonalInfo from "./steps/PersonalInfo";
import ReviewForm from "./steps/ReviewForm";

const stepLabels = ["shelter", "details", "review"] as const;

export function DonationWizard() {
  const { t } = useTranslation("form");
  const { t: tc } = useTranslation();
  const { step, nextStep, prevStep } = useDonationStore();
  const amount = useDonationStore((store) => store.value);

  const steps = stepLabels.map((key) => ({
    label: t(`steps.${key}`),
  }));

  const renderStep = useCallback(() => {
    switch (step) {
      case 0:
        return <ChooseShelter />;
      case 1:
        return <PersonalInfo />;
      case 2:
        return <ReviewForm />;
      default:
        return null;
    }
  }, [step]);

  return (
    <div className={style.donationWrapper}>
      <Stepper
        active={step}
        color="brand"
        size="xs"
        onStepClick={step < 2 ? () => {} : undefined}
        allowNextStepsSelect={false}
      >
        {steps.map((s, i) => (
          <StepperStep key={i} label={s.label} />
        ))}
      </Stepper>

      <div style={{ marginTop: "var(--mantine-spacing-xl)" }}>
        {renderStep()}
      </div>

      {step < 2 && (
        <Group justify="space-between" mt="xl">
          <Button
            variant="brandGray"
            size="regular"
            onClick={prevStep}
            disabled={step === 0}
          >
            {tc("common.back")}
          </Button>
          <Button
            onClick={nextStep}
            size="regular"
            disabled={step === 0 && (!amount || amount === "0")}
          >
            {tc("common.next")}
          </Button>
        </Group>
      )}
      <Footer />
    </div>
  );
}
