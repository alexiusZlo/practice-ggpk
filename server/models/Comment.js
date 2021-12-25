const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
    articleId: { type: Types.ObjectId, ref: 'Article' },
    authorId: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('Comment', schema)