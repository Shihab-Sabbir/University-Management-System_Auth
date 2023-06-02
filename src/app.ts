import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import userRoute from './app/modules/users/users.route'

const app: Application = express()

app.use(cors())

//parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('University Management Auth Server Running !')
})

app.use('/api/v1/users/', userRoute)

//test route
app.get('/test', async (req: Request, res: Response) => {
  res.send(200)
})

export default app
