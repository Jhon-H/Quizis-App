import { type Request, type Response } from 'express'

export class QuestionsController {
  get = (req: Request, res: Response) => {
    res.status(201).json({ message: 'Question created' })
  }

  create = (req: Request, res: Response) => {
    res.status(201).json({ message: 'Question created' })
  }

  update = (req: Request, res: Response) => {
    res.status(201).json({ message: 'Question updated' })
  }

  validate = (req: Request, res: Response) => {
    res.status(201).json({ message: 'Question validated' })
  }

  validateMultiple = (req: Request, res: Response) => {
    res.status(201).json({ message: 'Questions validated' })
  }
}
