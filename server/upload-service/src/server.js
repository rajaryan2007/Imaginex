require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const uploadRoutes = require('./routes/upload-routes')

const app = express();

const PORT = process.env.PORT || 5002

// Cached connection for Vercel serverless - avoids buffering timeout on cold starts
let cachedConnection = null;

async function connectDB() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }
  cachedConnection = await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  });
  console.log('Connected to MongoDB');
  return cachedConnection;
}

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB connection failed:', err.message);
    res.status(503).json({ success: false, message: 'Database connection failed' });
  }
});

app.use('/api/media', uploadRoutes);
async function startServer() {
  try {
    app.listen(PORT, () => console.log(`Upload Service running on port ${PORT}`))

  } catch (error) {
    console.error('Failed to connected to server', error);
    process.exit(1);
  }
}



startServer();
