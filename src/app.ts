import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { requestLogger } from './shared/logger'
import routes from './routes'

const app: Application = express()

app.use(cors())

//parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//track api request log
app.use(requestLogger)

app.get('/', (req: Request, res: Response) => {
  res.send('University Management Auth Server Running !')
})

//routes
app.use('/api/v1', routes)

// Test route
app.get('/test', async (req: Request, res: Response, next: NextFunction) => {
 
})

// Global error handler
app.use(globalErrorHandler)

export default app
