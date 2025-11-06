import { BookType, ModelBookType, MongooseBookType } from './types.ts'

export default abstract class AbstractBookRepository {
  protected model: ModelBookType

  constructor(model: ModelBookType) {
    this.model = model
  }

  async getAll(): Promise<MongooseBookType[]> {
    return this.model.find()
  }

  async getById(id: string): Promise<MongooseBookType | null> {
    return this.model.findById(id)
  }

  async create(bookData: BookType): Promise<MongooseBookType> {
    const entity = new this.model(bookData)
    await entity.save()

    return entity
  }

  async update(id: string, updateData: BookType): Promise<MongooseBookType | null> {
    return this.model.findOneAndUpdate({ _id: id }, updateData)
  }

  async delete(id: string): Promise<MongooseBookType | null> {
    return this.model.findByIdAndDelete(id)
  }
}
