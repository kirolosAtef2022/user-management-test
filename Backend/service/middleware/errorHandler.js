module.exports = (err, req, res, next) => {
  // Default values
  const statusCode = err.statusCode || 500;
  const code = err.code || "INTERNAL_ERROR";
  const message = err.message || "Unexpected error";

  // Optional: log internal errors
  if (statusCode === 500) {
    console.error(err);
  }

  return res.status(statusCode).json({
    error: {
      code,
      message,
    },
  });
};
