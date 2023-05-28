import mongoose from 'mongoose'
import app from './app'
import { PORT, DB_URL } from './config'

async function connectDb() {
  try {
    await mongoose.connect(`${DB_URL}`)
    console.log('Database connection established !')
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`)
    })
  } catch (error) {
    console.log('Failed to connect database', error)
  }
}

connectDb()
