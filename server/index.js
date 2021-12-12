const fs = require('fs')
const path = require('path')
const express = require('express')
const buildClusters = require('./buildClusters')

const app = express()
const port = 3000

const gundata = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'gundata-US.json')))

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
})

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))