const mongoose = require('mongoose')
const slugify = require('slugify')


const starSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Star must have a name field'],
    min: 2
  },
  birth_date: {
    type: String,  // d/m/y
    required: [true, 'Star must have an age field']
  },
  image: String,
  movies: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Movie'
    }
  ],
  slug: String
},
{
  toJSON: { virtuals: true },
  toObject: { virtual: true }
})

// Document Middleware: runs before .save() and .create()
starSchema.pre('save', function(next){
  this.slug = slugify(this.name, { lower: true })
  next()
})



const Star = mongoose.model('Star', starSchema)

module.exports = Star