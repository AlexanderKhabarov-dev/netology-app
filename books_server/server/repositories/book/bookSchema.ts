import mongoose, { Types } from 'mongoose'
import { MongooseBookType } from './types.ts'

const bookSchema = new mongoose.Schema<MongooseBookType>({
  _id: Types.ObjectId,
  fileId: { type: String },
  title: { type: String },
  description: { type: String },
  authors: { type: String },
  favorite: { type: Boolean, default: false },
  fileCover: { type: String },
  fileName: { type: String },
})

const Book = mongoose.model('Book', bookSchema)

export default Book
