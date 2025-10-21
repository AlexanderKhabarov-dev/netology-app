import { getFile, request } from '../index.js'

export const createBook = async (body) => {
  try {
    const data = await request({ 
      method: 'POST', 
      body, 
      url: `/api/books/create`
    })

    return data
  } catch(e) {
    alert(e)
  }
}

export const handleDownloadBook = async (fileId, fileName) => {
  if (fileId) {
    const blob = await getFile(`/api/file/${fileId}/download`)
    const blobUrl = URL.createObjectURL(blob)

    const link = document.createElement('a')

    link.href = blobUrl
    link.download = fileName
    link.click()
    URL.revokeObjectURL(blobUrl)
  } else {
    alert('Не удалось скачать файл')
  }
}