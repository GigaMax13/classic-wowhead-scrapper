import { PORT } from '@config/environment'
import { app } from './app'

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
