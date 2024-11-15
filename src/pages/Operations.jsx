import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import BookTable from "../components/home/BookTable";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import AddBook from "../components/AddBook";
import NoBooksFound from "../components/NoBooksFound";

const Operations = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [books, setBooks] = useState([]);
  const [bookCount, setBookCount] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${backendUrl}/books`)
      .then((res) => {
        setBooks(res.data.data);
        setBookCount(res.data.count);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [backendUrl]);
  return (
    <Box p="4">
      <Navbar />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Flex alignItems="center" flexDir="column">
          <Box w={{ base: "95%", md: "500px", lg: "800px" }}>
            <Text
              fontSize={{
                base: "16px",
                sm: "25px",
              }}
              fontWeight="bold"
              mb="3"
            >
              Add, edit or update books
            </Text>
            <AddBook />
            {bookCount === 0 ? <NoBooksFound /> : <BookTable books={books} />}
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default Operations;
