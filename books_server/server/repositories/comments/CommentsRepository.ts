import { inject, injectable } from 'inversify'
import { CreateCommentType, MongooseCommentType } from './types.ts'
import { Model } from 'mongoose'

@injectable()
class CommentsRepository {
  private commentModel: Model<MongooseCommentType>

  constructor(@inject('CommentModel') commentModel: Model<MongooseCommentType>) {
    this.commentModel = commentModel
  }

  async createComment({ userId, text, bookId, userName }: CreateCommentType) {
    const newComment = new this.commentModel({
      userId,
      bookId,
      text,
      userName,
    })

    await newComment.save()

    return newComment
  }

  async getAllCommentsFromBookId(bookId: string) {
    const comments = await this.commentModel.find({ bookId }).sort({ createdAt: -1 }).lean()

    return comments
  }

  async getCommentFromId(bookId: string) {
    const comment = await this.commentModel.findById(bookId)

    return comment
  }

  async deleteComment(commentId: string) {
    const deletedComment = await this.commentModel.deleteOne({ _id: commentId })

    return deletedComment
  }

  async getCommentsPermissionFromUserId({
    userId,
    commentId,
  }: {
    userId: string
    commentId: string
  }) {
    const comment = await this.getCommentFromId(commentId)
    const canDelete = comment.userId.toString() === userId.toString()

    return { canDelete }
  }
}

export default CommentsRepository
