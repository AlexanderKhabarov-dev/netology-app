import ejs from 'ejs'
import path from 'path'
import userRepository from '../../repositories/user/userRepository.js';
import commentsRepository from '../../repositories/comments/commentsRepository.js';

async function renderCommentPartial(comment) {
  const templatePath = path.resolve('views/components/comment.ejs')
  return ejs.renderFile(templatePath, { comment })
}

export const createCommentSocket = async (data, socket, callback) => {
  const { user, body } = data;

  const userFull = await userRepository.getUserFromUserName(user.username)
  const newComment = {
    userId: userFull._id,
    userName: userFull.username,
    bookId: body.bookId,
    text: body.text
  };

  const createdComment = await commentsRepository.createComment(newComment)

  const commentData = {
    userName: createdComment.userName,
    canDelete: true,
    createdAt: new Date(createdComment.createdAt),
    text: createdComment.text,
    _id: createdComment._id,
  }

  const commentForCurrentUserHtml = await renderCommentPartial(commentData)

  callback({
    success: true,
    html: commentForCurrentUserHtml,
    comment: commentData,
  })

  const commentForOtherUsersHtml = await renderCommentPartial({ ...commentData, canDelete: false })
  socket.broadcast.emit('newComment', commentForOtherUsersHtml)
}

export const deleteCommentSocket = async (data, socket, callback) => {
  const { body, user } = data
  const userFull = await userRepository.getUserFromUserName(user.username)

  const { canDelete } = await commentsRepository.getCommentsPermissionFromUserId({ 
    commentId: body.commentId, 
    userId: userFull._id
  })

  if (canDelete) {
    socket.emit('error', { errorMessage: 'Нельзя удалить комментарий' })
    return
  }

  const deletedComment = await commentsRepository.deleteComment(body.commentId)

  if (!deletedComment) {
    socket.emit('error', { errorMessage: 'Комментарий не удалён' })
    return
  }

  const response = {
    success: true,
    deletedCommentId: body.commentId,
  }

  callback(response)
  socket.broadcast.emit('deletedComment', response)
}