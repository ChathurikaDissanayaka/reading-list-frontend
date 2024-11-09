
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import BookTable from "../components/home/BookTable"
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { BsPlusSquare } from "react-icons/bs";

const Operations = () => {
    const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
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
    <Box p={"4"} >
        <Navbar />
    {loading ? <LoadingSpinner /> : ""}
    <Flex alignItems={"center"} flexDir={"column"}>
        <Box w={{base:"95%", md:"500px" ,lg:"800px"}}>
    <Text
        fontSize={{
          base: "16px",
          sm: "25px",
        }}
        fontWeight={"bold"}
        mb={3}
      >
        Add, edit or update books
      </Text>
      <Flex h={16} alignItems={"center"}>
        <Text>Add a book</Text>
        <Link to="/books/create">
          <Button size="sm" variant="outline" marginLeft="3">
            <BsPlusSquare />
          </Button>
        </Link>
      </Flex>
    <BookTable books={books} />
    </Box>
    </Flex>
    </Box>
  )
}

export default Operations