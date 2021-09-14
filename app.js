const express = require('express')


const app = express()

const movieRouter = require('./routes/movieRouter')
const starRouter = require('./routes/starRouter')


app.use(express.json())


app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/stars', starRouter)

app.use('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Page not found'
  })
})

module.exports = app