import mongoose from 'mongoose'
import app from './app'
import { PORT, DB_URL } from './config'
import { logger, errorLogger } from './shared/logger'

async function connectDb() {
  try {
    await mongoose.connect(`${DB_URL}`)
    logger.info('Database connection established !')
    app.listen(PORT, () => {
      logger.info(`App is listening on port ${PORT}`)
    })
  } catch (error) {
    errorLogger.error('Failed to connect database', error)
  }
}

connectDb()
