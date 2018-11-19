import React from "react";

export class Book extends React.Component {
  changeBookOption = event => {
    this.props.updateShelf(this.props.book, event.target.value);
  };

  render() {
    const { book } = this.props;
    const { imageLinks, title, authors, shelf } = book;
    const isAuthor = authors ? authors : [];
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${imageLinks ? imageLinks.thumbnail : ""})`
            }}
          />
          <div className="book-shelf-changer">
            <select onChange={this.changeBookOption} value={shelf || "none"}>
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
        <div className="book-title">{title}</div>
        {isAuthor.map(author => <div className="book-authors">{author}</div>)}
      </div>
    );
  }
}
