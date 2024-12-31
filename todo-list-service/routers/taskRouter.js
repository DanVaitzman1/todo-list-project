const express = require("express");
const router = express.Router();
const {createTask, getTasks, getTaskById, updateTask, deleteTask} = require("../services/taskService");

// Middleware to verify token (for all task-related APIs)
const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, async (req, res, next) => {
    try {
        const tasks = await getTasks();
        res.status(200).send(tasks);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", verifyToken, async (req, res, next) => {
    try {
        const task = await getTaskById(req.params.id);
        if (!task)
            return res.status(404).send({message: "Task not found"});
        res.status(200).send(task);
    } catch (error) {
        next(error);
    }
});

router.post("/", verifyToken, async (req, res, next) => {
    try {
        const taskData = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            assigned_user_id: req.body.assigned_user_id,
            priority_id: req.body.priority_id,
            status_id: req.body.status_id,
        };

        const newTask = await createTask(taskData);
        res.status(201).send(newTask);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", verifyToken, async (req, res, next) => {
    try {
        const updates = req.body;
        const updatedTask = await updateTask(req.params.id, updates);
        if (!updatedTask)
            return res.status(404).send({message: "Task not found"});
        res.status(200).send(updatedTask);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", verifyToken, async (req, res, next) => {
    try {
        const deletedTask = await deleteTask(req.params.id);
        if (!deletedTask)
            return res.status(404).send({message: "Task not found"});
        res.status(200).send({message: "Task deleted successfully"});
    } catch (error) {
        next(error);
    }
});

module.exports = router;
