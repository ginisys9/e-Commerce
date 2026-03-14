const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoutes");
const categoryRoute = require("./routes/categoryRoutes");
const productRoute = require("./routes/productRoute");
const cartRoutes = require("./routes/cartRoutes");
const checkRoute = require("./routes/checkRoute");
const orderRoute = require('./routes/orderRoutes')
const fileUpload = require('express-fileupload');
/**
 *  it can be used for the file upload url
 */

// middleware
app.use(express.static("uploads"));
app.use(fileUpload());
connectDB();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use('/api/cart',cartRoutes)
app.use('/api/check',checkRoute)
app.use('/api/order',orderRoute)
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`server are running on ${port} port`));