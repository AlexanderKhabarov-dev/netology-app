import { request } from '../api/index.js'
import { getJsonFromFormData } from '../utils/getJsonFromFormData.js'

export const editPage = () => {
  const form = document.querySelector('#edit-form')

  if (form) {
    const submitButton = document.querySelector('#update-submit-form')
    const bookId = form.dataset.bookId

    const updateBook = async e => {
      e.preventDefault()

      const result = getJsonFromFormData(form)

      const data = await request({
        method: 'PUT',
        body: result,
        url: `/api/books/update/${bookId}`,
      })

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl
      }
    }

    submitButton.addEventListener('click', updateBook)
  }
}
