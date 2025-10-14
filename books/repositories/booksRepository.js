import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { fileURLToPath } from 'url'

const mockBook = {
  id: 'uuidv4-1',
  title: 'Тестовая книга',
  description: 'Тестовое описание',
  authors: 'John AbdyAliMali',
  favorite: true,
  fileCover: 'C:/Users/User/Desktop/netology/netology-app/public/books/фыв.txt',
  fileName: 'фыв.txt'
}

// Мок БД
let books = [mockBook]

class BookRepository {
  constructor() {
    this.books = books
    this.__filename = fileURLToPath(import.meta.url)
    this.__dirname = path.dirname(this.__filename)
  }

  getAll() {
    return this.books
  }

  getById(id) {
    return this.books.find(b => b.id === id) || null
  }

  findIndexById(id) {
   return this.books.findIndex(b => b.id === id)
  }

  create(bookData) {
    const newBook = {
      id: uuidv4(),
      title: bookData.title ?? '',
      description: bookData.description ?? '',
      authors: bookData.authors ?? '',
      favorite: bookData.favorite ?? null,
      fileCover: bookData.fileCover ?? '-',
      fileName: bookData.fileName ?? ''
    }

    this.books.push(newBook)

    return newBook
  }

  update(id, updateData) {
    const index = this.findIndexById(id)

    if (index === -1) {
      return null
    }

    this.books[index] = {
      ...this.books[index],
      title: updateData.title ?? this.books[index].title,
      description: updateData.description ?? this.books[index].description,
      authors: updateData.authors ?? this.books[index].authors,
      favorite: !!updateData.favorite,
      fileCover: updateData.fileCover ?? this.books[index].fileCover,
      fileName: updateData.fileName ?? this.books[index].fileName
    }

    return this.books[index]
  }

  delete(id) {
    const index = this.findIndexById(id)

    if (index === -1) {
      return false
    }

    this.books.splice(index, 1)
    return true
  }

  uploadFile(id, file) {
    const index = this.findIndexById(id)

    if (index === -1) {
      return null
    }

    if (!file) {
      return null
    }

    this.books[index] = {
      ...this.books[index],
      fileName: file.filename,
      fileBook: file.path
    }

    return this.books[index]
  }

  getFilePath(id) {
    const index = this.findIndexById(id)

    if (index === -1) {
      return null
    }

    return path.join(this.__dirname, '../public/books', this.books[index].fileName)
  }
}

export default new BookRepository()
