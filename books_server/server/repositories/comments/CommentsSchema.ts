import mongoose from 'mongoose'
import { MongooseCommentType } from './types.ts'

const commentSchema = new mongoose.Schema<MongooseCommentType>({
  userId: { type: String, required: true },
  bookId: { type: String, required: true },
  userName: { type: String },
  createdAt: { type: Date, default: Date.now },
  editedAt: { type: Date },
  text: { type: String, required: true },
})

const CommentModel = mongoose.model('Comment', commentSchema)

export default CommentModel
