import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import NavMenu from "./NavMenu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const iconWidth = 21;
  const HeaderIcon = () =>
    menuOpen ? (
      <CloseIcon w={iconWidth} h={21} />
    ) : (
      <HamburgerIcon w={27} h={27} />
    );

  const headerText = menuOpen ? "Your Account" : "The Social Census";

  return (
    <Stack
      width="full"
      direction="column"
      spacing={6}
      /* dynamic properties based on menu */
      height={menuOpen ? "100vh" : "initial"}
      bg={menuOpen ? "grayscale.black" : "none"}
    >
      <Flex as="header" width="full" align="center" justify="space-between">
        <Box onClick={() => setMenuOpen(!menuOpen)}>
          <HeaderIcon />
        </Box>
        <Heading as="h1" variant="headline">
          {headerText}
        </Heading>
        <Box w={iconWidth} />
      </Flex>
      {menuOpen && <NavMenu />}
    </Stack>
  );
};

export default Header;
