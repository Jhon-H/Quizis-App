import { type NextFunction, type Request, type Response } from 'express'
import { envs } from '../../config/envs.adapter'

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
    next()
  }
}
