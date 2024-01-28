import jwt from 'jsonwebtoken'
import { envs } from './envs.adapter'

const JWT_TOKEN = envs.JWT_TOKEN

export const Jwt = {
  create: async (
    payload: Record<string, unknown>,
    duration: string = '1h'
  ): Promise<string | null> => {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_TOKEN, { expiresIn: duration }, (err, token) => {
        if (err) {
          resolve(null)
          return
        }

        resolve(token as string)
      })
    })
  },
  validate: async <T>(token: string): Promise<T | null> => {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_TOKEN, (err, decoded) => {
        if (err) {
          resolve(null)
          return
        }

        resolve(decoded as T)
      })
    })
  }
}
