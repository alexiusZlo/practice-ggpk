const fs = require('fs')
const path = require('path')
const express = require('express')
/*const buildClusters = require('./buildClusters')*/
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/articles', require('./routes/article.routes'))
app.use('/api/news', require('./routes/news.routes'))


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
/*const gundata = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'gundata-US.json')))

const clusteredGundata = buildClusters(gundata)

app.get('/api/gundata', (req, res) => {
  res.json(gundata)
})

app.get('/api/clustered-gundata', (req, res) => {
  const precision = +req.query['precision']
  if (isNaN(precision) || precision < 1 || precision > 12) {
    res.status(400).json({ error: 'precision should be an integer between 1 and 12' })
  }
  res.json(clusteredGundata(precision))
})*/