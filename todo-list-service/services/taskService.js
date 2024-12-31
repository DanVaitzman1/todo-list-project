const Task = require("../models/taskModel");
const User = require("../models/userModel");

const createTask = async (taskData) => {
    taskData.task_id = await getNextTaskId();
    const task = new Task(taskData);
    await task.save();
    return await getTaskById(task.task_id);
};

const getTasks = async () => {
    return Task.find({ status_id: { $ne: 5 } });
};

const getTaskById = async (id) => {
    return Task.findOne({ task_id: id });
};

const updateTask = async (id, updates) => {
    updates.update_date = Date.now();
    return Task.findOneAndUpdate({ task_id: id }, updates, { new: true });
};

const deleteTask = async (id) => {
    return Task.findOneAndUpdate({ task_id: id }, { status_id: 5 });
};

const getNextTaskId = async () => {
    const maxTaskIdDoc = await Task.findOne().sort({ task_id: -1 });
    const maxTaskId = maxTaskIdDoc ? maxTaskIdDoc.task_id : 0;
    return maxTaskId + 1;
}

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
