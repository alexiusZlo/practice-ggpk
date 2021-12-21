const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    name: { type: String, requred: true, unique: true },
    text: { type: String, required: true },
    game: { type: String, requiredP: true },
    date: { type: Date, default: Date.now, required: true },
    creator: { type: Types.ObjectId, ref: 'User' },
    isNews: { type: Boolean, required: true }
})

module.exports = model('Article', schema)