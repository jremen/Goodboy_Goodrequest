"use client";

import { useSubmitContribution } from "@/lib/query/mutations";
import { useDonationStore } from "@/lib/store";
import { Button, Group, Stepper, StepperStep } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { memo, useCallback, useRef, useState } from "react";
import Footer from "../layout/Footer/Footer";
import style from "./DonationWizard.module.css";
import ChooseShelter, {
  type ChooseShelterHandle,
} from "./steps/ChooseShelter/ChooseShelter";
import PersonalInfo, { type PersonalInfoHandle } from "./steps/PersonalInfo";
import ReviewForm from "./steps/ReviewForm";

const stepLabels = ["shelter", "details", "review"] as const;

const DonationWizard = () => {
  const t = useTranslations("form");
  const tc = useTranslations("common");
  const { step, nextStep, prevStep } = useDonationStore();
  const { isPending } = useSubmitContribution();
  const [hideButtons, setHideButtons] = useState(false);

  const chooseShelterRef = useRef<ChooseShelterHandle>(null);
  const personalInfoRef = useRef<PersonalInfoHandle>(null);

  const handleNext = () => {
    if (step === 0) {
      chooseShelterRef.current?.submit();
    } else if (step === 1) {
      personalInfoRef.current?.submit();
    }
  };

  const renderStep = useCallback(() => {
    switch (step) {
      case 0:
        return <ChooseShelter ref={chooseShelterRef} onNext={nextStep} />;
      case 1:
        return <PersonalInfo ref={personalInfoRef} onNext={nextStep} />;
      case 2:
        return <ReviewForm thankYouVisible={setHideButtons} />;
      default:
        return null;
    }
  }, [step, nextStep]);

  return (
    <div className={style.donationWrapper}>
      <Stepper
        active={step}
        color="brand"
        size="xs"
        onStepClick={step < 2 ? () => {} : undefined}
        allowNextStepsSelect={false}
      >
        {stepLabels.map((key, i) => (
          <StepperStep key={i} label={t(`steps.${key}`)} />
        ))}
      </Stepper>

      <div
        style={{ marginTop: "var(--mantine-spacing-xl)" }}
        className={style.donationSteps}
      >
        {renderStep()}
      </div>

      {step < stepLabels.length && (
        <Group
          justify="space-between"
          mt="auto"
          style={{ visibility: hideButtons ? "hidden" : "visible" }}
        >
          {step !== 0 && (
            <Button
              variant="brandGray"
              size="regular"
              onClick={prevStep}
              disabled={step === 0}
              leftSection={<IconArrowLeft />}
            >
              {tc("common.back")}
            </Button>
          )}
          {step < 2 ? (
            <Button
              size="regular"
              onClick={handleNext}
              rightSection={<IconArrowRight />}
              ml="auto"
            >
              {tc("common.next")}
            </Button>
          ) : (
            <Button
              type="submit"
              form="reviewform"
              loading={isPending}
              size="regular"
              ml="auto"
            >
              {tc("common.submit")}
            </Button>
          )}
        </Group>
      )}

      <Footer />
    </div>
  );
};

export default memo(DonationWizard);
