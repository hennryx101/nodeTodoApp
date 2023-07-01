const Todo = require("../Models/Todo");
const asyncFunction = require("../Middleware/asyncWrapper");

const getAllTask = asyncFunction (async (req, res) => {
    const todos = await Todo.find()
    res.status(200).json({ todos })
})

const index_post = asyncFunction (async (req, res) => {
    const data = req.body;
    const task = await Todo.create(data);
    res.status(200).json({ redirect: "/", task});

})

const getTask = asyncFunction (async (req, res) => {
    const { id } = req.params;
    const task = await Todo.findOne({_id: id});
    
    if(!task){
        res.status(404).json({ message: "Task not found!"})
    }

    res.status(200).json({ task });
})

const updateTask = asyncFunction (async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const todo = await Todo.findByIdAndUpdate(id, data);

    if(!todo){
        res.status(404).json({ message: "Task not found!"});
    }

    res.status(200).json({ task: todo, message: "success" });
})

const deleteTask = asyncFunction (async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);

    if(!todo){
        res.status(404).json({ message: "Task not found!"});
    }
    res.status(200).json({ message: "success"});
})
module.exports = {
    index_post,
    getAllTask,
    getTask,
    updateTask,
    deleteTask,
}