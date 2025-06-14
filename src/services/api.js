export const getBooks = async () => {
  const url = "https://reactnd-books-api.udacity.com/books";
  const response = await fetch(url, {
    headers: { Authorization: "whatever-you-want" },
  });
  const { books } = await response.json();
  return books;
};

export const getBookById = async (bookId) => {
  const url = `https://reactnd-books-api.udacity.com/books/${bookId}`;
  const response = await fetch(url, {
    headers: { Authorization: "whatever-you-want" },
  });
  const { book } = await response.json();
  return book;
};
