/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { IoInformationCircleOutline } from "react-icons/io5";
import { HStack, Table, Badge } from "@chakra-ui/react";

const BookTable = ({ books }) => {
  return (
    <Table.Root size="sm" variant={"outline"} showColumnBorder="true">
      <Table.Header h={{ md: "32px", lg: "50px" }}>
        <Table.Row>
          <Table.ColumnHeader textAlign={"center"}>No</Table.ColumnHeader>
          <Table.ColumnHeader textAlign={"center"}>Title</Table.ColumnHeader>
          <Table.ColumnHeader textAlign={"center"}>Author</Table.ColumnHeader>
          <Table.ColumnHeader
            textAlign={"center"}
            display={{ base: "none", md: "table-cell" }}
          >
            ISBN
          </Table.ColumnHeader>
          <Table.ColumnHeader
            textAlign={"center"}
            display={{ base: "none", md: "table-cell" }}
          >
            No of Pages
          </Table.ColumnHeader>
          <Table.ColumnHeader
            textAlign={"center"}
            display={{ base: "none", md: "table-cell" }}
          >
            Status
          </Table.ColumnHeader>
          <Table.ColumnHeader textAlign={"center"}>
            Operations
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {books.map((book, index) => (
          <Table.Row key={book._id}>
            <Table.Cell textAlign={"center"}>{index + 1}</Table.Cell>
            <Table.Cell textAlign={"center"}>{book.title}</Table.Cell>
            <Table.Cell textAlign={"center"}>{book.author}</Table.Cell>
            <Table.Cell
              textAlign={"center"}
              display={{ base: "none", md: "table-cell" }}
            >
              {book.isbn}
            </Table.Cell>
            <Table.Cell
              textAlign={"center"}
              display={{ base: "none", md: "table-cell" }}
            >
              {book.pageCount}
            </Table.Cell>
            <Table.Cell
              textAlign={"center"}
              display={{ base: "none", md: "table-cell" }}
            >
              {book.status === "completed" ? (
                <Badge colorPalette={"green"} variant="subtle">
                  {book.status}
                </Badge>
              ) : (
                <Badge colorPalette={"yellow"} variant="subtle">
                  {book.status}
                </Badge>
              )}
            </Table.Cell>
            <Table.Cell display={"flex"} justifyContent={"space-around"}>
              <HStack>
                <Link to={`/books/details/${book._id}`}>
                  <IoInformationCircleOutline color="#4A8A31" />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit color="#CEB038" />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete color="#A71819" />
                </Link>
              </HStack>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default BookTable;
