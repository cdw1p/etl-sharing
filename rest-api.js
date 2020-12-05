const express = require('express')
const axios = require('axios')
const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.get('/', function (req, res) {
  res.json({
    status: true
  })
})

app.get('/getDataGithub', async function (req, res) {
  const getData = await axios.get(`https://api.github.com/users/${req.query.username}`)
  const response = getData.data
  res.json({ response })
})

app.post('/getDataGithub', async function (req, res) {
  try {
    const { username } = req.body
    const getData = await axios.get(`https://api.github.com/users/${username}`)
    res.status(200).json({ success: true, message: getData.data })
  } catch (error) {
    res.status(403).json({ success: false, message: error.message })
  }
})

app.listen(80)