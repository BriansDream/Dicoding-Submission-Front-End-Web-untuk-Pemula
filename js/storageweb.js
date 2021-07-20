const KEY_BOOK = "KEY_BOOK";
let userBook = [];


const checkStorage = () => {
    if(typeof(Storage)) {
        return true;
    }
  return false;
}

const saveData = () => {
    const parsed = JSON.stringify(userBook);
    localStorage.setItem(KEY_BOOK,parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

const loadDataFromStorage = () => {
    const serializedData = localStorage.getItem(KEY_BOOK);
    let data = JSON.parse(serializedData);
    if(data !== null) {
        userBook = data;
    }

    document.dispatchEvent(new Event("ondataloaded"));
}

const updateDataToStorage = () => {
    if(checkStorage()) 
        saveData();
}


const putBook = (title,author,year,isComplete) => {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isComplete,
    };

}

const findBook = (BookID) => {
    for(userBooks of userBook) {
        if(userBooks.id === BookID) 
            return userBooks;
        }
        return null;
}

const findTodoIndex = (BookID) => {
    let index = 0;
    for(userBooks of userBook) {
        if(userBooks.id === BookID) 
            return index;
        
        index++;
    }
    return -1;
}

const refreshDataFromUserBook = () => {
    const listUncompleted = document.getElementById('unfinished-book');
    let listCompleted = document.querySelector('.finished-book');
    for(userBooks of userBook) {
        const newBooks = makeBook(userBooks.title,userBooks.author,userBooks.year, userBooks.isComplete);
        newBooks[BOOKS_ITEMID] = userBooks.id;

        if(userBooks.isComplete) {
            listCompleted.append(newBooks);
        } else {
            listUncompleted.append(newBooks);
        }
    }
}

const totalBooks = () => {
    const totalbuku = document.querySelector('.total-books');
    totalbuku.innerHTML = "💻 Total Buku : "+userBook.length;
}