const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");
const tableSchema = require("../models/xlsTable");

class uploadController {
   static upload(req, res, next) {
      try {
         const fileDest = path.join(__dirname, '../', req.file.path);
         const workbook = xlsx.readFile(fileDest);
         const table = new tableSchema({ table: workbook })
         table.save();
         fs.unlink(fileDest, err => { if (err) throw err });
         res.json({ message: "sucesso" })
      } catch (error) {
         next(error)
      }
   }
}


module.exports = uploadController