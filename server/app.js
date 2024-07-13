const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const app = express()
const router = require('./routes/index')
require('dotenv').config()

app.set('view engine', 'ejs')

// CORS
const cors = require('cors');
app.use(cors());

// Security
const helmet = require('helmet');
app.use(helmet());

app.get('/', (req, res) => {
  res.status(200);
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', router)

app.listen(process.env.PORT, ()=>{
  console.log('Server is listening on port ' + process.env.PORT)
})
