const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
  level: 'info', // Set the minimum logging level
  format: winston.format.json(), // Use JSON format for logs
  transports: [
    // Define transports to specify where logs should be stored
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to error.log file
    new winston.transports.File({ filename: 'combined.log' }) // Log all levels to combined.log file
  ]
});

// If not in production environment, also log to console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
