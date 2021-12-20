const { Schema, model } = require('mongoose')

const schema = new Schema({
    name: { type: String, requred: true, unique: true },
    text: { type: String, required: true },
    date: { type: Date, required: true },
    creator: { type: Types.ObjectId, ref: 'Administrator'}
})

module.exports = model('Article', schema)