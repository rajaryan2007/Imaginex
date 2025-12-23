require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')


const app = express()

const PORT = process.env.PORT || 5001

mongoose.connect(process.env.MONGO_URI)

