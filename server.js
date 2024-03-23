const express = require('express');
const userRoutes = require("./src/routes/userRoutes")
const app = express();

const port = 3000;

app.get("/",(req,res) => {
    res.send("Hello world");
})

app.use("/api/v1/user",userRoutes);
app.listen(port,() => console.log("app listening on port 3000"));
