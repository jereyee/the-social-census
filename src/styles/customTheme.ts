import { extendTheme, theme } from "@chakra-ui/react";
import { themeColors } from "./colors";
import { buttonStyles } from "./overrides/button";
import { headingStyles } from "./overrides/heading";
import { textStyles } from "./overrides/text";


const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: themeColors.grayscale.black,
        color: themeColors.grayscale.white[100],
        overflowX: "hidden",
      },
    },
  },
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
