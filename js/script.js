document.addEventListener('DOMContentLoaded', () => {
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', (event) => {
        modalBG.classList.remove('bg-active');
       
        addBook();
        event.preventDefault();
    });

    if(checkStorage()) {
        loadDataFromStorage();
    }

});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan");
    totalBooks();
})

document.addEventListener("ondataloaded", () => {
    refreshDataFromUserBook();
    totalBooks();
});