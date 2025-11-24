import { Document, PassportLocalModel } from 'mongoose'

export type CommentType = {
  userId: string
  bookId: string
  userName: string
  createdAt?: Date
  editedAt?: Date
  text: string
}

export type MongooseCommentType = CommentType & Document
export type ModelCommentType = PassportLocalModel<MongooseCommentType>

export type CreateCommentType = Omit<CommentType, 'createdAt' | 'editedAt'>
export type CommentsPermission = {
  canDelete: boolean
}
