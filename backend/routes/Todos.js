const express = require("express");
const router = express.Router();
const Todo = require("../models/Todos");

//Get all todo route
router.get("/", async(req,res)=>{
    const todos = await Todo.find();
    res.json(todos);
});
//Creat new todo
router.post("/new", async(req,res)=>{
    const newtodo = new Todo (
            req.body
    )
    const savedTodo = await newtodo.save();
    res.json(savedTodo);
});
// Getter by id
router.get('/get/:id', async (req, res) => {
    const t = await Todo.findById({ _id : req.params.id })
    res.json(t)
  })
  
  // Delete a todo by id
  router.delete('/delete/:id', async (req, res) => {
    const tDelete = await Todo.findByIdAndDelete({ _id : req.params.id })
    res.json(tDelete)
  })
//Update a todo by id
router.put("/update/:id", async(req,res)=>{
    const updatetodo = await Todo.updateOne(
        {_id: req.params.id},
        {$set: req.body}
    );
    res.json(updatetodo);
});
module.exports = router;