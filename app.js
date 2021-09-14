const express = require('express')
const morgan = require('morgan')

const app = express()

const movieRouter = require('./routes/movieRouter')
const starRouter = require('./routes/starRouter')


app.use(express.json())

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}


app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/stars', starRouter)

app.use('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Page not found'
  })
})

module.exports = app