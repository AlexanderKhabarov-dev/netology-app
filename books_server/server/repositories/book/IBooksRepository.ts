import { BookType, MongooseBookType } from './types.ts'

export interface IBooksRepository {
  getAll(): Promise<MongooseBookType[]>
  getById(id: string): Promise<MongooseBookType | null>
  create(bookData: BookType): Promise<MongooseBookType>
  update(id: string, updateData: BookType): Promise<MongooseBookType | null>
  delete(id: string): Promise<MongooseBookType | null>
}
