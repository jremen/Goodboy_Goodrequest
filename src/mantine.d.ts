import type { ButtonVariant } from "@mantine/core";

declare module "@mantine/core" {
  export interface ButtonProps {
    variant?: ButtonVariant | "brandGray" | "brandWhite";
  }

  export interface StepperProps {
    variant?: "default" | "brandGray";
  }
}
