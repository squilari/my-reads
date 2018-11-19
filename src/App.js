import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Section } from "./Section";
import { Book } from "./Book";
import { Search } from "./Search";

class BooksApp extends React.Component {
  state = {
    query: "",
    showSearchPage: false,
    searchedBooks: [],
    searchError: false,
    books: []
  };

  updateShelf = book => {
    this.setState(currentState => {
      const updatedBooks = currentState.books.filter(
        b => b.title != book.title
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

  closeSearch = () => {
    this.setState({ showSearchPage: false });
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
        {this.state.showSearchPage ? (
          <Search
            updateQuery={this.updateQuery}
            query={query}
            showingBooks={showingBooks}
            searchError={searchError}
            updateShelf={this.updateShelf}
            closeSearch={this.closeSearch}
          />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Section
                  books={this.state.books}
                  section="Currently Reading"
                  option="currentlyReading"
                  updateShelf={this.updateShelf}
                />
                <Section
                  books={this.state.books}
                  section="Want to Read"
                  option="wantToRead"
                  updateShelf={this.updateShelf}
                />
                <Section
                  books={this.state.books}
                  section="Read"
                  option="read"
                  updateShelf={this.updateShelf}
                />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
