import type {
  ButtonSize,
  ButtonVariant,
  InputVariant,
  MantineSize,
} from "@mantine/core";

declare module "@mantine/core" {
  export interface ButtonProps {
    variant?: ButtonVariant | "brandGray" | "brandWhite";
    size?: ButtonSize | "regular" | "regular-small";
  }

  export interface TextInputProps {
    variant?: InputVariant | "brandGray" | "brandWhite";
    size?: MantineSize | "regular";
  }

  export interface StepperProps {
    variant?: "default" | "brandGray";
  }
}
