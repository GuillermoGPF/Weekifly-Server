const { Schema, model } = require('mongoose')

const adsSchema = new Schema(
{
    name: {
        type: String,
        required: [true, 'El nombre del anuncio es obligatorio']
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        minlength: [10, 'La descripción debe tener mínimo 10 carácteres']
    },
    image: {
        type: String,
        required: [true, 'La imagen es obligatoria'],
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: true
})

const Ads = model('Ads', adsSchema)

module.exports = Ads