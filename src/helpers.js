const chooseShelf = (book, shelf) => {
  return shelf.currentlyReading.indexOf(book.id) !== -1
    ? "currentlyReading"
    : shelf.read.indexOf(book.id) !== -1
      ? "read"
      : shelf.wantToRead.indexOf(book.id) !== -1
        ? "wantToRead"
        : "none";
};

export const addBook = (books, book) => {
  return books.filter(b => b.id === book.id).length > 0
    ? books
    : [...books, book];
};

export const putOnShelf = (books, shelf) => {
  return books.map(book => {
    return {
      ...book,
      shelf: chooseShelf(book, shelf)
    };
  });
};

const getShelf = (book, shelf) => {
  const match = shelf.filter(b => b.id === book.id);
  return match.length > 0 ? match[0].shelf : "none";
};

export const getShelfOn = (books, shelf) => {
  return books.map(book => {
    return {
      ...book,
      shelf: getShelf(book, shelf)
    };
  });
};

export const filterBooksOnShelf = (books, shelf) => {
  return books.filter(x => x.shelf === shelf).map(m => m.id);
};
