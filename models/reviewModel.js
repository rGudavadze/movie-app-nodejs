const {Schema, model} = require('mongoose')
const Movie = require('./movieModel')


const reviewSchema = new Schema({
  review: {
    type: String,
    required: [true, 'Review can not be empty']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  createTime: {
    type: Date,
    default: Date.now()
  },
  movie: {
    type: Schema.ObjectId,
    ref: 'Movie',
    required: [true, 'Review must belong to a tour']
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to an user']
  }

}, {
  toJSON: { virtuals: true },
  toObject: { virtual: true }
})

reviewSchema.pre(/^find/, function(next){
  this.populate({
    path: 'user',
    select: 'name photo'
  })
  next()
})

reviewSchema.static.calcAvgRating = async function(movieId){
  const stats = await this.aggregate([
    {
      $match: { movie: movieId }
    },
    {
      $group: {
        _id: '$movie',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ])
  
}

reviewSchema.post('save', function(next){
  
})


const Review = model('Review', reviewSchema)

module.exports = Review