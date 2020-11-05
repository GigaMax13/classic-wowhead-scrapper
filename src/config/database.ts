import mongoose from 'mongoose'

import { DB_USER, DB_PASS, DB_URL, DB_NAME } from './environment'

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_URL}/${DB_NAME}?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
  .then(() => console.log('DB connected'))
  .catch(e => console.error('DB Error', e))

export { mongoose }
