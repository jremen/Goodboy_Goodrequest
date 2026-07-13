"use client";

import { Footer } from "../layout/Footer/Footer";
import style from "./DonationWizard.module.css";

const stepLabels = ["chooseShelter", "personalInfo", "submit"] as const;

export function DonationWizard() {
  return (
    <div className={style.donationWrapper}>
      <Footer />
    </div>
  );
}
