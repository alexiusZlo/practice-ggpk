const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    gameId: { type: Types.ObjectId, ref: 'Game', required: true },
    typeId: { type: Types.ObjectId, ref: 'Type', required: true },
    date: { type: Date, default: Date.now(), required: true },
    authorId: { type: Types.ObjectId, ref: 'User' },
    picture: { type: String},
    isNews: { type: Boolean, required: true }
})

module.exports = model('Article', schema)