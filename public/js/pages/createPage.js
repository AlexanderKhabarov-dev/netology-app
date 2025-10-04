import { createBook } from '../api/books/index.js'
import { getJsonFromFormData } from '../utils/getJsonFromFormData.js'
 
const form = document.querySelector('#create-form')
const submitButton = document.querySelector('#submit-form')

const updateBook = async (e) => {
  e.preventDefault()

  const result = getJsonFromFormData(form)
  const data = await createBook(result)

  if (data.redirectUrl) {
    window.location.href = data.redirectUrl
  }
}

submitButton.addEventListener('click', updateBook)