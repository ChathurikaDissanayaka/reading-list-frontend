import BackButton from "./BackButton";
import { Flex } from "@chakra-ui/react";
import { ColorModeButton } from "../components/ui/color-mode";
const Navbar = () => {
  return (
    <Flex
      h={16}
      alignItems={"center"}
      justifyContent={"space-between"}
      flexDir={"row"}
    >
      <BackButton />
      <ColorModeButton variant="outline" />
    </Flex>
  );
};

export default Navbar;
