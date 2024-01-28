import { Router } from 'express'
import { QuestionsRouter } from './questions/routes'
import { AuthRouter } from './auth/routes'
import { AnswersRouter } from './answers/routes'

export class AppRouter {
  static get routes(): Router {
    const router = Router()

    router.use('/api/auth', AuthRouter.routes)
    router.use('/api/questions', QuestionsRouter.routes)
    router.use('/api/answers', AnswersRouter.routes)

    return router
  }
}
