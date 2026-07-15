import stepperClasses from "@/components/form/steps/stepper.module.css";
import {
  Button,
  createTheme,
  DEFAULT_THEME,
  Stepper,
  TextInput,
} from "@mantine/core";
import themeClasses from "./theme.module.css";

export const theme = createTheme({
  primaryColor: "brand",
  fontFamily: `var(--font-inter), ${DEFAULT_THEME.fontFamily}`,
  headings: {
    fontFamily: `var(--font-inter), ${DEFAULT_THEME.fontFamily}`,
    fontWeight: "700",

    // properties for individual headings, all of them are optional
    sizes: {
      h1: {
        fontSize: "var(--heading-h1-size)",
        lineHeight: "1.16",
      },
      h2: { fontSize: "var(--heading-h2-size)", lineHeight: "1.16" },
      h3: { fontSize: "var(--heading-h3-size)", lineHeight: "1.16" },
    },
  },
  colors: {
    brand: [
      "#eef0ff",
      "#dde1ff",
      "#bcc4ff",
      "#9ba6ff",
      "#7a89ff",
      "#596bff",
      "#4F46E5",
      "#3f37c4",
      "#2f2aa3",
      "#1f1c82",
    ],
  },
  components: {
    Button: Button.extend({
      classNames: themeClasses,
      vars: (_theme, props) => {
        if (props.size === "regular") {
          return {
            root: {
              "--button-height": "56px",
              "--button-padding-x": "32px",
              "--button-fz": "16px",
            },
          };
        }
        if (props.size === "regular-small") {
          return {
            root: {
              "--button-height": "52px",
              "--button-padding-x": "8px",
              "--button-fz": "14px",
            },
          };
        }
        return { root: {} };
      },
    }),
    TextInput: TextInput.extend({
      vars: (_theme, props) => {
        if (props.size === "regular") {
          return {
            wrapper: {
              "--input-height": "var(--brand-input-height)",
              "--input-height-regular": "var(--brand-input-height)",
              "--input-fz": "16px",
              "--input-radius": "8px",
              "--input-padding-y": "0.5em",
              "--input-padding-inline-start": "1.5em",
              "--input-padding-inline-end": "1.5em",
            },
            root: {
              "--input-bg": "var(--color-input)",
            },
          };
        }
        return { wrapper: {} };
      },
    }),
    Stepper: Stepper.extend({
      classNames: {
        step: stepperClasses.step,
        stepIcon: stepperClasses.stepIcon,
        stepLabel: stepperClasses.stepLabel,
        stepCompletedIcon: stepperClasses.stepCompletedIcon,
      },
    }),
  },
});
