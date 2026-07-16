import styles from "./ThankYou.module.css";

type ThankYouProps = {
  title: string;
};

export const ThankYou = ({ title }: ThankYouProps) => (
  <div className={styles.overlay}>
    <div className={styles.circle}>
      <svg className={styles.check} viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
    <p className={styles.title}>{title}</p>
  </div>
);
