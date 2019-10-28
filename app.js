const app = require("express")();
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv")

dotenv.config();

app.use(morgan("tiny"));

mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true
})
   .then(() => console.log("mongoDB conectado"))
   .catch(err => console.log(err))

//rotas
const uploadRoute = require("./routes/upload.route")

app.use("/upload", uploadRoute)

//error handler 
app.use((req, res, next, err) => {
   res.json(err.toString())
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log("servidor ligado na porta", PORT))