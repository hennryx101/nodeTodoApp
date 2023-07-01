const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toDoSchema = new Schema({
    todo: {
        type: String,
        required: [true, 'cannot save empty task!']
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Todo = mongoose.model('Todo', toDoSchema);
module.exports = Todo;