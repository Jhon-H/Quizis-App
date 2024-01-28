import mongoose, { Schema } from 'mongoose'

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: [true, 'Description is requierd']
  },
  answers: {
    type: [Schema.Types.ObjectId],
    ref: 'Answer',
    required: [true, 'Answers are required']
  },
  correctAnswerId: {
    type: Schema.Types.ObjectId,
    ref: 'Answer',
    required: [true, 'Correct answer is required'],
    validate: {
      validator: function (value: string) {
        return (this as any).answers.includes(value)
      },
      message: ({ value }: { value: string }) =>
        `${value} is not a valid answer. The answer must be one of the answers of the question`
    }
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  updatedAt: {
    type: Date,
    required: true
  }
})

export const QuestionModel = mongoose.model('Question', questionSchema)
