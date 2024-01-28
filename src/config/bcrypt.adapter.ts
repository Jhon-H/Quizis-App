import bcrypt from 'bcryptjs'

const saltRoudns = 10

export const Bcrypt = {
  encrypt: async (password: string): Promise<string> => {
    return bcrypt
      .hash(password, saltRoudns)
      .then((hash) => hash)
      .catch((err: string) => {
        throw new Error(err)
      })
  },
  compare: async (password: string, hash: string): Promise<boolean> => {
    return bcrypt
      .compare(password, hash)
      .then((result) => result)
      .catch((err: string) => {
        throw new Error(err)
      })
  }
}
