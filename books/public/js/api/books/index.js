import { getFile, request } from '../index.js'

export const createBook = async (body) => {
  try {
    const data = await request({ 
      method: 'POST', 
      body, 
      url: `/api/books/create`
    })

    console.log(body)

    return data
  } catch(e) {
    alert(e)
  }
}

export const handleDownloadBook = async (bookId, fileName) => {
  const blob = await getFile(`/api/books/${bookId}/download`)
  const blobUrl = URL.createObjectURL(blob)

  const link = document.createElement('a')

  link.href = blobUrl
  link.download = fileName
  link.click()
  URL.revokeObjectURL(blobUrl)
}