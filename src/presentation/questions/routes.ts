import { Router } from 'express'
import { QuestionsController } from './controller'
import { AuthMiddleware } from '../middleware/auth.middleware'

export class QuestionsRouter {
  static get routes(): Router {
    const router = Router()
    const controller = new QuestionsController()

    router.get('/', controller.get)
    router.post('/', AuthMiddleware.validateJWT, controller.create)
    // router.put('/:questionId', AuthMiddleware.validateJWT, controller.update)
    router.post('/validate', controller.validate)

    return router
  }
}
