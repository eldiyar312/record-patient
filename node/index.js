const express = require('express');
const config = require('config')
const mongo = require('mongoose')


const recordPatient = require('./routes/recordPatient')
const getPatient = require('./routes/getPatient')
const doctor = require('./routes/doctor')
const deletePatient = require('./routes/deletePatient')


// config
const app = express()
const PORT = process.env.PORT || 5000
const SERVER_HOST = process.env.YOUR_HOST || '0.0.0.0'
const mongoUri = config.get('mongoUri')
// params
app.use( express.urlencoded({ extended: true }) )
app.use( express.json({ extended: true }) )

// routes
app.use( recordPatient )
app.use( getPatient )
app.use( doctor )
app.use( deletePatient )


// Server
const start = async () => {
  try {
    await mongo.connect( mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    app.listen(PORT, SERVER_HOST, () => {
      console.log('Server start in ', PORT)
    })
  } catch (e) {
    console.log('Error!!!! ', e.message)
    process.exit(1)
  }
}

start();