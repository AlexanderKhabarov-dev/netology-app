import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";

import Book from "./bookSchema.js";

const mockBook = {
  id: "uuidv4-1",
  title: "Тестовая книга",
  description: "Тестовое описание",
  authors: "John AbdyAliMali",
  favorite: true,
  fileCover: "C:/Users/User/Desktop/netology/netology-app/public/books/фыв.txt",
  fileName: "фыв.txt",
};

// Мок БД
let books = [mockBook];

class BookRepository {
  constructor() {
    this.books = books;
    this.__filename = fileURLToPath(import.meta.url);
    this.__dirname = path.dirname(this.__filename);
  }

  async getAll() {
    const books = await Book.find();

    return books ?? [];
  }

  async getById(id) {
    const book = await Book.findById(id);

    return book;
  }

  findIndexById(id) {
    return this.books.findIndex((b) => b.id === id);
  }

  async create(bookData) {
    const newBook = new Book({
      id: uuidv4(),
      title: bookData.title ?? "",
      description: bookData.description ?? "",
      authors: bookData.authors ?? "",
      favorite: bookData.favorite ?? null,
      fileCover: bookData.fileCover ?? "-",
      fileName: bookData.fileName ?? "",
    });

    await newBook.save();

    return newBook;
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

  async uploadFile(id, file) {
    if (!file) {
      return null
    }

    const book = await Book.findByIdAndUpdate(
      id,
      {
        fileName: file.filename,
        fileBook: file.path,
      },
      { new: true }
    )

    return book
  }

  async getFilePath(id) {
    const book = await this.getById(id)
    
    if (!book) {
      return null
    }

    return path.join(
      this.__dirname,
      "../public/books",
      book.fileName
    );
  }
}

export default new BookRepository();
