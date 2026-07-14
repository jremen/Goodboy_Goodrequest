import { useTranslation } from "@/lib/i18n/useTranslation";
import { Title } from "@mantine/core";
import { memo } from "react";

const ReviewForm = () => {
  const { t } = useTranslation("form");
  return (
    <>
      <Title variant="h1">{t("review.title")}</Title>
    </>
  );
};

export default memo(ReviewForm);
