const chooseShelf = (book, shelf) => {
  return shelf.currentlyReading.indexOf(book.id) != -1
    ? "currentlyReading"
    : shelf.read.indexOf(book.id) != -1
      ? "read"
      : shelf.wantToRead.indexOf(book.id) != -1
        ? "wantToRead"
        : "none";
};

export const putOnShelf = (books, shelf) => {
  return books.map(book => {
    return {
      ...book,
      shelf: chooseShelf(book, shelf)
    };
  });
};

export const filterBooksOnShelf = (books, shelf) => {
  return books.filter(x => x.shelf === shelf).map(m => m.id);
};
