import stepperClasses from "@/components/form/steps/stepper.module.css";
import { Button, createTheme, DEFAULT_THEME, Stepper } from "@mantine/core";
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
        fontSize: "48px",
        lineHeight: "1.16",
      },
      h2: { fontSize: "36px", lineHeight: "1.16" },
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
        return { root: {} };
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
