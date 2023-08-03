const db = require("../connection");
const mongoose = require("mongoose");
require("../connection");
const details = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    adress: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Transgender"],
      required: true,
    },

    // dateOfJoining:{
    //     type:Date,
    //     require:true
    // },
    // dateOfLeaving:{
    //     type:Date,
    //     require:true
    // }
  },
  { versionKey: false }
);
// console.log(Date())
const models = mongoose.model("model", details);
module.exports = models;
