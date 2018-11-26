import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Search } from "./Search";
import { Shelf } from "./Shelf";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { putOnShelf, addBook } from "./helpers";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(data =>
      this.setState({
        books: data
      })
    );
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(data =>
      this.setState(currentState => {
        return {
          books: putOnShelf(addBook(currentState.books, book), data)
        };
      })
    );
  };

  render() {
    const {
      state: { books },
      updateShelf
    } = this;

    return (
      <div className="app">
        <Router>
          <div>
            <Route
              exact
              path="/"
              render={props => (
                <Shelf {...props} books={books} updateShelf={updateShelf} />
              )}
            />
            <Route
              path="/search"
              render={props => (
                <Search {...props} books={books} updateShelf={updateShelf} />
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
