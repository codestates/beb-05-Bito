const express = require("express");
const { Timestamp } = require("mongodb");
const app = express();
const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use("/",routes);


const PORT = process.env.PORT || 4000;

module.exports = app.listen(PORT, () => {
    console.log(`server is working on ${PORT}`)
})