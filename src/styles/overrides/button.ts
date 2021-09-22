import { themeColors } from "../colors";
import { textVariants } from "../typography";

export const buttonStyles = {
  baseStyle: {
    padding: "11px 27px",
    borderRadius: "52.54px",
  },
  variants: {
    primary: {
      border: `1px solid ${themeColors.grayscale.white[100]}`,
      ...textVariants.caption,
      _disabled: {
        border: `1px solid ${themeColors.grayscale.white[60]}`,
        color: `${themeColors.grayscale.white[60]}`,
      },
      _hover: {
        bg: `${themeColors.grayscale.white[60]}`,
      },
    },
    secondary: {
      border: `1px solid ${themeColors.grayscale.white[60]}`,
      color: `${themeColors.grayscale.white[60]}`,
      ...textVariants.caption,
    },
    naked: {
      border: `none`,
      color: `${themeColors.grayscale.white[80]}`,
      ...textVariants.caption,
    },
    menu: {
      borderRadius: "4.53px",
      color: `${themeColors.brand.red}`,
      ...textVariants.caption,
      fontWeight: "medium",
    },
    halfWidth: {
      width: "155px",
      height: "55px",
      borderRadius: "4.53px",
      ...textVariants.heading3,
      textAlign: "center",
    },
    fullWidth: {
      width: "330px",
      height: "55px",
      borderRadius: "4.53px",
      ...textVariants.heading3,
      textAlign: "center",
    },
    poll: {
      width: "135px",
      height: "40px",
      borderTopLeftRadius: "4.53px",
      borderTopRightRadius: "0px",
      borderBottomRightRadius: "0px",
      borderBottomLeftRadius: "4.53px",
      backgroundColor: `${themeColors.grayscale.gray[200]}`,
      _hover: {
        backgroundColor: `${themeColors.grayscale.white[80]}`,
      },
      _active: {
        backgroundColor: `${themeColors.grayscale.white[100]}`,
      },
    },
  },
};
