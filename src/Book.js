import React from "react";

export const Book = props => {
  const changeBookOption = event => {
    props.updateShelf(props.book, event.target.value);
  };

  const { book } = props;
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
          <select onChange={changeBookOption} value={shelf || "none"}>
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
      {isAuthor.map(author => (
        <div key={author} className="book-authors">
          {author}
        </div>
      ))}
    </div>
  );
};
