import React from "react";
import { Book } from "./Book";

export class Section extends React.Component {
  render() {
    const filteredBooks = this.props.books.filter(
      book => book.shelf === this.props.option
    );
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.section}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {filteredBooks.map(book => {
              return (
                <li key={book.id}>
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
