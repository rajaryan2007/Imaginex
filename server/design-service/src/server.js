require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const designRoutes = require("./routes/design-routes")
const allowedOrigins = [
  'http://localhost:3000',
  process.env.CLIENT_URL
].filter(Boolean);

const app = express();
const PORT = process.env.PORT || 5001;

// Cached connection for Vercel serverless
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

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id', 'x-user-email', 'x-user-name']
}))
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
