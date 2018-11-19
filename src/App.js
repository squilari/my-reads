import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class Section extends React.Component {
  render() {
    const filteredBooks = this.props.books.filter(
      book => book.option === this.props.option
    );
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.section}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {filteredBooks.map(book => {
              return (
                <li>
                  <Book book={book} updateShelf={this.props.updateShelf} />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

class Book extends React.Component {
  changeBookOption = event => {
    this.props.updateShelf({ ...this.props.book, option: event.target.value });
  };
  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${this.props.book.cover})`
            }}
          />
          <div className="book-shelf-changer">
            <select
              onChange={this.changeBookOption}
              value={this.props.book.option}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.author}</div>
      </div>
    );
  }
}

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
          <div className="search-books">
            <div className="search-books-bar">
              <input
                className="search-bar-books"
                type="text"
                placeholder="Search Books"
                value={query}
                onChange={event => this.updateQuery(event.target.value)}
              />

              <a
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              {searchError ? "Invalid Search" : <span />}
              <ol className="books-grid">
                {showingBooks.map(book => {
                  return (
                    <li>
                      <Book book={book} updateShelf={this.updateShelf} />
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
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
