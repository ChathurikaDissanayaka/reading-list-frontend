import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import BookCard from "../components/home/BookCard";
import BookTable from "../components/home/BookTable";
import { Box, HStack, Text, Flex } from "@chakra-ui/react";
import { Button } from "../components/ui/button";
import { BsPlusSquare } from "react-icons/bs";
import { CiViewTable } from "react-icons/ci";
import { BsCardText } from "react-icons/bs";
import { ColorModeButton } from "../components/ui/color-mode";

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
          bgGradient={"to-r"}
          gradientFrom={"#7928CA"}
          gradientTo={"#FF0080"}
          bgClip={"text"}
          textTransform={"uppercase"}
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
