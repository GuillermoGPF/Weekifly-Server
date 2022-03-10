const { Schema, model } = require('mongoose')

const userSchema = new Schema(
{
    username: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        maxlength: [15, 'El nombre de usuario debe tener como máximo 15 carácteres']
    },
    description: {
        type: String,
        minlength: [10, 'La descripción debe tener mínimo 10 carácteres']
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    avatar: {
        type: String,
        default: 'https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg'
    },
    bithday: {
        type: Date
    },
    role: {
        type: String,
        enum: ['USER', 'PLANNER', 'ADMIN'],
        default: 'USER'
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},
{
    timestamps: true
})

const User = model('User', userSchema)

module.exports = User