import { type Request, type Response } from 'express'
import { QuestionModel } from '../../data/mongo/models/question.model'
import { AnswerModel } from '../../data/mongo/models/answer.model'

export class QuestionsController {
  get = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    if (page < 0) {
      return res.status(400).json({ message: 'Invalid page number' })
    }

    if (limit < 0 || limit > 300) {
      return res.status(400).json({ message: 'Invalid limit number' })
    }

    try {
      const questions = await QuestionModel.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('answers', 'title description')

      res.status(200).json({ status: 'OK', data: { questions } })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  create = async (req: Request, res: Response) => {
    const { title, description, answers, answer } = req.body

    if (!title || !description || !answers || !answer) {
      return res.status(400).json({ message: 'Invalid body' })
    }

    if (answers.length < 2 || answers.length > 10) {
      return res
        .status(400)
        .json({ message: 'Answers must be between 2 and 10' })
    }

    if (!answers.includes(answer)) {
      return res.status(400).json({ message: 'Answer must be in answers' })
    }

    try {
      const existAnswers = await AnswerModel.find({ _id: { $in: answers } })
      if (existAnswers.length !== answers.length) {
        return res.status(400).json({ message: 'Some answer does not exist' })
      }

      const userId = req.body._user.id

      const question = await QuestionModel.create({
        title,
        description,
        answers,
        correctAnswerId: answer,
        createdBy: userId,
        createdAt: new Date(),
        updatedBy: userId,
        updatedAt: new Date()
      })

      res.status(201).json({
        status: 'OK',
        data: {
          id: question.id,
          title: question.title,
          numberOfAnswers: question.answers.length
        }
      })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error })
    }
  }

  update = (req: Request, res: Response) => {
    res.status(201).json({ message: 'Question updated' })
  }

  validate = async (req: Request, res: Response) => {
    const { questionId, selectedAnswerId } = req.body as {
      selectedAnswerId: string
      questionId: string
    }

    if (!questionId || !selectedAnswerId) {
      return res.status(400).json({ message: 'Invalid body' })
    }

    try {
      const question = await QuestionModel.findOne({
        _id: questionId
      }).populate('answers', 'title description')

      if (!question) {
        return res.status(404).json({ message: 'Question not found' })
      }

      if (
        !question.answers.some((answerId) => answerId.equals(selectedAnswerId))
      ) {
        return res
          .status(400)
          .json({ message: 'selectedAnswerId is not in answers' })
      }

      res.status(200).json({
        status: 'OK',
        data: {
          question,
          selectedAnswer: question.answers.find((answerId) =>
            answerId.equals(selectedAnswerId)
          ),
          isCorrect: question.correctAnswerId.equals(selectedAnswerId)
        }
      })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
