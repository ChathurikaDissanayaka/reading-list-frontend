import SingleBookCard from "./SingleBookCard";
import { Grid, Container, Text } from "@chakra-ui/react";

const BookCard = ({ books, readingCount, completedCount }) => {
  return (
    <Container maxW={{ md: "3xl", lg: "5xl" }}>
      {readingCount === 0 ? (
        ""
      ) : (
        <Text
          fontSize={{
            base: "16px",
            sm: "25px",
          }}
          fontWeight="bold"
          mb="3"
        >
          Reading({readingCount})
        </Text>
      )}

      <Grid
        gridTemplateColumns={{
          lg: "repeat(3, minmax(0, 1fr))",
          md: "repeat(2, minmax(0, 1fr))",
          base: "repeat(1, minmax(0, 1fr))",
        }}
        columns={{ base: 1, md: 2, lg: 3 }}
        gap="5"
        maxW="6xl"
      >
        {books.map((book) =>
          book.status === "Reading" ? (
            <SingleBookCard key={book._id} book={book} />
          ) : (
            ""
          )
        )}
      </Grid>
      {completedCount === 0 ? (
        ""
      ) : (
        <Text
          fontSize={{
            base: "16px",
            sm: "25px",
          }}
          fontWeight="bold"
          mb="3"
          mt="8"
        >
          Completed({completedCount})
        </Text>
      )}
      <Grid
        gridTemplateColumns={{
          lg: "repeat(3, minmax(0, 1fr))",
          md: "repeat(2, minmax(0, 1fr))",
          base: "repeat(1, minmax(0, 1fr))",
        }}
        columns={{ base: 1, md: 2, lg: 3 }}
        gap="5"
        maxW="6xl"
      >
        {books.map((book) =>
          book.status === "Completed" ? (
            <SingleBookCard key={book._id} book={book} />
          ) : (
            ""
          )
        )}
      </Grid>
    </Container>
  );
};

export default BookCard;
