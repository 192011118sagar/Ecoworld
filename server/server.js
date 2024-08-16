const express = require('express');
const dotenv = require("dotenv").config()
const bodyParser = require("body-parser");
const dataBase = require("./src/database/db")
const User = require("./src/Routes/User")
const Admin = require("./src/Routes/Admin")
const cors = require('cors');


const app = express()
dataBase()

app.use(cors());

app.use(bodyParser.json());
app.use(express.json()) 


app.use('/api', User);
app.use("/admin", Admin)

const port = process.env.PORT
app.listen(port, () =>{
    console.log(`Server is running in ${port}`);
})