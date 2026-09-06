require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./src/db/connection");
const responseHandler = require("./src/middleware/responseHandler");
const errorHandler = require("./src/middleware/errorHandler");

const projectRouter = require("./src/routes/projects.route");
const projectTypeRouter = require("./src/routes/project-type.routes");
const contactRouter = require("./src/routes/contact.routes");
const experienceRouter = require("./src/routes/experiences.routes");
const resumeRouter = require("./src/routes/resume.routes");

const app = express();
const PORT = process.env.PORT || 3400;

// Initialize database connection
connection().catch((err) => {
  console.error("Initial MongoDB connection failure:", err.message);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(responseHandler);

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

// Routes
app.use("/api", projectRouter);
app.use("/api", projectTypeRouter);
app.use("/api", contactRouter);
app.use("/api", experienceRouter);
app.use("/api", resumeRouter);

// Health check
app.get("/", (req, res) => {
  res.success({ status: "ok", timestamp: new Date().toISOString() }, "Portfolio backend is running");
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.error(`Route ${req.originalUrl} not found`, 404);
});

// Centralized error handling middleware
app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;

