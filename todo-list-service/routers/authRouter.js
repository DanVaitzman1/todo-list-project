const express = require("express");
const Joi = require("joi");
const router = express.Router();
const {signup, signin} = require("../services/authService");

router.post("/signup", async (req, res, next) => {
    try {
        const schema = Joi.object({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(5).max(20).required(),
        });

        const {error} = schema.validate(req.body);
        if (error) {
            return res.status(400).send({message: error.details[0].message});
        }

        const newUser = await signup(req.body);
        res.status(201).send({message: "User created successfully", user: newUser});
    } catch (error) {
        next(error);
    }
});

router.post("/signin", async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(5).max(20).required(),
        });

        const {error} = schema.validate({email, password});
        if (error) {
            return res.status(400).send({message: error.details[0].message});
        }

        const token = await signin(email, password);
        res.status(200).send({message: "Login successful", token});
    } catch (error) {
        next(error);
    }
});

module.exports = router;
