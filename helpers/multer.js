const multer = require("multer");

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'uploads/');
   },

   filename: (req, file, cb) => {
      cb(null, `${Date.now()}- ${file.originalname}`);
   },
})

const fileFilter = function (req, file, cb) {
   if (file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      return cb(null, false)
   else
      return cb(null, true)
}

const upload = multer({ fileFilter, storage })

module.exports = upload