import { Box } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { ReactNode } from "react";

import Footer from "./Footer";
import Header from "./menu/Header";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  /* removes the header from certain pages (i.e., home page) */
  const headerExclusions = ["/", "/login", "/match", "/login/update", "/responses"];

  return (
    <Box margin="0 auto" maxWidth={800} transition="0.5s ease-out">
      <Box marginY="8" marginX="4">
        {!headerExclusions.includes(router.pathname) && <Header />}
        <Box as="main">{children}</Box>
        {/* <Footer /> */}
      </Box>
    </Box>
  );
};

export default Layout;
