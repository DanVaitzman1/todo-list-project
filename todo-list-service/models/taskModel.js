const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    task_id: {type: Number, unique: true, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    create_date: {type: Date, default: Date.now},
    update_date: {type: Date, default: Date.now},
    due_date: {type: Date, default: Date.now},
    assigned_user_id: {type: Number, required: true},
    priority_id: {type: Number, enum: [1, 2, 3, 4], required: true},
    status_id: {type: Number, enum: [1, 2, 3, 4, 5], required: true},
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
