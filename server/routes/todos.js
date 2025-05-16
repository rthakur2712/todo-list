const express = require('express');
const mongoose = require("mongoose");
const Todo = require('../models/Todo');
const app = express();
const PORT = process.env.BACKEND_PORT ||3000;

app.use(express.json());
const cors = require('cors');
app.use(cors());


MONGODB_URL = "mongodb+srv://jaibhadrakali1234:Nm79654321@cluster0.bth1hcy.mongodb.net/";
console.log(MONGODB_URL);
mongoose.connect(MONGODB_URL)
  .then(()=>{console.log("Database connected Successfully!")})
  .catch((err)=>{console.error("Error in connecting db:",{err})});


// Get all todos
app.get('/todos',async(req,res)=>{
  try{
    const todos = await Todo.find();
    res.json(todos);
  }
  catch(err){
    res.status(500).json({error:"Something went wrong"});
  }
});

// Post a todo
app.post('/todos',async(req,res)=>{
  const {title} = req.body;
  try{
    const newTodo = new Todo({title});
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  }catch(err){
    res.status(500).json({error:"Could not create a todo!",err});
  }
})

// Get one todo
app.get('/todos/:todo_title', async(req,res)=>{
  try{
    const todo_title = req.params.todo_title;
    const oneTodo = await Todo.findOne({title:todo_title});
    res.send(oneTodo);
  }catch(err){
    res.status(500).json({error:"Something went wrong"});
  }
})

// Update the todo
app.put('/todos/:todo_id',async(req,res)=>{
  try{

    const todo_id = req.params.todo_id;
    const oneTodo = await Todo.findOne({_id:todo_id});
    if(!oneTodo){
      res.status(404).json({message:"Todo Not found"});
    }
    oneTodo.completed = true;
    const savedTodo = await oneTodo.save();
    res.json({savedTodo});
  } catch(err){
    res.status(501).json({error:err});
  }
})

// Delete one Todo
app.delete('/todos/:todo_id',async(req,res)=>{
  try{
    const todo_id = req.params.todo_id;
    const oneTodo = await Todo.deleteOne({_id:todo_id});
    if( oneTodo.deletedCount > 0 ){
      res.json({message:"Deleted Successfully"});
    }
  }catch(err){
    res.status(501).json({"error in deleting":err});
  }
})

app.listen(PORT,()=>{
  console.log("App running on PORT:",PORT);
})