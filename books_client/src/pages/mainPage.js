import { handleDownloadBook } from '../api/books/index.js'

export const mainPage = () => {
  const downloadButtons = document.querySelectorAll('.download-book')
  if (downloadButtons.length) {
    downloadButtons.forEach(button => {
      const fileId = button.dataset.id
      const fileName = button.dataset.fileName

      button.addEventListener('click', () => handleDownloadBook(fileId, fileName))
    })
  }
}
