import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { BsPlusSquare } from "react-icons/bs";
import { Flex, Text } from "@chakra-ui/react";

const AddBook = () => {
  return (
    <Flex h="16" alignItems="center">
      <Text>Add a book</Text>
      <Link to="/books/create">
        <Button size="sm" variant="outline" marginLeft="3">
          <BsPlusSquare />
        </Button>
      </Link>
    </Flex>
  );
};

export default AddBook;
