import { type NextFunction, type Request, type Response } from 'express'
import { envs } from '../../config/envs.adapter'
import { Jwt } from '../../config/jwt.adapter'
import { UserModel } from '../../data/mongo/models/user.model'

export class AuthMiddleware {
  static validateAdminToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const adminToken = req.headers['x-admin-token']

    if (!adminToken) {
      return res.status(401).json({ message: 'Unauthorized for created users' })
    }

    if (adminToken !== envs.ADMIN_TOKEN) {
      return res.status(401).json({ message: 'Unauthorized for created users' })
    }

    next()
  }

  static validateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const authHeader = req.headers.authorization!

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const userToken = await Jwt.validate<{ id: string }>(token)
    if (!userToken) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const user = await UserModel.findOne({
      _id: userToken?.id ?? ''
    })

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    req.body._user = user

    next()
  }
}
