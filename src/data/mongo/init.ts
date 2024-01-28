import mongoose from 'mongoose'

interface Options {
  mongoUrl: string
  databaseName: string
}

export class MongoDatabase {
  static async start({ mongoUrl, databaseName }: Options): Promise<void> {
    try {
      await mongoose.connect(mongoUrl, { dbName: databaseName })
      console.log('Mongo connected')
    } catch (error) {
      console.log('Mongo connect error', error)
      throw error
    }
  }

  static async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect()
    } catch (error) {
      console.log('Mongo disconnect error', error)
      throw error
    }
  }
}
