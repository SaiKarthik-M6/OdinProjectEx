// STEP 1: Data Storage
const myLibrary = [];

// STEP 2: Book Object
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();  // unique ID
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

// STEP 3: Add Book Function
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  showBooks(); // update the screen
}

// STEP 4: Show All Books
function showBooks() {
  const library = document.getElementById("library"); // connects to HTML
  library.innerHTML = ""; // clear screen

  for (let book of myLibrary) {
    const div = document.createElement("div");
    div.className = "book";
    div.setAttribute("data-id", book.id);

    div.innerHTML = `
      <p><strong>${book.title}</strong> by ${book.author}</p>
      <p>${book.pages} pages</p>
      <p>${book.read ? "Read" : "Not Read"}</p>
      <button onclick="toggleBook('${book.id}')">Toggle Read</button>
      <button onclick="removeBook('${book.id}')">Remove</button>
    `;

    library.appendChild(div);
  }
}

// STEP 5: Form Handling
function showForm() {
  document.getElementById("book-form").style.display = "block";
}

function submitForm(e) {
  e.preventDefault(); // stop page reload

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);

  document.getElementById("book-form").reset();
  document.getElementById("book-form").style.display = "none";
}

// STEP 6: Remove and Toggle
function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    showBooks();
  }
}

function toggleBook(id) {
  const book = myLibrary.find(book => book.id === id);
  if (book) {
    book.toggleRead();
    showBooks();
  }
}
