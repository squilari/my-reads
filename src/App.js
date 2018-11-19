import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Search } from "./Search";
import { Shelf } from "./Shelf";
import { BrowserRouter as Router, Route } from "react-router-dom";

class BooksApp extends React.Component {
  /**
   * TODO: Instead of using this state variable to keep track of which page
   * we're on, use the URL in the browser's address bar. This will ensure that
   * users can use the browser's back and forward buttons to navigate between
   * pages, as well as provide a good URL they can bookmark and share.
   */

  render() {
    return (
      <div className="app">
        <Router>
          <div>
            <Route exact path="/" component={Shelf} />
            <Route path="/search" component={Search} />
          </div>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
