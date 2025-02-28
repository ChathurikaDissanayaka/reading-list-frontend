import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import { Button } from "../components/ui/button";

const DeleteBook = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`${backendUrl}/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book has been deleted.", {
          variant: "success",
        });
        navigate("/books/operations");
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar("Error occured.", { variant: "error" });
        console.log(err);
      });
  };

  return (
    <Box p="4">
      <Navbar destination="/books/operations" />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Flex flexDir="column" alignItems="center">
          <Box
            maxW="xl"
            p="16"
            borderWidth="1px"
            borderColor="border.disabled"
            color="fg.disabled"
            borderRadius="md"
          >
            <Flex flexDir="column" alignItems="center" justifyItems="center">
              <Text fontSize="25px" marginBottom="5">
                Do you really want to delete this book?
              </Text>
              <Button colorPalette="red" w="full" onClick={handleDeleteBook}>
                Yes, delete it
              </Button>
            </Flex>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default DeleteBook;
