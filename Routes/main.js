const express = require("express");
const router = express.Router();
const { getAllTask, index_post, getTask, updateTask, deleteTask } = require("../Controller/mainController")

router.route('/').get(getAllTask).post(index_post);
router.route('/:id').get(getTask).post(updateTask).delete(deleteTask);
module.exports = router;