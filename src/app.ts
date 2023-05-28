import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app: Application = express()

app.use(cors())

//parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('University Management Auth Server Running !')
})

export default app
