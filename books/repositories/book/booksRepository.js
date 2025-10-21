import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { fileURLToPath } from 'url'

import Book from './bookSchema.js'

class BookRepository {
  async getAll() {
    const books = await Book.find()

    return books ?? []
  }

  async getById(id) {
    const book = await Book.findById(id)

    return book
  }

  async create(bookData) {
    const newBook = new Book({
      id: uuidv4(),
      fileId: bookData.fileId,
      title: bookData.title ?? "",
      description: bookData.description ?? "",
      authors: bookData.authors ?? "",
      favorite: bookData.favorite ?? null,
      fileCover: bookData.fileCover ?? "-",
      fileName: bookData.fileName ?? "",
    })

    await newBook.save()

    return newBook
  }

  async update(id, updateData) {
   const book = await Book.findByIdAndUpdate(
      id,
      {
        title: updateData.title,
        description: updateData.description,
        authors: updateData.authors,
        favorite: !!updateData.favorite,
        fileCover: updateData.fileCover,
        fileName: updateData.fileName,
      },
      { new: true }
    )

    return book
  }

  async delete(id) {
    const deletedBook = await Book.findByIdAndDelete(id)

    return deletedBook
  }

 
}

export default new BookRepository()
