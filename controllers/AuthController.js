const User = require("../models/User");
const jwt = require("jsonwebtoken");
const errorHandler = require("../helpers/errorHandler").handler;
class AuthController {
   static async register(req, res, next) {
      const { name, email, password, confirmPassword } = req.body;
      try {
         const oldUser = await User.findOne({ email });
         if (password !== confirmPassword) return errorHandler("As senhas não correspondem.", 401);
         if (oldUser) return errorHandler("um usuário com este email já existe.", 401);
         const user = new User({ name, email, password });
         user.save()
            .catch(err => { throw err })
         res.sendStatus(200);
      } catch (error) {
         next(error)
      }
   }

   static async authenticate(req, res, next) {
      const { email, password } = req.body;
      const wrongPassword = () => errorHandler("Email e/ou senha incorretos", 401);
      try {
         const user = await User.findOne({ email });
         if (!user) return wrongPassword;
         user.checkPassword(password, (err, same) => {
            if (err) throw err;
            if (!same) return wrongPassword;
            const token = jwt.sign({ email }, process.env.SECRET, {
               expiresIn: '1h'
            });
            res.cookie('token', token, { httpOnly: true }).sendStatus(200);
         })
      } catch (error) {
         next(error);
      }
   }

   static checkToken(req, res, next) {
      res.sendStatus(200);
   }
}


module.exports = AuthController