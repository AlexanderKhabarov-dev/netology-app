import { v4 as uuidv4 } from 'uuid'
import AbstractBookRepository from './abstractBookRepository.ts'
import Book from './bookSchema.ts'
import { BookType, MongooseBookType } from './types.ts'

class BookRepository extends AbstractBookRepository {
  constructor() {
    super(Book)
  }

  async getAll(): Promise<MongooseBookType[]> {
    const books = await Book.find()
    return books ?? []
  }

  async getById(id: string): Promise<MongooseBookType | null> {
    const book = await Book.findById(id)
    return book
  }

  async create(bookData: BookType): Promise<MongooseBookType> {
    const newBook = new Book({
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
    const book = await Book.findByIdAndUpdate(id, updateData, { new: true }).exec()
    return book
  }

  async delete(id: string): Promise<MongooseBookType | null> {
    const deletedBook = await Book.findByIdAndDelete(id).exec()
    return deletedBook
  }
}

export default new BookRepository()
