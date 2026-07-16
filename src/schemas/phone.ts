import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import { z } from "zod/v4";

type T = (
  key: string,
  options?: Record<string, string | number | Date>,
) => string;

export const createPhoneSchema = (t: T) =>
  z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const phone = parsePhoneNumberFromString(val);
        return (
          !!phone &&
          isValidPhoneNumber(val) &&
          ["SK", "CZ"].includes(phone.country ?? "")
        );
      },
      { message: t("validation.phone") },
    );
