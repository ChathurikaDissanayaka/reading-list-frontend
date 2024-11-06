import { Spinner } from "@chakra-ui/react"
import { Text, VStack } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <VStack colorPalette="blue">
      <Spinner
        w={"70px"}
        h={"70px"}
        size="xl"
        color={"blue"}
        css={{ "--spinner-track-color": "#FF0080" }}
        borderWidth="4px"
      />
      <Text color="blue">Loading</Text>
    </VStack>
  )
}

export default LoadingSpinner