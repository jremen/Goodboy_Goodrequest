import { useTranslation } from "@/lib/i18n/useTranslation";
import { Stack, Title } from "@mantine/core";
import { memo } from "react";
import StepAmount from "./StepAmount";
import { StepShelter } from "./StepShelter";
import { StepType } from "./StepType";

const ChooseShelter = () => {
  const { t } = useTranslation("form");
  return (
    <Stack gap="3em">
      <Title variant="h1">{t("type.title")}</Title>
      <StepType />
      <StepShelter />
      <StepAmount />
    </Stack>
  );
};

export default memo(ChooseShelter);
