import mongoose from 'mongoose'

import { DB_NAME, DB_USER, DB_PASS } from './environment'

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.ktkml.gcp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
  .then(() => console.log('DB connected'))
  .catch((e) => console.error('DB Error', e))

export { mongoose }
