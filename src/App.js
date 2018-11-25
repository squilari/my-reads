import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Search } from "./Search";
import { Shelf } from "./Shelf";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { putOnShelf } from "./helpers";

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
          books: putOnShelf(currentState.books, data)
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
              component={() => Shelf({ books, updateShelf })}
            />
            <Route path="/search" component={Search} />
          </div>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
