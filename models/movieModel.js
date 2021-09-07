const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Movie must have a name field'],
    min: 2
  },
  release_date: {
    type: Date,
    required: [true, 'Movie must contain a release date']
  },
  countries: {
    type: [String],
    required: [true, 'Movie must have a country field']
  },
  languages: {
    type: [String],
    required: [true, 'Movie must have a language field']
  },
  genres: {
    type: String,
    required: [true, 'Movie must have a genres field']
  },
  overview: {
    type: String,
    required: [true, 'Movie must have a overview field']
  },
  production_companies: {
    type: String,
    required: [true, 'Movie must have a production companies field']
  },
  cast: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Star'
    }
  ],
  imageCover: String,
  ratingsQuantity: Number,
  ratingsAverage: Number
}, 
{
  toJSON: { virtuals: true },
  toObject: { virtual: true }
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie