const modalButton = document.querySelector('.btn-cta');
const modalBG = document.querySelector('.modal-bg');
const modalClose = document.querySelector('.modal-close');
const unFinishBook = document.getElementById('unfinished-book');
const finishBook = document.querySelector('.finished-container');
const BOOKS_ITEMID = "itemId";


modalButton.addEventListener('click', () => {
    modalBG.classList.add('bg-active');
})
modalClose.addEventListener('click', (event) => {
    modalBG.classList.remove('bg-active');
})



const addBook = () => {
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const year = document.getElementById('book-year').value;
    const makeBookFunc = makeBook(title,author,year,false);

    const putBooks = putBook(title,author,year,false);
    makeBookFunc[BOOKS_ITEMID] = putBooks.id;
    userBook.push(putBooks);

    unFinishBook.append(makeBookFunc);
    updateDataToStorage();
}

const makeBook = (title,author,year,isComplete) => {

    const container = document.createElement('div');
    container.classList.add('container');
    const listBookContainer = document.createElement('div');
    listBookContainer.classList.add('listBookContainer');
    const showTitleBook = document.createElement('h3');
    showTitleBook.innerHTML = title ;
    const showAuthorBook = document.createElement('h5');
    showAuthorBook.innerHTML = author;
    const showYearBook = document.createElement('p');
    showYearBook.innerHTML = year;
    listBookContainer.append(showTitleBook,showAuthorBook,showYearBook);
    container.append(listBookContainer);

    if(isComplete) {
        container.append(createUndoButton(),DeleteButton());
    } else {
        container.append(createFinishButton(),DeleteButton());
    }

    return container;
}

const createButton = (buttonTypeClass, eventListener,isComplete) =>  {

    const button = document.createElement('button');
    button.classList.add(buttonTypeClass);
   
    button.addEventListener('click',(event,events) => {
       
        eventListener(event);
     
    });
    return button;
}

const addTaskToCompleted = (taskElement) => {
    const titleBook = taskElement.querySelector('.listBookContainer > h3').innerText;
    const authorBook = taskElement.querySelector('.listBookContainer > h5').innerText;
    const yearBook = taskElement.querySelector('.listBookContainer > p').innerText;
    const finishMakeBook = makeBook(titleBook,authorBook,yearBook,true);
    
    const book = findBook(taskElement[BOOKS_ITEMID]);
    book.isComplete = true;
    finishMakeBook[BOOKS_ITEMID] = book.id;
    finishBook.append(finishMakeBook);

    taskElement.remove();
    updateDataToStorage();
} 

const undoTaskFromCompleted = (taskElement) => {

    const taskTitle = taskElement.querySelector('.listBookContainer > h3').innerText;
    const taskAuthor = taskElement.querySelector('.listBookContainer > h5').innerText;
    const taskYear = taskElement.querySelector('.listBookContainer > p').innerText;
    const newBook = makeBook(taskTitle,taskAuthor,taskYear,false);

    const FindBook = findBook(taskElement[BOOKS_ITEMID]);
    FindBook.isComplete = false;
    newBook[BOOKS_ITEMID] = FindBook.id;
    unFinishBook.append(newBook);

    taskElement.remove();
    updateDataToStorage();

}

const deleteTask = (taskElement) => {
    const bookPosition = findTodoIndex(taskElement[BOOKS_ITEMID]);
    userBook.splice(bookPosition,1);

    taskElement.remove();
    updateDataToStorage();
}

const createFinishButton = () => {
    return createButton('btnSelesai', (event) =>{
        addTaskToCompleted(event.target.parentElement);
    });
}

const createUndoButton = () => {
    return createButton('btnUndo', (event) => {
        undoTaskFromCompleted(event.target.parentElement);
    });
}

const DeleteButton = () => {
    return createButton('btnHapus', (event) => {
        deleteTask(event.target.parentElement);
    })
}