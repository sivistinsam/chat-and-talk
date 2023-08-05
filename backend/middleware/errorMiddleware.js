// Middleware to handle "Not Found" errors.
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404); // Setting the response status code to 404 (Not Found).
  next(error); // Passing the error to the next middleware.
};

// Middleware to handle errors during request processing.
const errorHandler = (err, req, res, next) => {
  // Determining the status code to use based on the current response status.
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Setting the response status code to the determined status code.
  res.status(statusCode);

  // Sending back an error response containing the error message.
  // If in production environment, stack trace is not included for security.
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// Exporting the "notFound" and "errorHandler" middleware functions.
module.exports = { notFound, errorHandler };

