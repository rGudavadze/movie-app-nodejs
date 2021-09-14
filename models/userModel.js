const {Schema, Model} = require('mongoose')

const userSchema = new Schema({

  name: {
    type: String,
    required: [true, '']
  },
  email: {
    type: String,
    required: [true, '']
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
  passwordConfirme: {
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

const User = Model('User', userSchema)

module.exports = User