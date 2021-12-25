const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    title: { type: String, requred: true, unique: true },
    content: { type: String, required: true },
    game: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
    authorId: { type: Types.ObjectId, ref: 'User' },
    picture: { type: String},
    isNews: { type: Boolean, required: true }
})

module.exports = model('Article', schema)