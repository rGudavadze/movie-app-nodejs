const mongoose = require('mongoose')
const dotenv = require('dotenv')


dotenv.config({path: './config.env'})

const app = require('./app')

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => console.log("DB connection successful!"))


const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})

// Unhandled Rejection Error
process.on('unhandledRejection', err => {
  console.log(err)
  console.log(err.name, err.message)
  console.log('UNHANDLER REJECTION! Shutting down...')
  server.close(() => {
    process.exit(1)
  })
})
// Uncaught Exception
process.on('uncaughtException', err => {
  console.log(err.name, err.message)
  console.log('UNCAUGHT EXCEPTION! Shutting down...')
  server.close(() => {
    process.exit(1)
  })
})