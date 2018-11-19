import React from "react";
import { Section } from "./Section";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export class Shelf extends React.Component {
  render() {
    const { books, updateShelf, openSearch } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Section
              books={books}
              section="Currently Reading"
              option="currentlyReading"
              updateShelf={updateShelf}
            />
            <Section
              books={books}
              section="Want to Read"
              option="wantToRead"
              updateShelf={updateShelf}
            />
            <Section
              books={books}
              section="Read"
              option="read"
              updateShelf={updateShelf}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}
