const mongoose = require('mongoose')
const slugify = require('slugify')


const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Movie must have a title field'],
    min: 2
  },
  release_date: {
    type: Number,
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
    type: [String],
    required: [true, 'Movie must have a genres field']
  },
  overview: {
    type: String,
    required: [true, 'Movie must have a overview field']
  },
  director: {
    type: String,
    required: [true, 'Movie must have a production companies field']
  },
  slug: String,
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

// Document Middleware: runs before .save() and .create()
movieSchema.pre('save', function(next){
  this.slug = slugify(this.title, { lower: true })
  next()
})



const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie