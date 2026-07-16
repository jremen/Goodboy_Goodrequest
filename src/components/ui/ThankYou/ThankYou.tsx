import { useTranslations } from "next-intl";
import { memo } from "react";
import styles from "./ThankYou.module.css";

const ThankYou = () => {
  const t = useTranslations("form");

  return (
    <div className={styles.overlay}>
      <div className={styles.circle}>
        <svg className={styles.check} viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <p className={styles.title}>{t("review.thankYou")}</p>
    </div>
  );
};

export default memo(ThankYou);
