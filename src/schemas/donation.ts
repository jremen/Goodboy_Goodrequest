import { z } from "zod/v4";
import { createPhoneSchema } from "./phone";

type T = (key: string, options?: Record<string, unknown>) => string;

export const createContributorsSchema = (t: T) =>
  z.object({
    key: z.string(),
    firstName: z
      .string()
      .min(2, t("validation.firstName.min", { min: 2 }))
      .max(20, t("validation.firstName.max", { max: 20 })),
    lastName: z
      .string()
      .min(2, t("validation.lastName.min", { min: 2 }))
      .max(30, t("validation.lastName.max", { max: 30 })),
    email: z.string().email(t("validation.email")),
    phone: createPhoneSchema(t).optional(),
  });

export const createChooseShelterSchema = (t: T) =>
  z
    .object({
      type: z.enum(["general", "specific"], {
        message: t("validation.type"),
      }),
      shelterId: z.number().optional(),
      amount: z
        .number({ message: t("validation.amount.required") })
        .min(1, t("validation.amount.min", { min: 1 })),
    })
    .refine(
      (data) =>
        data.type !== "specific" ||
        (data.shelterId != null && data.shelterId > 0),
      { message: t("validation.shelter"), path: ["shelterId"] },
    );

export const createPersonalInfoSchema = (t: T) =>
  z.object({
    contributors: z
      .array(createContributorsSchema(t))
      .min(1, t("validation.contributors.min")),
  });

export const createDonationSchema = (t: T) =>
  z
    .object({
      type: z.enum(["general", "specific"]),
      shelterId: z.number().optional(),
      amount: z.number().min(1, t("validation.amount.min", { min: 1 })),
      contributors: z
        .array(createContributorsSchema(t))
        .min(1, t("validation.contributors.min")),
      gdprConsent: z.boolean().refine((v) => v === true, {
        message: t("validation.gdpr"),
      }),
    })
    .refine(
      (data) =>
        data.type !== "specific" ||
        (data.shelterId != null && data.shelterId > 0),
      { message: t("validation.shelter"), path: ["shelterId"] },
    );

export type DonationFormValues = z.infer<
  ReturnType<typeof createDonationSchema>
>;
export type DonorFormValues = z.infer<
  ReturnType<typeof createContributorsSchema>
>;
export type ChooseShelterFormValues = z.infer<
  ReturnType<typeof createChooseShelterSchema>
>;
