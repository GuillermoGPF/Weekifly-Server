const { Schema, model } = require('mongoose')

const signatureSchema = new Schema(
{
    name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
},
{
    timestamps: true
})


const Signature = model('Signature', signatureSchema)

module.exports = Signature