const { json } = require("express");
const model = require("../model/model");

// function alldata(req,res){
//     model.find().then((data)=>(res.json(data)))
// }

const alldata = (spec) => {
  return new Promise((resolve, reject) => {
    model
      .find(spec)
      .then((data) => {
        resolve(JSON.parse(JSON.stringify(data)));
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

// insertdata from ui
const InsertData = (data) => {
  return new Promise((resolve, reject) => {
    model
      .insertMany({ ...data })
      .then((data) => {
        resolve(JSON.parse(JSON.stringify(data)));
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

//updating the data
const updateData = (pre, next) => {
  return new Promise((resolve, reject) => {
    model
      .findOneAndUpdate({ ...pre }, { ...next })
      .then((data) => {
        resolve(JSON.parse(JSON.stringify(data)));
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

const deleteData = (data) => {
  return new Promise((resolve, reject) => {
    model
      .deleteOne({ ...data })
      .then((data) => {
        resolve(JSON.parse(JSON.stringify(data)));
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

const updateone = (filter, newData) => {
  return new Promise((resolve, reject) => {
    model
      .updateOne(filter, newData)
      .then((data) => {
        resolve(JSON.parse(JSON.stringify(data)));
      })
      .catch((err) => {
        reject(err);
      });
  });
};



module.exports = {
  alldata,
  updateData,
  InsertData,
  deleteData,
  updateone,
};
