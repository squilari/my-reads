import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Search } from "./Search";
import { Shelf } from "./Shelf";
import { BrowserRouter as Router, Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    query: "",
    searchedBooks: [],
    searchError: false,
    books: []
  };

  updateShelf = book => {
    this.setState(currentState => {
      const updatedBooks = currentState.books.filter(
        b => b.title !== book.title
      );

      const updateSearch = currentState.searchBooks.map(
        b => (b.title === book.title ? book : b)
      );

      updatedBooks.push(book);

      return {
        books: updatedBooks,
        searchBooks: updateSearch
      };
    });
  };

  updateQuery = query => {
    if (query) {
      BooksAPI.search(query, 25).then(data => {
        this.setState(currentState => ({
          query: query,
          searchError: data.error ? true : false,
          searchBooks: data.error
            ? data.items
            : data.map(book => {
                const tnail = book.imageLinks ? book.imageLinks.thumbnail : "";
                const hasOption = currentState.books.filter(
                  b => b.title === book.title
                );
                return {
                  cover: tnail,
                  author: book.authors,
                  title: book.title,
                  option: hasOption.length > 0 ? hasOption[0].option : "none"
                };
              })
        }));
      });
    } else {
      this.setState(() => ({
        query: query,
        searchBooks: []
      }));
    }
  };
  /**
   * TODO: Instead of using this state variable to keep track of which page
   * we're on, use the URL in the browser's address bar. This will ensure that
   * users can use the browser's back and forward buttons to navigate between
   * pages, as well as provide a good URL they can bookmark and share.
   */

  render() {
    const { query, books, searchBooks, searchError } = this.state;
    const showingBooks = query === "" ? [] : searchBooks;
    return (
      <div className="app">
        <Router>
          <div>
            <Route
              exact
              path="/"
              component={() => (
                <Shelf books={books} updateShelf={this.updateShelf} />
              )}
            />
            <Route
              path="/search"
              component={() => (
                <Search
                  updateQuery={this.updateQuery}
                  query={query}
                  showingBooks={showingBooks}
                  searchError={searchError}
                  updateShelf={this.updateShelf}
                />
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
