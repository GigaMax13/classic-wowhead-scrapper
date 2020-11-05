import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'

import { BODY_LIMIT } from '@config/environment'
import { Routes } from './routes'

const app = express()

app.disable('x-powered-by')

app.use(helmet())
app.use(cors())
app.use(compression())
app.use(
  bodyParser.json({
    limit: BODY_LIMIT
  })
)

app.get(['/', '/status'], (req, res) => {
  res.send({
    message: 'Server status: running.',
    success: true
  })
})

app.use(Routes)

app.all('*', (req, res) => {
  res.status(404).send({
    message: 'Not found.',
    success: false
  })
})

export { app }
