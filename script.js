const openDialog = document.getElementById('openDialog');
const closeDialog = document.getElementById('closeDialog');
const myDialog = document.getElementById('myDialog');
const feed = document.getElementById('feed');
const form = document.getElementById('bookDetails');
form.addEventListener('submit', function(event) {
  console.log("form submitted");
  event.preventDefault();
  myDialog.close();
  const name = document.getElementById('name_input').value;
  const author = document.getElementById('author_input').value;
  const year = document.getElementById('year_input').value;
  const price = document.getElementById('name_input').value;
  const pages = document.getElementById('author_input').value;
  const description = document.getElementById('description_input').value;
  const finish = document.getElementById('finish_input').value;
  console.log("inputted: "+name+author);
  addBookToLibrary(name, author, year, price, pages, description, finish);
})
openDialog.addEventListener('click',function() {
    myDialog.showModal();
});
closeDialog.addEventListener('click',function() {
    myDialog.close();
});

var myLibrary = [];
var index = 1;
function Book(name, author, year, price, pages, finish, description) {
  this.name = name;
  this.author = author;
  this.year = year;
  this.price = price;
  this.pages = pages;
  this.finish = finish;
  this.description = description;
  this.dataID = index++; //first book is 1, every new book is incremented
}

function addBookToLibrary(name, author, year, price, pages, finish, description) {
  const newBook = new Book(name, author, year, price, pages, finish, description);
  console.log("created new Book")
  myLibrary.push(newBook);
  console.log("pushed book to list")
  display();
}
function display() {
  clearFeed();
  myLibrary.forEach(book => {
    const card = makeCard(book);
    feed.appendChild(card);
  })
}
function clearFeed() {
  while(feed.firstChild) {
    feed.removeChild(feed.firstChild);
  }
}
function makeCard(book) {
  const newCard = Object.assign(document.createElement('div'), { className: 'card' });
  const title = Object.assign(document.createElement('h3'), { className: 'name' });
  title.textContent = `Title: ${book.name}`;
  const author = Object.assign(document.createElement('p'), { className: 'author' });
  author.textContent = `Author: ${book.author}`;
  const year = Object.assign(document.createElement('p'), { className: 'year' });
  year.textContent = `Published: ${book.year}`;
  const price = Object.assign(document.createElement('p'), { className: 'price' });
  price.textContent = `$${book.price}`;
  const pages = Object.assign(document.createElement('p'), { className: 'pages' });
  pages.textContent = `${book.pages} pages`;
  const description = Object.assign(document.createElement('p'), { className: 'description' });
  description.textContent = `${book.description}`;
  const readButton = Object.assign(document.createElement('button'), { className: 'read' });
  readButton.textContent = "Read"
  readButton.className = book.finish ? 'green' : 'grey';
  readButton.addEventListener('click', () => toggle(book.dataID))
  const deleteButton = Object.assign(document.createElement('button'), { className: 'delete' });
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener('click', () => removeBook(book.dataID))
  newCard.appendChild(title);
  newCard.appendChild(author);
  newCard.appendChild(year);
  newCard.appendChild(price);
  newCard.appendChild(pages);
  newCard.appendChild(description);
  newCard.appendChild(readButton);
  newCard.appendChild(deleteButton);
  return newCard;
}

function toggle(dataID) {
  const book = myLibrary.find(book => book.dataID === dataID);
  if (book.finish == true) {
    book.finish = false;
  }
  else {
    book.finish = true;
  }
  display();
}
function removeBook(dataID) {
  myLibrary = myLibrary.filter(book => book.dataID !== dataID);
  display();
}

