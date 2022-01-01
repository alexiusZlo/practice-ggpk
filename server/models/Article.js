const { Schema, model, Types } = require('mongoose')

const d = new Date()

const schema = new Schema({
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    gameId: { type: Types.ObjectId, ref: 'Game', required: true },
    typeId: { type: Types.ObjectId, ref: 'Type', required: true },
    date: {
        type: String, default: d.getFullYear() + ' ' + (d.getMonth() + 1) + ' ' + d.getDate() + ' ' +
            d.getHours() + ':' + d.getMinutes(), required: true },
    authorId: { type: Types.ObjectId, ref: 'User' },
    picture: { type: String},
    isNews: { type: Boolean, required: true }
})

module.exports = model('Article', schema)