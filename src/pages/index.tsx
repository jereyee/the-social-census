import { Box } from "@chakra-ui/react";

import CTASection from "components/CTASection";
import SomeImage from "components/SomeImage";
import SomeText from "components/SomeText";

const Home = () => {
  return (
    <Box mb={8} w="full">
      <SomeText />
      <CTASection />
    </Box>
  );
};

export default Home;
