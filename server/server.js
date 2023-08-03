
const express=require("express")
const app=express()
const model = require("./data/model/model");
const db = require("./data/connection");
const router = require("./Route/route");
var path = require("path");

require("./data/model/model")
require("./data/model/userModel")
const cors=require("cors")

app.use(cors({origin:'*'}));
app.use("/",router)
app.use(express.json())

app.listen(3001)