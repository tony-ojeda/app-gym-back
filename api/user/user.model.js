const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      lowercase: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      require: true,
      trim: true
    },
    status: {
      type: String,
      default: 'Pending',
      enum: ['Deleted', 'Active', 'Pending'],
      required: true
    },
    role: {
      type: String,
      default: 'GUEST',
    },
    identity_document: {
      type: String,
      enum: ['DNI', 'RUC', 'EXTRANJERIA'],
      lowercase: true
    },
    identity_number: {
      type: String,
      lowercase: true
    },
    names: {
      type: String,
      lowercase: true
    },
    primary_lastName: {
      type: String,
      lowercase: true,
    },
    second_lastName: {
      type: String,
      lowercase: true,
    },
    full_name: {
      type: String,
      lowercase: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    presentation: {
      type: String,
      lowercase: true,
    },
    url_photo: {
      type: String,
      lowercase: true,
    },
    url_banner: {
      type: String,
      lowercase: true,
    },
    gender: {
      type: String,
      lowercase: true,
    },
    email_alternative: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      lowercase: true,
    },
    passwordResetToken: String,
    passwordResetExpires: Date
  },
  {
    timestamps: true
  }
)

UserSchema.pre('save', async function(next) {
  const user = this
  try {
    if (!user.isModified('password') || !user.isModified('creditCardNumber') ) {
      return next()
    }
  
    //Generar el hash y encriptar la contraseña
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)

    user.password = hash

  } catch(error) {
    next(error)
  }
  

  console.log('user', user)
  next()
})

UserSchema.methods.comparePassword = async function (password) {
  const user = this
  return await bcrypt.compare(password, user.password)
}

UserSchema.virtual('profile').get(function() {
  const { firstName, lastName, email } = this

  return { fullName: `${firstName} ${lastName}`, email }
})

module.exports = mongoose.model('User', UserSchema)
