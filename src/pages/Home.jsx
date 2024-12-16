import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineWrench } from "react-icons/hi2";
import { Box, HStack, Text, Flex } from "@chakra-ui/react";
import LoadingSpinner from "../components/LoadingSpinner";
import BookCard from "../components/home/BookCard";
import { ColorModeButton } from "../components/ui/color-mode";
import { Button } from "../components/ui/button";
import NoBooksFound from "../components/NoBooksFound";

const Home = () => {
  const message = "Go to operations tab to add books.";

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [books, setBooks] = useState([]);
  const [bookCount, setBookCount] = useState("");
  const [readingCount, setReadingCount] = useState("");
  const [completedCount, setCompletedCount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${backendUrl}/books`)
      .then((res) => {
        setBooks(res.data.data);
        setBookCount(res.data.count);
        setReadingCount(res.data.statusCounts.Reading);
        setCompletedCount(res.data.statusCounts.Completed);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [backendUrl]);

  return (
    <Box p="4">
      <Flex
        h="16"
        alignItems="center"
        justifyContent="space-between"
        flexDir="row"
      >
        <Text
          bgColor="blue.600"
          bgClip="text"
          textAlign="center"
          fontSize={{
            base: "16px",
            sm: "25px",
          }}
          fontWeight="bold"
        >
          <Link to={"/"}>BookBuddy</Link>
        </Text>
        <HStack spacing="2" alignItems="center">
          <Link to="/books/operations">
            <Button size="sm" variant="outline">
              <HiOutlineWrench />
            </Button>
          </Link>
          <ColorModeButton variant="outline" />
        </HStack>
      </Flex>

      {loading ? (
        <LoadingSpinner />
      ) : bookCount === 0 ? (
        <NoBooksFound message={message} />
      ) : (
        <BookCard
          books={books}
          readingCount={readingCount}
          completedCount={completedCount}
        />
      )}
    </Box>
  );
};

export default Home;
