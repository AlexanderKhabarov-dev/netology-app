import { io } from 'socket.io-client'
import { incrementBookView } from '../api/counter/index.js'

export const viewPage = () => {
  const commentsContainer = document.querySelector('#comments')
  const commentsList = document.querySelector('#commentsList')

  if (commentsContainer) {
    const socket = io()

    // #region Счётчик просмотров
    const pathParts = window.location.pathname.split('/')
    const bookId = pathParts[pathParts.length - 1]

    incrementBookView(bookId)

    // #region Удаление комментария
    const handleRemoveComment = ({ deletedCommentId }) => {
      console.log({ deletedCommentId })
      const comment = commentsContainer.querySelector(`.comment[data-id="${deletedCommentId}"]`)
      comment.remove()
    }

    commentsContainer.addEventListener('click', async e => {
      const { type, id } = e.target.dataset
      if (type === 'delete') {
        e.preventDefault()

        socket.emit('deleteComment', { commentId: id }, data => {
          handleRemoveComment(data)
          console.log(data)
        })
      }
    })

    socket.on('deletedComment', handleRemoveComment)

    // #region Добавление комментария
    const submitCommentButton = document.querySelector('#submitComment')
    const inputText = document.querySelector('#commentText')

    const handleInsertHtml = html => {
      commentsList.insertAdjacentHTML('afterbegin', html)
      inputText.value = ''
    }

    const handleAddComment = async e => {
      e.preventDefault()
      const bookId = document.querySelector('#commentForm').dataset.bookid

      socket.emit('createComment', { bookId, text: inputText.value }, ({ html }) =>
        handleInsertHtml(html)
      )
    }

    submitCommentButton.addEventListener('click', handleAddComment)
    socket.on('error', ({ errorMessage }) => alert(errorMessage))
    socket.on('newComment', handleInsertHtml)
  }
}
