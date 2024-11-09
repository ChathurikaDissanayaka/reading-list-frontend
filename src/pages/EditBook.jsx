import axios from "axios";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Fieldset, Flex, Input } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import { Button } from "../components/ui/button";
import { Field } from "../components/ui/field";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../components/ui/native-select";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${backendUrl}/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setIsbn(res.data.isbn);
        setPageCount(res.data.pageCount);
        setStatus(res.data.status);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [backendUrl, id]);

  const handleEditBook = () => {
    if (!title || !author || !isbn || !pageCount || !status) {
      enqueueSnackbar("All fields are required.", { variant: "warning" });
      return;
    } else if (
      isbn <= 0 ||
      (isbn.toString().length !== 10 && isbn.toString().length !== 13)
    ) {
      enqueueSnackbar("Please enter a valid ISBN", {
        variant: "warning",
      });
      return;
    } else if (pageCount < 0) {
      enqueueSnackbar("Please enter a number of pages greater than 0.", {
        variant: "warning",
      });
      return;
    }
    const data = {
      title,
      author,
      isbn,
      pageCount,
      status,
    };
    setLoading(true);
    axios
      .put(`${backendUrl}/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book has been edited successfully.", {
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
    <Box p={"4"}>
      <Navbar destination="/books/operations" />
      {loading ? <LoadingSpinner /> : ""}
      <Flex alignItems={"center"} flexDir={"column"}>
        <Fieldset.Root w={{ lg: "lg", base: "250px", sm: "sm", md: "sm" }}>
          <Fieldset.Content>
            <Field label="Title" required mb={1}>
              <Input
                colorPalette={"blue"}
                value={title}
                placeholder="To Kill a Mockingbird"
                onChange={(e) => setTitle(e.target.value)}
                mb={4}
              />
            </Field>
            <Field label="Author" required mb={1}>
              <Input
                colorPalette={"blue"}
                value={author}
                placeholder="Harper Lee"
                onChange={(e) => setAuthor(e.target.value)}
                mb={4}
              />
            </Field>
            <Field label="ISBN" required mb={1}>
              <Input
                colorPalette={"blue"}
                type="number"
                value={isbn}
                placeholder="9780060935467"
                onChange={(e) => setIsbn(e.target.value)}
                mb={4}
              />
            </Field>
            <Field label="Number of pages" required mb={1}>
              <Input
                colorPalette={"blue"}
                type="number"
                value={pageCount}
                placeholder="323"
                onChange={(e) => setPageCount(e.target.value)}
                mb={4}
              />
            </Field>

            <Field label="Status">
              <NativeSelectRoot>
                <NativeSelectField
                  colorPalette={"blue"}
                  items={["Reading", "Completed"]}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  mb={4}
                />
              </NativeSelectRoot>
            </Field>
            <Button width={"100%"} colorPalette="blue" onClick={handleEditBook}>
              Save Details
            </Button>
          </Fieldset.Content>
        </Fieldset.Root>
      </Flex>
    </Box>
  );
};

export default EditBook;
