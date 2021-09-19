const {Schema, model} = require('mongoose')

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


const Review = model('Review', reviewSchema)

module.exports = Review