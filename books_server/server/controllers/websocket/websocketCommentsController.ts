import ejs from 'ejs'
import path from 'path'
import { fileURLToPath } from 'url'

import { container } from '../../container.ts'
import UserRepository from '../../repositories/user/UserRepository.ts'
import CommentsRepository from '../../repositories/comments/CommentsRepository.ts'
import { CommentType } from '../../repositories/comments/types.ts'
import { CreateCommentPayloadType, DeleteCommentType } from '../../websockets/types.ts'
import { CommentSocketFn, RenderCommentType } from './types.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const userRepository = container.get(UserRepository)
const commentsRepository = container.get(CommentsRepository)

const renderCommentPartial = (comment: RenderCommentType) => {
  const templatePath = path.resolve(__dirname, '../../views/components/comment.ejs')
  return ejs.renderFile(templatePath, { comment })
}

export const createCommentSocket: CommentSocketFn<CreateCommentPayloadType> = async (
  data,
  socket,
  callback
) => {
  const { user, body } = data

  const userFull = await userRepository.getUserFromUserName(user.username)
  const newComment: CommentType = {
    userId: userFull._id.toString(),
    userName: userFull.username,
    bookId: body.bookId,
    text: body.text,
  }

  const createdComment = await commentsRepository.createComment(newComment)

  const commentData = {
    userName: createdComment.userName,
    canDelete: true,
    createdAt: new Date(createdComment.createdAt),
    text: createdComment.text,
    _id: createdComment._id,
    userId: userFull._id.toString(),
    bookId: body.bookId,
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

export const deleteCommentSocket: CommentSocketFn<DeleteCommentType> = async (
  data,
  socket,
  callback
) => {
  const { body, user } = data
  const userFull = await userRepository.getUserFromUserName(user.username)

  const { canDelete } = await commentsRepository.getCommentsPermissionFromUserId({
    commentId: body.commentId,
    userId: userFull._id.toString(),
  })

  if (!canDelete) {
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
