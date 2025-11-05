import mongoose from 'mongoose'

// При желании добавить другие метаданные
const fileSchema = new mongoose.Schema({
  fileName: { type: String },       
  filePath: { type: String},                     
  date: { type: String }                      
})

const File = mongoose.model('File', fileSchema)

export default File