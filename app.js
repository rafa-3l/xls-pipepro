const app = require("express")();
const multer = require("multer");
const xlsx = require("xlsx");
const path = require("path");

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

app.post("/upload", upload.single("table"), (req, res) => {
   let workbook = xlsx.readFile(path.join(__dirname, req.file.path));
   res.json(workbook);
})

app.listen(3000, () => console.log("servidor ligado"))