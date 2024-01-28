import { type Request, type Response } from 'express'

export class AuthController {
  login = (req: Request, res: Response) => {
    res.json('adasd')
  }

  register = (req: Request, res: Response) => {
    // TODO: Crear usuario nuevo, usar DTO y Repository pattern
    res.json('adasd')
  }
}
