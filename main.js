let myLibrary = [],
  submitBookBtn = document.querySelector('#new-book-submit-btn'),
  bookshelf = document.querySelector("#bookshelf");
  myForm = document.querySelector("#my-form");
  overlay = document.querySelector("#overlay");
  addBookBtn = document.querySelector(".add-new-book-btn"),
  formContainer = document.querySelector(".form-container");

// Functions
function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

function addBookToLibrary() {

  event.preventDefault();

  let titleInput = document.querySelector('#title').value,
    authorInput = document.querySelector('#author').value,
    pagesInput = document.querySelector('#pages').value,
    checkboxInput = document.querySelector('#checkbox').checked;
  
    let book = new Book(titleInput, authorInput, pagesInput, checkboxInput);

    myLibrary.push(book);

    // Clear old list displayed on page
    bookshelf.innerHTML = '';

    // Display updated list
    displayBooksOnBookshelf(myLibrary);  

    hideOverlay();
    let JSONlibrary = JSON.stringify(myLibrary)
    localStorage.setItem('library', JSONlibrary);

    storedLibrary = JSON.parse(localStorage.getItem('library'))

};

function getAndDisplayLibraryFromStorage () {
  myLibrary = JSON.parse(localStorage.getItem('library'))

  if (myLibrary === null) {
    myLibrary = [];
    return;
  }

  displayBooksOnBookshelf(myLibrary);
}

function displayBooksOnBookshelf (myLibrary) {

  myLibrary.forEach(book => {

    // Create Book Div & Add 'bookDiv' Class
    let bookDiv = document.createElement('div');
    bookDiv.classList.add('bookDiv');

    // Book Name, Author, and Pages Text Nodes
    let titleSpan = document.createElement('span');
    titleSpan.innerText = book.name;
    titleSpan.classList.add('title-span')
    let authorSpan = document.createElement('span');
    authorSpan.innerText = book.author; 
    let pagesSpan = document.createElement('span');
    pagesSpan.innerText = book.pages; 
  

    // Remove Btn
    removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.innerText = "Delete";
    removeBtn.addEventListener('click', deleteDiv);

    // Add Index of Book to Delete Btn (Added to delete Btn cause I'm lazy, erm smart ;) That's the target)
    let bookIndex = myLibrary.indexOf(book);
    bookDiv.setAttribute("id", bookIndex);

    // Read Status
    let readStatusBtn = document.createElement('button');

    // Default State is Not Read
    readStatusBtn.classList.add('not-read');
    readStatusBtn.innerText = "Not Read";
    readStatusBtn.addEventListener('click', function (e) {

      if (readStatusBtn.classList[0] === 'not-read') {
        readStatusBtn.classList.remove('not-read');
        readStatusBtn.classList.add('read');
        readStatusBtn.innerText = 'Read';

        // Update Read Status In Array
        myLibrary[e.target.parentNode.id].read = true;

      } else {
        readStatusBtn.classList.remove('read');
        readStatusBtn.classList.add('not-read');
        readStatusBtn.innerText = 'Not Read';
        // Update Read Status In Array

        myLibrary[e.target.parentNode.id].read = false;
        
      }

      // Update Local Storage
      let JSONlibrary = JSON.stringify(myLibrary);
      localStorage.setItem('library', JSONlibrary);
    
    });


    // If read, then toggle opposite state
    if (book.read) {
      readStatusBtn.classList.remove('not-read');
      readStatusBtn.classList.toggle('read');
      readStatusBtn.innerText = "Read";
    };

    // readStatusBtn.classList.add('read-status');
    readStatusBtn.addEventListener('click', function() {
      readStatusBtn.classList.toggle
    });

    // Append p tags to bookDiv
    bookDiv.appendChild(titleSpan);
    bookDiv.appendChild(authorSpan);
    bookDiv.appendChild(pagesSpan);
    bookDiv.appendChild(readStatusBtn);
    bookDiv.appendChild(removeBtn);

    // Append bookDiv to bookshelf
    bookshelf.appendChild(bookDiv);
  
})};

function displayBookInputForm () {
  formContainer.style.visibility = "visible";
  overlay.style.visibility = "visible";
};

function hideOverlay () {
  myForm.reset();
  formContainer.style.visibility = "hidden";
  overlay.style.visibility = "hidden";
};

function deleteDiv (e) {
  let indexOfBook = e.target.parentNode.id;
  myLibrary.splice(indexOfBook, 1);

  // Delete Local Storage Library
  localStorage.removeItem('library');

  // e.target.parentNode
  bookshelf.removeChild(e.target.parentNode);

  if (myLibrary.length === 0) {
    return
  };

  // Update Local Storage
  let JSONlibrary = JSON.stringify(myLibrary);
  localStorage.setItem('library', JSONlibrary);

  // Restore Bookshelf On Page
  storedLibrary = JSON.parse(localStorage.getItem('library'))
};


// Event Listeners
addBookBtn.addEventListener("click", displayBookInputForm);
submitBookBtn.addEventListener('click', addBookToLibrary);
overlay.addEventListener('click', hideOverlay);

// Initial Page Functions/Actions
getAndDisplayLibraryFromStorage();






