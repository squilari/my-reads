import React from "react";
import { Book } from "./Book";

export class Search extends React.Component {
  render() {
    const {
      query,
      updateQuery,
      closeSearch,
      searchError,
      updateShelf,
      showingBooks
    } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <input
            className="search-bar-books"
            type="text"
            placeholder="Search Books"
            value={query}
            onChange={event => updateQuery(event.target.value)}
          />

          <a className="close-search" onClick={() => closeSearch()}>
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
                <li key={book.title}>
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
