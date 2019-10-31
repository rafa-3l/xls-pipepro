const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const brcypt = require("bcrypt");

const UserSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true,
   }
}, {
   timestamps: true
});

const saltRounds = 14;

UserSchema.pre('save', function (next) {
   if (this.isNew || this.isModified("password")) {

      const document = this;

      brcypt.hash(document.password, saltRounds, (err, hashedPassword) => {
         if (err) return next(err)

         document.password = hashedPassword
         return next();
      })
   } else next();
});

UserSchema.methods.checkPassword = function (password, cb) {
   brcypt.compare(password, this.password, (err, same) => {
      if (err)
         cb(err);
      else
         cb(err, same);
   })
}



module.exports = mongoose.model("user", UserSchema);