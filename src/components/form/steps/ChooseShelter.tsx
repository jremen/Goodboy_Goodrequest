import { useTranslation } from "@/lib/i18n/useTranslation";
import { Title } from "@mantine/core";
import { memo } from "react";

const ChooseShelter = () => {
  const { t } = useTranslation("form");
  return (
    <>
      <Title variant="h1">{t("type.title")}</Title>
    </>
  );
};

export default memo(ChooseShelter);
