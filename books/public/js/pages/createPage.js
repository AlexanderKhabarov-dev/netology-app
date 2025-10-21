import { createBook } from '../api/books/index.js'
import { uploadFile } from '../api/index.js'
import { getJsonFromFormData } from '../utils/getJsonFromFormData.js'
 
const form = document.querySelector('#create-form')
const submitButton = document.querySelector('#submit-form')

const handleCreateBook = async (e) => {
  e.preventDefault()

  try {
    const file = document.querySelector('#file').files[0]
    const fileData = await uploadFile({ file })
    console.log(JSON.stringify(fileData))
    const { fileName, id } = fileData

    const formResult = getJsonFromFormData(form)

    const { redirectUrl } = await createBook({ ...formResult, fileName, fileId: id })

    if (redirectUrl) {
      window.location.href = redirectUrl
    }
  } catch(e) {
    console.error(e)
  }
}

submitButton.addEventListener('click', handleCreateBook)