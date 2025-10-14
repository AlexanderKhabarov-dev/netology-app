import { request } from '../index.js'

export const incrementBookView = async (bookId) => {
  try {
    const data = await request({ 
      method: 'POST', 
      url: `/counter/${bookId}/incr`
    })

    return data
  } catch(e) {
    alert(e)
  }
}