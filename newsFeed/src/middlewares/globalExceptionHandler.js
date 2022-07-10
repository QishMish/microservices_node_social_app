const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = globalErrorHandler;
