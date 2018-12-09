import React, { Component } from "react";

import { observer } from "mobx-react";

// Components
import BookTable from "./BookTable";

import authorStore from "./stores/AuthorStore";
import bookStore from "./stores/bookStore";

class AuthorDetail extends Component {
  render() {
    const author = authorStore.getAuthorById(this.props.match.params.authorID);
    console.log(author.first_name);
    return (
      <div className="author">
        <div>
          <h3>{author.first_name + " " + author.last_name}</h3>
          <img
            src={author.imageUrl}
            className="img-thumbnail img-fluid"
            alt={author.first_name + " " + author.last_name}
          />
        </div>
        <BookTable books={bookStore.findBooksByAuthor(author)} />
      </div>
    );
  }
}

export default observer(AuthorDetail);
