const fs = require('fs')
const path = require('path')
const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/articles', require('./routes/article.routes'))
app.use('/api/news', require('./routes/news.routes'))
app.use('/api/adminp', require('./routes/adminp.routes'))
app.use('/api/comment', require('./routes/comment.routes'))
app.use('/api/profile', require('./routes/profile.routes'))


const port = config.get('port') || 3000


async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}


start()
