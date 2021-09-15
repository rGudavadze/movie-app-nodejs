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




userSchema.methods.correctPassword = async function(currentPassword, userPassword){
  return await bcrypt.compare(currentPassword, userPassword)
}



const User = model('User', userSchema)

module.exports = User