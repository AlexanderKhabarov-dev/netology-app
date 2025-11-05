import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  bookId: { type: String, required: true },
  userName: { type: String },
  createdAt: { type: Date, default: Date.now },
  editedAt: { type: Date },
  text: { type: String, required: true }
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment