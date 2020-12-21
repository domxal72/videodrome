const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

// first value is value itself, second value in array is error message
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Enter your email'],
    unique: true,
    lowercase: true,
    // I can provide my own validation function or function from validation package like isEmail here
    validate: [isEmail, 'Enter VALID email'],
  },
  password: {
    type: String,
    required: [true, 'Enter your password'],
    minlength: [6, 'Min password length is 6 chars'],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
  // created: {
  //   type : Date, default: Date.now
  // }
},
  // timestamps davam za schema objekt do config objektu, doda mi to datumy pro created a updated time
  { timestamps: true, }
)

// use of mongoode hooks

// fire a function after user is saved to db
// userSchema.post('save', function (doc, next) {
//   console.log('user created', doc)
//   next();
// })

// // fire a function before user is saved to db
// userSchema.pre('save', function (next) {
//   // this refers to local instance of the user before it is save, therefore no arrow function is used because it would not work
//   console.log('user about to be created and saved', this)
//   next();
// })

userSchema.pre('save', async function (next) {
  // this refers to local instance of the user before it is save, therefore no arrow function is used because it would not work
  const salt = await bcrypt.genSalt();
  // this.password transformed to hashed form
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

// Add Static method to login user
userSchema.statics.login = async function(email, password){
  // use this to refer user model
  const user = await this.findOne({ email })
  if (user) {
    // auth returns boolean
    const auth = await bcrypt.compare(password, user.password)
    if (auth){
      return user
    }
    throw Error('wrong password')
  }
  throw Error('wrong email')
}

// tady to co davam jakou string 'user' tak z toho DB automaticky udela users collection jako pomnozny
const User = mongoose.model('user', userSchema)

module.exports = User