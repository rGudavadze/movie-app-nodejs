const bcrypt = require('bcryptjs')
const {Schema, model} = require('mongoose')

const userSchema = new Schema({

  name: {
    type: String,
    required: [true, '']
  },
  email: {
    type: String,
    required: [true, ''],
    unique: true
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  watchList: [
    {
      type: Schema.ObjectId,
      ref: 'Movie'
    }
  ],
  password: {
    type: String,
    required: [true, ''],
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, ''],
    validate: {
      validator: function(el) {
        return el === this.password
      },
      message: 'Passwords are not same!'
    }
  },
  passwordChangedTime: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }

})

userSchema.pre(/^find/, function(next) {
  // This points to the current query
  this.find({active: {$ne: false}})
  next()
})

userSchema.pre('save', function(next) {
  if(!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined
  next()
})

userSchema.pre('save', function(next) {
  if(!this.isModified('password') || this.isNew) return next()
  this.passwordChangedTime = Date.now() - 1000
  next()
})


userSchema.methods.correctPassword = async function(currentPassword, userPassword){
  return await bcrypt.compare(currentPassword, userPassword)
}



const User = model('User', userSchema)

module.exports = User