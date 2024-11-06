/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Button } from "@chakra-ui/react";
import { Badge, Box, Card, HStack, Image, Flex } from "@chakra-ui/react";
import { GridItem } from "@chakra-ui/react";

const SingleBookCard = ({ book }) => {
  return (
    <GridItem key={book._id}>
      <Flex flexDir={"column"} alignItems={"center"}>
        <Card.Root maxW="xl" overflow="hidden">
          <Card.Body gap="2">
            <Flex flexDir={{ base: "column", md: "row" }} alignItems={"center"}>
              <Image
                h={"150px"}
                src={book.coverImage}
                alt={book.title}
                rounded={"md"}
              />
              <Box ml={{ base: 0, md: 5 }}>
                <Card.Title>{book.title}</Card.Title>
                <HStack mt="3">
                  {book.status === "completed" ? (
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

                <HStack mt="5">
                  <Link to={`/books/details/${book._id}`}>
                    <Button size="sm" variant="surface">
                      <BsInfoCircle />
                    </Button>
                  </Link>
                  <Link to={`/books/edit/${book._id}`}>
                    <Button size="sm" variant="surface">
                      <AiOutlineEdit />
                    </Button>
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <Button size="sm" variant="surface">
                      <MdOutlineDelete />
                    </Button>
                  </Link>
                </HStack>
              </Box>
            </Flex>
          </Card.Body>
        </Card.Root>
      </Flex>
    </GridItem>
  );
};

export default SingleBookCard;
