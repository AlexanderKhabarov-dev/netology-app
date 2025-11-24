import { v4 as uuidv4 } from 'uuid'
import { inject, injectable } from 'inversify'

import { BookType, MongooseBookType } from './types.ts'
import { IBooksRepository } from './IBooksRepository.ts'
import { Model } from 'mongoose'

@injectable()
class BooksRepository implements IBooksRepository {
  private bookModel: Model<MongooseBookType>

  constructor(@inject('BookModel') bookModel: Model<MongooseBookType>) {
    this.bookModel = bookModel
  }

  async getAll(): Promise<MongooseBookType[]> {
    const books = await this.bookModel.find()
    return books ?? []
  }

  async getById(id: string): Promise<MongooseBookType | null> {
    const book = await this.bookModel.findById(id)
    return book
  }

  async create(bookData: BookType): Promise<MongooseBookType> {
    const newBook = new this.bookModel({
      id: uuidv4(),
      fileId: bookData.fileId,
      title: bookData.title ?? '',
      description: bookData.description ?? '',
      authors: bookData.authors ?? '',
      favorite: bookData.favorite ?? false,
      fileCover: bookData.fileCover ?? '-',
      fileName: bookData.fileName ?? '',
    })

    await newBook.save()

    return newBook
  }

  async update(id: string, updateData: BookType): Promise<MongooseBookType | null> {
    const book = await this.bookModel.findByIdAndUpdate(id, updateData, { new: true }).exec()
    return book
  }

  async delete(id: string): Promise<MongooseBookType | null> {
    const deletedBook = await this.bookModel.findByIdAndDelete(id).exec()
    return deletedBook
  }
}

export default BooksRepository
