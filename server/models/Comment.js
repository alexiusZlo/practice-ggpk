const { Schema, model, Types } = require('mongoose')

const d = new Date()

const schema = new Schema({
    text: { type: String, required: true },
    date: {
        type: String, default: d.getFullYear() + ' ' + (d.getMonth()+1) + ' ' + d.getDate() + ' ' +
            d.getHours() + ':' + d.getMinutes(), required: true
    },
    articleId: { type: Types.ObjectId, ref: 'Article' },
    authorId: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('Comment', schema)