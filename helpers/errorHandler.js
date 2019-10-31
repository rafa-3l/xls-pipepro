module.exports = {
   middleware: (err, req, res, next) => {
      res.status(error.statusCode || 500).json({ error: err.toString() })
   },
   handler: (msg, status = 500) => {
      const error = new Error(msg)
      error.statusCode = status;
      throw error
   }
}
