const myLibrary = [
  new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true),
  new Book("To Kill a Mockingbird", "Harper Lee", 281, false),
  new Book("1984", "George Orwell", 328, true),
  new Book("Pride and Prejudice", "Jane Austen", 279, false),
  new Book("The Catcher in the Rye", "J.D. Salinger", 234, true),
  new Book("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 320, false),
  new Book("The Hobbit", "J.R.R. Tolkien", 310, true),
  new Book("The Da Vinci Code", "Dan Brown", 454, false),
  new Book("The Hunger Games", "Suzanne Collins", 374, true),
  new Book("The Alchemist", "Paulo Coelho", 197, false),
];

// The Book Class
function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.read ? "read" : "not read yet"
  }`;
};
Book.prototype.readToggler = function () {
  this.read = !this.read;
};

// submit handler function
function addBookToLibrary() {
  const formData = new FormData(this);

  const title = formData.get("title");
  const author = formData.get("author");
  const pages = Number(formData.get("pages"));
  const read = Boolean(formData.get("read"));

  const book = new Book(title, author, pages, read);

  myLibrary.push(book);
}

// render books
function renderBooks(inHere) {
  const booksHtml = myLibrary
    .map((el, i) => {
      return `<article class="book" data-id=${i}>
    <h4>${el.info()}</h4>
    <footer>
      <input
        type="checkbox"
        class="toggle-read"
        data-id=${i}
      />
      <button
        class="delete-button"
        data-id=${i}
      >
        <img
          src="./images/trash-bin.svg"
          alt="delete book icon"
        />
      </button>
    </footer>
  </article>`;
    })
    .join("");
  document.querySelector(".books-container").innerHTML = booksHtml;
}

// The dialog box
const addBookDialogBtn = document.getElementById("add-book");
const dialog = document.getElementById("dialog");
const form = document.querySelector("#dialog form");
const cancelBtn = document.getElementById("cancel");

// books dom
const booksContainer = document.querySelector(".books-container");

// Register Events

// reveal dialog form
addBookDialogBtn.addEventListener("click", (e) => {
  dialog.showModal();
});
// cancel
cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});
// submit
form.addEventListener("submit", function () {
  addBookToLibrary.call(this);
  renderBooks(booksContainer);
});

// delete book, edit book
