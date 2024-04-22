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
    this.read ? "read" : "not read"
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

  myLibrary.unshift(book);
}

// render books
function renderBooks() {
  const booksHtml = myLibrary
    .map((el, i) => {
      return `<article class="book" data-id=${i}>
    <div class='book-content'>
      <div>
        <h4 class="book-title">${el.title}</h4>
        <p class="book-by">by</p>
        <h5 class="book-author">${el.author}</h5>
      </div>
      <div>
        <span class="book-pages">${el.pages} pages</span>
        <span class="book-read">${el.read ? "read" : "not read"}</span>
      </div>
    </div>
    <footer>
      <div class="dropBtn" onClick="toggleDropdown(event)"></div>
      <div class="dropdown-content">
        <div>
          <label>
          
            <input
              type="checkbox"
              class="toggle-read"
              data-id=${i}
              ${el.read ? "checked" : ""}
            />
            <span>Toggle Read</span>
          </label>
          
        </div>
        <div>
          <button
            class="delete-button"
            data-id=${i}
          >
            <img
              src="./images/trash-bin.svg"
              alt="delete book icon"
            />
            <span>Delete Book</span>
          </button>
        </div>
      </div>
    </footer>
  </article>`;
    })
    .join("");
  document.querySelector(".books-container").innerHTML = booksHtml;
  addEventHandlersBook();
}

// add event listeners to every books delete and checkRead buttons
function addEventHandlersBook() {
  const books = document.querySelectorAll(".book");
  if (books.length <= 0) {
    return;
  }
  books.forEach((bookDOM) => {
    const deleteBtn = bookDOM.querySelector(".delete-button");
    const toggleRead = bookDOM.querySelector(".toggle-read");

    // delete book
    deleteBtn.addEventListener("click", () => {
      myLibrary.splice(deleteBtn.dataset.id, 1);
      renderBooks();
    });
    // edit book
    toggleRead.addEventListener("change", () => {
      myLibrary[toggleRead.dataset.id].readToggler();
      renderBooks();
    });
  });
}

// dropdown function
function toggleDropdown(e) {
  const dropdownContent = e.target.nextElementSibling;
  if (dropdownContent) {
    dropdownContent.classList.toggle("show");
  }
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
// cancel adding books
cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});
// submit adding book
form.addEventListener("submit", function () {
  addBookToLibrary.call(this);
  renderBooks(booksContainer);
});

// hide dropdown if click outside
window.onclick = function (event) {
  if (!event.target.matches(".dropBtn")) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", renderBooks);
