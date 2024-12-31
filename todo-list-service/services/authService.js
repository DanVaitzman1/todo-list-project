const jwt = require("jsonwebtoken");
const {createUser, getUserByEmail} = require("../services/userService");
const bcrypt = require("bcryptjs");

const signup = async (userData) => {
    const existingUser = await getUserByEmail(userData.email); // Check if email already exists
    if (existingUser)
        throw new Error("Email already exists");

    const newUser = await createUser(userData); // Create a new user and save to DB
    return newUser;
};

const signin = async (email, password) => {

    const user = await getUserByEmail(email); // Check if user exists
    if (!user)
        throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password); // Check if password is correct
    if (!isMatch)
        throw new Error("Invalid credentials");

    const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: "1h"}); // Create and return a JWT token
    return {"token": token, "assigned_user_id": user.user_id};
};

module.exports = {signup, signin};