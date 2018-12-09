import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class BookStore {
  constructor() {
    (this.books = []),
      (this.loading = true),
      (this.query = ""),
      (this.color = "");
  }

  fetchBooks() {
    return instance
      .get("/api/books/")
      .then(res => res.data)
      .then(book => {
        this.books = book;
        console.log(this.books);
        this.loading = false;
      })
      .catch(err => console.error(err));
  }

  get filteredBooks() {
    return this.books.filter(book =>
      `${book.title}`.toLowerCase().includes(this.query)
    );
  }

  findBooksByAuthor(author) {
    return this.books.filter(book => author.books.includes(book.id));
  }

  filterBooksByColor(bookColor) {
    return this.filteredBooks.filter(book => book.color === bookColor);
  }

  toggleAvailability(book) {
    if (book.available) book.available = false;
    else book.available = true;
  }
}

decorate(BookStore, {
  books: observable,
  loading: observable,
  query: observable,
  filteredBooks: computed
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;
