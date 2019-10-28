const mongoose = require("mongoose")

const Schema = mongoose.Schema

const xlsTableSchema = new Schema({
   user: {
      type: String,
      required: false,
      default: "arthur"
   },
   table: {
      required: true,
      type: Object
   }

})

module.exports = mongoose.model("tabela", xlsTableSchema)