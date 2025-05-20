const mongoose = require("mongoose");
// create a schema

const todoSchema = new mongoose.Schema({
  title : { type:String , required:true },
  deadline : { type:Date , required:true },
  completed : {type : Boolean, default:false },
  createdAt : { type: Date, default:Date.now }
});

module.exports = mongoose.model('Todo', todoSchema);