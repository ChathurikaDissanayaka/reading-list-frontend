import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, Flex, Text } from "@chakra-ui/react";
import LoadingSpinner from "../components/LoadingSpinner";
//
import { Badge, Card, HStack, Image } from "@chakra-ui/react";
//

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${backendUrl}/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [backendUrl, id]);

  return (
    <Box p={"4"}>
      <Navbar />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Flex flexDir={"column"} alignItems={"center"} >
          <Card.Root maxW="md" overflow="hidden">
            <Image src={book.coverImage} alt={book.title} />
            <Card.Body gap="2">
              <Card.Title>{book.title}</Card.Title>
              <Card.Description>
                <Text>Author: {book.author}</Text>
                <Text mt={"2"}>ISBN: {book.isbn}</Text>
                <Text mt={"2"}>Created Time: {new Date(book.createdAt).toLocaleString()}</Text>
                <Text mt={"2"}>
                  Last Updated Time: {new Date(book.updatedAt).toLocaleString()}
                </Text>
              </Card.Description>
              <HStack mt="2">
                {book.status === "completed" ? <Badge colorPalette={"green"}>{book.status}</Badge> : <Badge colorPalette={"blue"}>{book.status}</Badge>}
                <Badge variant="outline">{book.pageCount} pages</Badge>
              </HStack>
            </Card.Body>
          </Card.Root>
        </Flex>
      )}
    </Box>
  );
};

export default ShowBook;
