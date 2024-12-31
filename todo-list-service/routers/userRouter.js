const express = require("express");
const router = express.Router();
const {createUser, getUsers} = require("../services/userService");

router.post("/", async (req, res, next) => {
    try {
        const user = await createUser(req.body);
        res.status(201).send(user);
    } catch (error) {
        next(error);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const users = await getUsers();
        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
