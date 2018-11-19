import React from "react";

export class Book extends React.Component {
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
