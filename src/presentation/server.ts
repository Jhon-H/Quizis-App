import express, { type Router } from 'express'
import helmet from 'helmet'

interface Options {
  port: number
  routes: Router
}

export class Server {
  private readonly app = express()
  private readonly port: number
  private readonly routes: Router

  constructor({ port, routes }: Options) {
    this.port = port
    this.routes = routes
  }

  start(): void {
    this.app.use(express.json())

    this.app.use(this.routes)
    this.app.use(helmet())

    this.app.listen(this.port, () => {
      console.log(`Server is listening on port ${this.port}`)
    })
  }
}
