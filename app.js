//Book constructor
function Book(title,author,isbn)
{
  
  this.title=title;
  this.author=author;
  this.isbn=isbn;
}

//UI constructor
function UI()
{

}
//add book to list through UI prototype
UI.prototype.addBookToList=function(book)
{
  const list=document.getElementById('book-list');
  const row=document.createElement('tr');
  row.innerHTML=
  `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a htrf='#' class="delete">X</a></td>  
  `;
  list.appendChild(row);
  
}

UI.prototype.showAlert=function(message,className)
{
  //create a new div to show error in it
  const div= document.createElement('div');

  //set class name of this div as alert and error
  div.className=`alert ${className}`;

  //select container
  const container=document.querySelector('.container');

  //select form
  const form=document.getElementById('book-list-form');

  //write message in div 
  div.appendChild(document.createTextNode(message));

  //insert div in container before form
  container.insertBefore(div,form);

  //remove div after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').remove();
  },3000);
  
}

//clear fields
UI.prototype.clearFields=function(){
  document.getElementById('title').value='';
  document.getElementById('author').value='';
  document.getElementById('isbn').value='';
}

//prototype of UI to delete a book
UI.prototype.deleteBook=function(target){
  if(target.className==='delete')
  {
    target.parentElement.parentElement.remove();
  }
}

//constructor of store class
function Store()
{

}

//get all books from LS
Store.prototype.getBooks=function()
{
  let books;
  if(localStorage.getItem('books')===null)
  {
    books=[];
  }
  else
  {
    books=JSON.parse(localStorage.getItem('books'));
  }
  return books;
}

//add a book to ls
Store.prototype.addBookToLocalStorage=function(book)
{
  const books=this.getBooks();
  // let books;
  // if(localStorage.getItem('books')===null)
  // {
  //   books=[];
  // }
  // else
  // {
  //   books=JSON.parse(localStorage.getItem('books'));
  // }
  books.push(book);
  //add to ls
  localStorage.setItem('books',JSON.stringify(books));
}

//display books from ls
Store.prototype.displayBooks=function()
{
  const store=new Store()
  const books=store.getBooks();
  // let books;
  // if(localStorage.getItem('books')===null)
  // {
  //   books=[];
  // }
  // else
  // {
  //   books=JSON.parse(localStorage.getItem('books'));
  // }
  const ui=new UI();
  books.forEach(function(book){
    const ui=new UI();
    ui.addBookToList(book);
  });
}

// delete book from ls
 Store.prototype.removeBook=function(isbn)
 {
   const books= this.getBooks();
  //  let books;
  //  if(localStorage.getItem('books')===null)
  //  {
  //    books=[];
  //  }
  //  else
  //  {
  //    books=JSON.parse(localStorage.getItem('books'));
  //  }
   books.forEach(function(book,index){
     if(book.isbn===isbn)
     {
       books.splice(index,1);
     }
   });
   //store to ls new books after removing deleted book
   localStorage.setItem('books',JSON.stringify(books));
 }

//Event Listener for submit button
document.getElementById('book-list-form').addEventListener('submit',function(e){
  //get value of all input fields
  const title=document.getElementById('title').value,
        author=document.getElementById('author').value,
        isbn=document.getElementById('isbn').value;
  //instantiate Book object
  const book=new Book(title,author,isbn);

  //instantiate UI object
  ui=new UI();

  //validate
  if(title===''||author===''||isbn==='')
  {
    ui.showAlert('Please input valid details!','error');
  }
  else
  {
    //add book to list through UI proto
    ui.addBookToList(book);

    //store book to LS
    const store=new Store();
    store.addBookToLocalStorage(book);

    //clear fields through UI 
    ui.clearFields();

    //show alert of success
    ui.showAlert('Book added!','success');
  }
  
  e.preventDefault();
});

//Event listener for delete link
//here we must use event delegation because 
//this link is created dynamically 
document.getElementById('book-list').addEventListener('click',function(e){
  //instantiate ui
  const ui=new UI();

  //delete book through ui
  ui.deleteBook(e.target);
  
    //remove book from LS also
    const store=new Store();
    store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //show alert
  ui.showAlert('Book Deleted!','success');
  e.preventDefault();
});
const store=new Store();
document.addEventListener('DOMContentLoaded',store.displayBooks);