import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsPlusSquare } from "react-icons/bs";
import { CiViewTable } from "react-icons/ci";
import { BsCardText } from "react-icons/bs";
import { Box, HStack, Text, Flex } from "@chakra-ui/react";
import LoadingSpinner from "../components/LoadingSpinner";
import BookCard from "../components/home/BookCard";
import BookTable from "../components/home/BookTable";
import { ColorModeButton } from "../components/ui/color-mode";
import { Button } from "../components/ui/button";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${backendUrl}/books`)
      .then((res) => {
        setBooks(res.data.data);
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
            base: "32px",
            sm: "28px",
          }}
          fontWeight={"bold"}
        >
          <Link to={"/"}>Reading List</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowType("table")}
          >
            <CiViewTable />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowType("card")}
          >
            <BsCardText />
          </Button>
          <ColorModeButton variant="outline" />
        </HStack>
      </Flex>
      <Flex h={16} alignItems={"center"}>
        <Text>Add a book</Text>
        <Link to="/books/create">
          <Button size="sm" variant="outline" marginLeft="3">
            <BsPlusSquare />
          </Button>
        </Link>
      </Flex>

      {loading ? (
        <LoadingSpinner />
      ) : showType === "table" ? (
        <BookTable books={books} />
      ) : (
        <BookCard books={books} />
      )}
    </Box>
  );
};

export default Home;
