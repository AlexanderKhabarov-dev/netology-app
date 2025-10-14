import { handleDownloadBook } from "../api/books/index.js"

const downloadButtons = document.querySelectorAll('.download-book')

downloadButtons.forEach(button => {
  const bookId = button.dataset.id
  const fileName = button.dataset.fileName

  button.addEventListener('click', () => handleDownloadBook(bookId, fileName))
})