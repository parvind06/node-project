// Import required modules
require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Create the Express application
const app = express();

// Middleware
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});
app.use('/api/', limiter);

const indexRouter = require('./routes/index');
const authRouter = require('./routes/users');

app.use('/api/v1', indexRouter);
app.use('/api/v1/auth', authRouter);

// 404 Error Handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.clear();
  console.log(`${process.env.APP_NAME} Server is running on port ${PORT}`);
});

module.exports = app;
