const jwt = require("jsonwebtoken");
const errorHandler = require("./errorHandler").handler;

module.exports = (req, res, next) => {
   const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;

   if (!token) return errorHandler("Não autorizado: Token não fornecido", 401);
   jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) return errorHandler("Não autorizado: Token inválido", 401);
      req.email = decoded.email;
   });
}