import { Document, PassportLocalModel } from 'mongoose'

export type BookType = {
  fileId?: string
  title?: string
  description?: string
  authors?: string
  favorite?: boolean
  fileCover?: string
  fileName?: string
}

export type MongooseBookType = BookType & Document
export type ModelBookType = PassportLocalModel<MongooseBookType>
