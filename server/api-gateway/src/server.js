require('dotenv').config();
const express = require('express');
const proxy = require('express-http-proxy');
const cors = require('cors');
const helmet = require('helmet');
const authMiddleware = require('./middleware/auth-middleware');
const allowedOrigins = ['http://localhost:3000']
const app = express()


const PORT = process.env.PORT || 5000

app.use(helmet());
app.use(cors({ origin: allowedOrigins }));

const getProxyOptions = (apiPrefix) => ({
  proxyReqPathResolver: (req) => {
    const newPath = apiPrefix + req.url;
    console.log(`[Proxy] ${req.method} ${req.baseUrl}${req.url} -> ${newPath}`);
    return newPath;
  },

  proxyErrorHandler: (err, res, next) => {
    console.error(`[Proxy Error] ${err.message}`);
    res.status(500).json({ message: 'Internal server error!', error: err.message });
  }
});


app.use('/v1/media', proxy(process.env.UPLOAD, getProxyOptions('/api/media')));

app.use('/v1/designs', (req, res, next) => {
  console.log(`[Route] ${req.method} ${req.originalUrl} matched /v1/designs`);
  next();
}, authMiddleware, proxy(process.env.DESIGN, getProxyOptions('/api/designs')));

app.use('/v1/subscription', authMiddleware, proxy(process.env.SUBSCRIPTION, getProxyOptions('/api/subscription')));


app.use(express.json());


app.listen(PORT, () => {
  console.log(`API gateway is running on port ${PORT}`);
  console.log(` UPLOAD Service is running on port ${process.env.UPLOAD}`);
  console.log(`DESIGN Service is running on port ${process.env.DESIGN}`);
  console.log(`SUBSCRIPTION Service is running on port ${process.env.SUBSCRIPTION}`);
});
