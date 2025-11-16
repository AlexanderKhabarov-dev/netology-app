import { Model } from 'mongoose'
import { BookType, ModelBookType, MongooseBookType } from './types.ts'

export default abstract class IBooksRepository {
  private bookModel: Model<MongooseBookType>

  constructor(model: ModelBookType) {
    this.bookModel = model
  }

  async getAll(): Promise<MongooseBookType[]> {
    return this.bookModel.find()
  }

  async getById(id: string): Promise<MongooseBookType | null> {
    return this.bookModel.findById(id)
  }

  async create(bookData: BookType): Promise<MongooseBookType> {
    const entity = new this.bookModel(bookData)
    await entity.save()

    return entity
  }

  async update(id: string, updateData: BookType): Promise<MongooseBookType | null> {
    return this.bookModel.findOneAndUpdate({ _id: id }, updateData)
  }

  async delete(id: string): Promise<MongooseBookType | null> {
    return this.bookModel.findByIdAndDelete(id)
  }
}
