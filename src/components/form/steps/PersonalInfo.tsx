import { useTranslation } from "@/lib/i18n/useTranslation";
import { Title } from "@mantine/core";
import { memo } from "react";

const PersonalInfo = () => {
  const { t } = useTranslation("form");
  return (
    <>
      <Title variant="h1">{t("details.title")}</Title>
    </>
  );
};

export default memo(PersonalInfo);
