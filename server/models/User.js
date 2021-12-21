const { Schema, model } = require('mongoose')

const schema = new Schema({
    email: { type: String, requred: true, unique: true },
    name: { type: String, required: false },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true }
})

module.exports = model('User', schema)