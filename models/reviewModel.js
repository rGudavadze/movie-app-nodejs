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
    required: [true, 'Review must belong to a movie']
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

reviewSchema.statics.calcAvgRating = async function(movieId){
  const stats = await this.aggregate([
    {
      $match: {movie: movieId}
    },
    {
      $group: {
        _id: '$movie',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating'}
      }
    }
])
  if(stats.length > 0){
    await Movie.findByIdAndUpdate(movieId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    })
  }else {
    await Movie.findByIdAndUpdate(movieId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    })
  }
}

reviewSchema.post('save', function() {
  // We do not have Review model here so we use this.constructor
  this.constructor.calcAvgRating(this.movie)
})

reviewSchema.pre(/^findOneAnd/, async function(next){
  this.r = await this.findOne()
  next()
})

reviewSchema.post(/^findOneAnd/, function(){
  // await this.findOne(); does NOT work here, query has already executed.
  this.r.constructor.calcAvgRating(this.r.movie)
})


const Review = model('Review', reviewSchema)

module.exports = Review