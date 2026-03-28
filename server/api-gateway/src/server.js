require('dotenv').config();
const express = require('express');
const proxy = require('express-http-proxy');
const cors = require('cors');
const helmet = require('helmet');
const authMiddleware = require('./middleware/auth-middleware');
const allowedOrigins = [
  'http://localhost:3000',
  process.env.CLIENT_URL
].filter(Boolean);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ 
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id', 'x-user-email', 'x-user-name']
}));

const getProxyOptions = (apiPrefix) => ({
  proxyReqPathResolver: (req) => {
    const newPath = apiPrefix + req.url;
    console.log(`[Proxy] ${req.method} ${req.baseUrl}${req.url} -> ${newPath}`);
    return newPath;
  },

  timeout: 120000,

  proxyErrorHandler: (err, res, next) => {
    console.error(`[Proxy Error] ${err.message}`);
    res.status(500).json({ message: 'Internal server error!', error: err.message });
  }
});


const UPLOAD_URL = process.env.UPLOAD || 'http://localhost:5002';
const DESIGN_URL = process.env.DESIGN || 'http://localhost:5001';
const SUBSCRIPTION_URL = process.env.SUBSCRIPTION || 'http://localhost:5003';

app.use('/v1/media', authMiddleware, proxy(UPLOAD_URL, getProxyOptions('/api/media')));

app.use('/v1/designs', (req, res, next) => {
  console.log(`[Route] ${req.method} ${req.originalUrl} matched /v1/designs`);
  next();
}, authMiddleware, proxy(DESIGN_URL, getProxyOptions('/api/designs')));

app.use('/v1/subscription', authMiddleware, proxy(SUBSCRIPTION_URL, getProxyOptions('/api/subscription')));


app.use(express.json());


app.listen(PORT, () => {
  console.log(`API gateway is running on port ${PORT}`);
  console.log(`UPLOAD Service is running on port ${UPLOAD_URL}`);
  console.log(`DESIGN Service is running on port ${DESIGN_URL}`);
  console.log(`SUBSCRIPTION Service is running on port ${SUBSCRIPTION_URL}`);
});
