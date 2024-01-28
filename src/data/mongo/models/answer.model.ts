import mongoose from 'mongoose'

const answerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  }
})

answerSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id
  }
})

export const AnswerModel = mongoose.model('Answer', answerSchema)
