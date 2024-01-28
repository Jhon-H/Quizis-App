import { type Request, type Response } from 'express'
import { AnswerModel } from '../../data/mongo/models/answer.model'

export class AnswersController {
  create = async (req: Request, res: Response) => {
    const answers = req.body as Array<{ title: string, description: string }>

    if (!answers || answers.length === 0) {
      return res.status(400).json({ message: 'Invalid body' })
    }
    try {
      answers.forEach((answer) => {
        if (!answer.title || !answer.description) {
          throw new Error('Invalid body')
        }
      })

      const createdAnswers = await Promise.all(
        answers.map(async (answer) =>
          AnswerModel.create({
            title: answer.title,
            description: answer.description
          })
        )
      )

      res.status(201).json({
        status: 'OK',
        data: {
          answers: createdAnswers,
          answersIds: createdAnswers.map((answer) => answer.id)
        }
      })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error })
    }
  }
}
