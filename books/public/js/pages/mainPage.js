import { handleDownloadBook } from "../api/books/index.js"

const downloadButtons = document.querySelectorAll('.download-book')

downloadButtons.forEach(button => {
  const fileId = button.dataset.id
  const fileName = button.dataset.fileName

  button.addEventListener('click', () => handleDownloadBook(fileId, fileName))
})