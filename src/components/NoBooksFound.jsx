import { Flex, Text } from "@chakra-ui/react";

const NoBooksFound = ({ message }) => {
  return (
    <Flex flexDir="column" alignItems="Center">
      <Text
        fontSize={{
          base: "25px",
          sm: "32px",
        }}
        mb="3"
      >
        No books found. {message}
      </Text>
    </Flex>
  );
};

export default NoBooksFound;
