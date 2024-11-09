/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Badge, Box, Card, HStack, Image, Flex } from "@chakra-ui/react";
import { GridItem } from "@chakra-ui/react";

const SingleBookCard = ({ book }) => {
  return (
    <Link to={`/books/details/${book._id}`}>
      <GridItem key={book._id} _hover={{ transform: "translateY(-5px)" }}>
        <Flex flexDir={"column"} alignItems={"center"}>
          <Card.Root maxW="xl" overflow="hidden">
            <Card.Body p={3}>
              <Flex
                flexDir={{ base: "column", md: "row" }}
                alignItems={"center"}
              >
                <Image
                  h={"170px"}
                  src={book.coverImage}
                  alt={book.isbn}
                  rounded={"md"}
                />
                <Box ml={{ base: 0, md: 5 }}>
                  <Card.Title display={"flex"} alignItems={"center"}>
                    {book.title}
                  </Card.Title>
                  <HStack mt="3">
                    {book.status === "Completed" ? (
                      <Badge colorPalette={"green"} variant="subtle">
                        {book.status}
                      </Badge>
                    ) : (
                      <Badge colorPalette={"yellow"} variant="subtle">
                        {book.status}
                      </Badge>
                    )}
                    <Badge colorPalette={"purple"} variant="subtle">
                      {book.pageCount} pages
                    </Badge>
                  </HStack>
                  <Card.Description mt="3">
                    Author: {book.author}
                  </Card.Description>
                  <Card.Description mt="3">ISBN: {book.isbn}</Card.Description>
                </Box>
              </Flex>
            </Card.Body>
          </Card.Root>
        </Flex>
      </GridItem>
    </Link>
  );
};

export default SingleBookCard;
