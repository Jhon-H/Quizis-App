import { Router } from 'express'
import { QuestionsRouter } from './questions/routes'
import { AuthRouter } from './auth/routes'

export class AppRouter {
  static get routes(): Router {
    const router = Router()

    router.use('/api/auth', AuthRouter.routes)
    router.use('/api/questions', QuestionsRouter.routes)

    return router
  }
}
