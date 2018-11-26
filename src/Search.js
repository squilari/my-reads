import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Book } from "./Book";
import { Link } from "react-router-dom";
import { getShelfOn, filterBooksOnShelf } from "./helpers";

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      searchedBooks: [],
      searchError: false
    };
  }

  updateQuery = query => {
    // set the query state
    this.setState(currentState => ({
      query: query
    }));

    // if a query exists, make the api call
    if (query) {
      BooksAPI.search(query, 25).then(data => {
        this.setState(currentState => ({
          searchError: data.error ? true : false,
          searchedBooks: data.error
            ? data.items
            : getShelfOn(data, this.props.books)
        }));
      });
    } else {
      this.setState({ searchedBooks: [] });
    }
  };

  render() {
    const { query, searchError, searchedBooks } = this.state;
    const { updateShelf, books } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <input
            className="search-bar-books"
            type="text"
            placeholder="Search Books"
            value={query}
            onChange={event => this.updateQuery(event.target.value)}
          />

          <Link className="close-search" to="/">
            Close
          </Link>
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
            {searchedBooks.map(book => {
              return (
                <li key={book.id}>
                  <Book book={book} updateShelf={updateShelf} />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}
