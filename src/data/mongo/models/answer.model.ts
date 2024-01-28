import mongoose from 'mongoose'

const answerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: [true, 'Title is required']
  }
})

export const AnswerModel = mongoose.model('Answer', answerSchema)
