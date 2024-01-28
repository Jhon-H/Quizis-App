import { Router } from 'express'
import { AnswersController } from './controller'
import { AuthMiddleware } from '../middleware/auth.middleware'

export class AnswersRouter {
  static get routes(): Router {
    const router = Router()
    const controller = new AnswersController()

    // router.get('/', controller.get)
    router.post('/', AuthMiddleware.validateJWT, controller.create)

    return router
  }
}
