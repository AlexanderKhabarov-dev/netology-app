import CommentModel from './commentsSchema.js'

class CommentRepository {
  async createComment({ userId, text, bookId, userName }) {
    const newComment = new Comment({
      userId,
      bookId,
      text,
      userName,
    })

    await newComment.save()

    return newComment
  }

  async getAllCommentsFromBookId(bookId) {
    const comments = await CommentModel.find({ bookId }).sort({ createdAt: -1 }).lean()

    return comments
  }

  async getCommentFromId(bookId) {
    const comment = await CommentModel.findById(bookId)

    return comment
  }

  async deleteComment(commentId) {
    const deletedComment = await CommentModel.deleteOne({ _id: commentId })

    return deletedComment
  }

  async getCommentsPermissionFromUserId({ userId, commentId }) {
    const comment = await this.getCommentFromId(commentId)
    const canDelete = comment.userId.toString() === userId.toString()

    return { canDelete }
  }
}

export default new CommentRepository()
