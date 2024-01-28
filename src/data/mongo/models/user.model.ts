import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
})

export const UserModel = mongoose.model('User', userSchema)
