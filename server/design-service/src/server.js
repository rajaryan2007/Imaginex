require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const designRoutes = require("./routes/design-routes")
const allowedOrigins = ['http://localhost:3000']
const app = express();

const PORT = process.env.PORT || 5001

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((e) => console.log('Failed to connect to MongoDB', e))

app.use(cors({
  origin: allowedOrigins
}))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`Design Service received: ${req.method} ${req.url}`);
  next();
});
app.use('/api/designs', designRoutes)



async function startServer() {
    try {
      app.listen(PORT, () => console.log(`Design Service running on port ${PORT}`))

    } catch (error) {
      console.error('Failed to connected to server', error);
      process.exit(1);
    }
  }


startServer();