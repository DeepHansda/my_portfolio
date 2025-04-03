const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const connection = require("./src/db/connection");
const projectRouter = require("./src/routes/projects.route");
const contactRouter = require("./src/routes/contact.routes");
const experienceRouter = require("./src/routes/experiences.routes");
const resumeRouter = require("./src/routes/resume.routes");

//Initialize database connection
connection();
const PORT = process.env.PORT || 3400;

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use("/api", projectRouter);
app.use("/api", contactRouter);
app.use("/api", experienceRouter);
app.use("/api", resumeRouter);

app.get("/", (req, res) => {
  res.status(200).send("hello world");
  console.log("hello world");
});
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
