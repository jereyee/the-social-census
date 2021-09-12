import { theme, extendTheme } from "@chakra-ui/react";
import { themeColors } from "./colors";
import { buttonStyles } from "./overrides/button";
import { headingStyles } from "./overrides/heading";
import { textStyles } from "./overrides/text";
import { textVariants } from "./typography";

const customTheme = extendTheme({
  fonts: {
    ...theme.fonts,
    body: "Inter",
    heading: "Inter",
  },
  colors: {
    ...theme.colors,
    ...themeColors,
  },
  components: {
    Button: buttonStyles,
    Text: textStyles,
    Heading: headingStyles,
  },
});

export default customTheme;
