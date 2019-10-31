const mongoose = require("mongoose")

const Schema = mongoose.Schema

const xlsTableSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      required: true
   },
   table: {
      required: true,
      type: Object
   }
})

module.exports = mongoose.model("tabela", xlsTableSchema)