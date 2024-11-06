/* eslint-disable react/prop-types */
import SingleBookCard from "./SingleBookCard";
import { Grid, Container } from "@chakra-ui/react";

const BookCard = ({ books }) => {
  return (
    <Container maxW={{ md: "3xl", lg: "5xl" }}>
      <Grid
        gridTemplateColumns={{
          lg: "repeat(3, minmax(0, 1fr))",
          md: "repeat(2, minmax(0, 1fr))",
          base: "repeat(1, minmax(0, 1fr))",
        }}
        columns={{ base: 1, md: 2, lg: 3 }}
        gap={5}
        maxW={"6xl"}
      >
        {books.map((book) => (
          <SingleBookCard key={book._id} book={book} />
        ))}
      </Grid>
    </Container>
  );
};

export default BookCard;
