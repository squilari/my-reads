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
                  <Book book={book} />
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
            <select>
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
    showSearchPage: true,
    searchedBooks: [],
    searchError: false,
    books: [
      {
        cover:
          "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        option: "currentlyReading"
      },
      {
        cover:
          "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api",
        title: "Ender's Game",
        author: "Orson Scott Card",
        option: "currentlyReading"
      },
      {
        cover:
          "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
        title: "1776",
        author: "David McCullough",
        option: "wantToRead"
      },
      {
        cover:
          "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api",
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        option: "wantToRead"
      },
      {
        cover:
          "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        option: "read"
      },
      {
        cover:
          "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api",
        title: "Oh, the Places You'll Go!",
        author: "Seuss",
        option: "read"
      },
      {
        cover:
          "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api",
        title: "The Adventures of Tom Sawyer",
        author: "Mark Twain",
        option: "read"
      }
    ]
  };

  updateQuery = query => {
    if (query) {
      BooksAPI.search(query, 25).then(data => {
        this.setState(() => ({
          query: query,
          searchError: data.error ? true : false,
          searchBooks: data.error
            ? data.items
            : data.map(book => {
                const tnail = book.imageLinks ? book.imageLinks.thumbnail : "";
                return {
                  cover: tnail,
                  author: book.authors,
                  title: book.title
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
                      <Book book={book} />
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
                />
                <Section
                  books={this.state.books}
                  section="Want to Read"
                  option="wantToRead"
                />
                <Section
                  books={this.state.books}
                  section="Read"
                  option="read"
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
