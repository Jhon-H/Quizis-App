import { AppRouter } from './presentation/routes'
import { envs } from './config/envs.adapter'
import { MongoDatabase } from './data/mongo/init'
import { Server } from './presentation/server'
import { UserModel } from './data/mongo/models/user.model'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
;(async () => {
  try {
    await main()
  } catch (error) {
    console.error('An error occurred:', error)
  }
})()

async function main() {
  await MongoDatabase.start({
    mongoUrl: envs.MONGO_URI,
    databaseName: envs.MONGO_DB_NAME
  })

  const server = new Server({
    port: envs.PORT,
    routes: AppRouter.routes
  })

  server.start()
}
