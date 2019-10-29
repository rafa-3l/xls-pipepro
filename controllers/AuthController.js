const User = require("../models/User");
const assert = require("assert")

class AuthController {
   static register(req, res, next) {
      try {
         const { name, email, password, confirmPassword } = req.body
         if (password !== confirmPassword)
            throw new Error("As senhas não correspondem.");
         const user = new User({ name, email, password });
         user.save()
            .catch(err => {
               throw err
            })

      } catch (error) {
         next(error)
      }
   }
}


module.exports = AuthController