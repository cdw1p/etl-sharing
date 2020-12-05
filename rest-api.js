const express = require('express')
const axios = require('axios')
const mongoose = require('mongoose')
const app = express()

const connectStringMongoDB = 'mongodb+srv://'
mongoose.connect(connectStringMongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection

// Model mongodb
const usersModel = require('./scheme/users')

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

app.get('/mongo/insert', async function (req, res) {
	const findData = await usersModel.find({ username: 'userdemo1' })
	if (findData.length < 1) {
		const insertData = new usersModel({
			username: 'demo1',
			fullname: 'demo user1',
			number_phone: '62892193'
		})
		insertData.save()
		res.json({ status: true, message: insertData })
	} else {
		res.json({ status: false, message: 'Data is already exists' })
	}
})

app.get('/mongo/getAll', async function (req, res) {
	const getData = await usersModel.find({})
	res.json({ status: true, message: getData })
})

app.get('/mongo/getOne', async function (req, res) {
	const getData = await usersModel.find({})
	res.json({ status: true, message: getData[0] })
})

app.post('/mongo/insert', async function (req, res) {
	const { username, fullname, number_phone } = req.body
	const findData = await usersModel.find({ username })
	if (findData.length < 1) {
		const insertData = new usersModel({ username, fullname, number_phone })
		insertData.save()
		res.json({ status: true, message: insertData })
	} else {
		res.json({ status: false, message: 'Data is already exists' })
	}
})

app.post('/mongo/remove', async function (req, res) {
	const { username } = req.body
	const removeData = await usersModel.remove({ username })
	if (removeData.deletedCount != 0) {
		res.json({ status: true, message: 'Data has delete successfully' })
	} else {
		res.json({ status: false, message: 'Data can\'t deleted' })
	}
})
 
app.post('/mongo/update', async function (req, res) {
	const { username, username_new, fullname, number_phone } = req.body
	const updateData = await usersModel.findOneAndUpdate({ username }, { username: username_new, fullname, number_phone })
	if (updateData) {
		res.json({ status: true, message: 'Data has updated successfully' })
	} else {
		res.json({ status: false, message: 'Data can\'t updated' })
	}
})

app.listen(80)