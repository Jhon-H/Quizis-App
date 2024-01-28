import { Router } from 'express'
import { AuthMiddleware } from '../middleware/auth.middleware'
import { AuthController } from './controller'

export class AuthRouter {
  static get routes(): Router {
    const controller = new AuthController()
    const router = Router()

    router.get('/login', controller.login)

    router.post(
      '/register',
      AuthMiddleware.validateAdminToken,
      controller.register
    )

    return router
  }
}
