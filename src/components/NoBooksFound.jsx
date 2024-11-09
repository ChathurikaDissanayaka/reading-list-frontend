import { Flex, Text } from "@chakra-ui/react";

const NoBooksFound = () => {
  return (
    <Flex flexDir={"column"} alignItems={"Center"}>
      <Text
        fontSize={{
          base: "25px",
          sm: "32px",
        }}
        fontWeight={"bold"}
        mb={3}
      >
        No books found
      </Text>
    </Flex>
  );
};

export default NoBooksFound;
