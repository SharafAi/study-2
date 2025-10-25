const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastname: {
    type: String,
    required: [true, 'Last name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  usertype: {
    type: String,
    enum: ['guest', 'host'],
    default: 'guest',
  },
  favourites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Home',
  }],
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
// module.exports = mongoose.model('Favourite', favouriteSchema);
