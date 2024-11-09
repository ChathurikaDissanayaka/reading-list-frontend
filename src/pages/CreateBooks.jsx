import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSnackbar } from "notistack";
import { Box, Button, Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const currentYear = new Date().getFullYear();
    if (!title || !author || !publishedYear) {
      enqueueSnackbar("All fields are required.", { variant: "warning" });
      return;
    } else if (publishedYear < 0 || publishedYear > currentYear) {
      enqueueSnackbar("Please enter a valid published year.", {
        variant: "warning",
      });
      return;
    }

    const data = {
      title,
      author,
      publishedYear,
    };
    setLoading(true);
    axios
      .post(`${backendUrl}/books`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book has been created successfully.", {
          variant: "success",
        });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar("Error occured.", { variant: "error" });
        console.log(err);
      });
  };

  return (
    <Box p={"4"}>
      <Navbar />

      {loading ? <LoadingSpinner /> : ""}
      <Flex alignItems={"center"} flexDir={"column"}>
        <Box>
          <div className="my-2">
            <label className="text-xl mr-4 text-gray-800">Title:</label>
            <input
              type="text"
              value={title}
              placeholder="To Kill a Mockingbird"
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-sky-400 px-4 py-2 w-full text-gray-700 rounded-lg my-2"
            />
          </div>
          <div className="my-2">
            <label className="text-xl mr-4 text-gray-800">Author:</label>
            <input
              type="text"
              value={author}
              placeholder="Harper Lee"
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-sky-400 px-4 py-2 w-full text-gray-700 rounded-lg my-2"
            />
          </div>
          <div className="my-2">
            <label className="text-xl mr-4 text-gray-800">
              Published Year:
            </label>
            <input
              type="number"
              value={publishedYear}
              min={0}
              max={new Date().getFullYear()}
              placeholder="1960"
              onChange={(e) => setPublishedYear(e.target.value)}
              className="border-2 border-sky-400 px-4 py-2 w-full text-gray-700 rounded-lg my-2"
            />
          </div>
          <Button onClick={handleSaveBook}>Save Details</Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default CreateBooks;
