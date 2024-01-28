import { type Request, type Response } from 'express'
import { UserModel } from '../../data/mongo/models/user.model'
import { Bcrypt } from '../../config/bcrypt.adapter'
import { Jwt } from '../../config/jwt.adapter'

export class AuthController {
  login = async (req: Request, res: Response) => {
    const { email, password } = req.body as { email: string; password: string } // TODO: create DTO

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' })
    }

    if (!email.includes('@')) {
      return res.status(400).json({ message: 'Email is not valid' })
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters' })
    }

    try {
      const existUser = await UserModel.findOne({ email })
      const isCorrectPassword = await Bcrypt.compare(
        password,
        existUser?.password ?? ''
      )

      if (!existUser || !isCorrectPassword) {
        return res
          .status(400)
          .json({ message: 'User or Password are incorrect' })
      }

      const token = await Jwt.create({
        id: existUser.id,
        name: existUser.name
      })

      if (!token) {
        return res
          .status(500)
          .json({ message: 'An error has ocurred creating token' })
      }

      res.json({
        status: 'OK',
        data: {
          token,
          user: {
            name: existUser.name
          }
        }
      })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  register = async (req: Request, res: Response) => {
    const { name, email, password, confirmPassword } = req.body as {
      name: string
      email: string
      password: string
      confirmPassword: string
    } // TODO: create DTO

    if (!name || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ message: 'Name, email and password are required' })
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: 'Password and confirm password must be equal' })
    }

    if (!email.includes('@')) {
      return res.status(400).json({ message: 'Email is not valid' })
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters' })
    }

    try {
      const existUser = await UserModel.findOne({ email })
      if (existUser) {
        return res.status(400).json({ message: 'Email already exists' })
      }

      const encryptedPassword = await Bcrypt.encrypt(password)

      const newUser = await UserModel.create({
        name,
        email,
        password: encryptedPassword
      })

      res.status(201).json({
        status: 'OK',
        data: {
          user: {
            id: newUser.id,
            name
          }
        }
      })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
