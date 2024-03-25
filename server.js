const express = require('express');
const userRoutes = require("./src/routes/userRoutes")
const orderRoutes = require("./src/routes/orderRoutes")
const inventoryRoutes = require("./src/routes/inventoryRoutes")
const cors = require('cors')

const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')

const app = express();

const port = 3000;

//Middle wares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
app.get("/",(req,res) => {
    res.send("Hello world");
})

app.use("/api/v1/user",userRoutes);
app.use("/api/v1/order",orderRoutes);
app.use("/api/v1/inventory",inventoryRoutes);
app.listen(port,() => console.log("app listening on port 3000"));
