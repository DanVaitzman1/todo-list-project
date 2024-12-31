require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connection");
const setupSwagger = require("./swagger");

const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to set CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'); // Allow any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies, authorization headers, etc.)
    next();
});

// Parse JSON
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

// Swagger documentation
setupSwagger(app);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack); // Log errors for debugging
    res.status(err.status || 500).send({ message: err.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});