require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//MY Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripepayment");
const paymentBRoutes = require("./routes/payment");


//DB Connection
// mFyekxFa0nZ0PRem
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors());



//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);
app.use("/api", paymentBRoutes);

app.post('*', (req, res) => {        //this works when no routes are working
  res.send({                    
    "error": "no page found"
  })
})

app.get('/', (req, res)=> {
  res.send({"message":"hii"})
})



//PORT
const PORT =  process.env.PORT || 8000 ;

//Starting a server
app.listen(PORT, () => {
  console.log(`app is running at ${PORT}`)
});

