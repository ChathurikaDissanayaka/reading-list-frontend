import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineWrench } from "react-icons/hi2";
import { Box, HStack, Text, Flex } from "@chakra-ui/react";
import LoadingSpinner from "../components/LoadingSpinner";
import BookCard from "../components/home/BookCard";
import { ColorModeButton } from "../components/ui/color-mode";
import { Button } from "../components/ui/button";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [bookCount, setBookCount] = useState([]);
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
    <Box p={"4"}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={"row"}
      >
        <Text
          bgColor={"blue.600"}
          bgClip={"text"}
          textAlign={"center"}
          fontSize={{
            base: "16px",
            sm: "25px",
          }}
          fontWeight={"bold"}
        >
          <Link to={"/"}>Reading List</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to="/books/operations">
            <Button size="sm" variant="outline">
              <HiOutlineWrench />
            </Button>
          </Link>
          <ColorModeButton variant="outline" />
        </HStack>
      </Flex>

      {loading ? <LoadingSpinner /> : ""}
      <BookCard books={books} bookCount={bookCount} />
    </Box>
  );
};

export default Home;
