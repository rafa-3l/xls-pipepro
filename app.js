const app = require("express")();
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true
})
   .then(() => console.log("mongoDB conectado"))
   .catch(err => console.log(err))

//rotas
const uploadRoute = require("./routes/upload.routes")
const authRoute = require("./routes/auth.routes")

app.use("/auth", authRoute)
app.use("/upload", uploadRoute)

//error handler 
app.use((err, req, res, next) => {
   res.json({ error: err.toString() })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log("servidor ligado na porta", PORT))