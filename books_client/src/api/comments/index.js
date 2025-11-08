import { request } from '../index.js'

export const deleteComment = async (commentId) => {
  try {
    const data = await request({ 
      method: 'DELETE', 
      url: `/api/comments/delete/${commentId}`
    })

    return data
  } catch(e) {
    alert(e)
  }
}

export const createComment = async ({ bookId, text }) => {
  try {
    const data = await request({ 
      method: 'POST', 
      body: { bookId, text },
      url: '/api/comments/create',
      isHtml: true,
    })

    return data
  } catch(e) {
    alert(e)
  }
}